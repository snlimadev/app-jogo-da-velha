import { useState, useEffect, useRef } from 'react';
import { Modal, BackHandler, AppState, Platform } from 'react-native';
import { Card, Button, Text } from '@rneui/themed';
import { showMessage } from 'react-native-flash-message';
import { BannerAd, BannerAdSize, TestIds } from 'react-native-google-mobile-ads';

import CardAguardandoOponente from '../CardAguardandoOponente';
import Tabuleiro from '../Tabuleiro';
import ModalResultadoDoJogo from '../ModalResultadoDoJogo';
import styles from '../../css/styles';

import {
  validaJogada,
  validaResultado,
  alteraPontuacao,
  handleEventosWebSocket,
  criarOuEntrarNaSala,
  fazerJogada,
  handleRodadasDoJogo
} from '../Funcoes';

const BANNER_ID = 'ca-app-pub-4878437225305198/2521009130';

export default function Online(props) {
  const [celula, setCelula] = useState(Array(9).fill(''));
  const [corCelula, setCorCelula] = useState(Array(9).fill('black'));
  const [jogador, setJogador] = useState('Jogador X');
  const [vencedor, setVencedor] = useState('');
  const [pontuacaoJogadorX, setPontuacaoJogadorX] = useState(0);
  const [pontuacaoJogadorO, setPontuacaoJogadorO] = useState(0);
  const [empates, setEmpates] = useState(0);
  const [fimDaPartida, setFimDaPartida] = useState(false);
  const [carregando, setCarregando] = useState(true);
  const [jogoComecou, setJogoComecou] = useState(false);
  const [jogadorAtual, setJogadorAtual] = useState('');
  const [jogadaAtual, setJogadaAtual] = useState('');
  const [desativado, setDesativado] = useState(true);
  const [jogoAcabou, setJogoAcabou] = useState(false);
  const [textoDaModal, setTextoDaModal] = useState('');
  const [modalVisivel, setModalVisivel] = useState(false);
  const [appState, setAppState] = useState(AppState.currentState);

  const ws = useRef(null);
  const { action, user, roomCode } = props.route.params;
  const navigate = props.navigation.navigate;

  //#region Funções locais
  const handleConectar = () => {
    if (!ws.current) {
      setCarregando(true);
      ws.current = new WebSocket('wss://api-basic-temporary-chat.onrender.com');
      handleEventosWebSocket(ws.current, handleCriarOuEntrarNaSala, handleJogadas, navigate);
    }
  };

  const handleDesconectar = () => {
    if (ws.current) {
      ws.current.close();
      ws.current = null;
    }
  };

  const handleCriarOuEntrarNaSala = () => {
    criarOuEntrarNaSala(action, user, roomCode, ws.current);
    setCarregando(false);
  };

  const handleFazerJogada = (jogada) => {
    if (celula[jogada] === '' && jogador === user) {
      setDesativado(true);
      fazerJogada(jogada.toString(), ws.current);
    }
  };

  const handleJogadas = (e) => {
    handleRodadasDoJogo(
      e,
      setJogoComecou,
      setJogadorAtual,
      setJogadaAtual,
      setJogoAcabou,
      navigate
    );
  };

  const handleBotaoVoltar = () => {
    navigate('Home');
    return true;
  };

  const limpaTabuleiro = () => {
    setCelula(Array(9).fill(''));
    setCorCelula(Array(9).fill('black'));
    setVencedor('');
    setFimDaPartida(false);
  }
  //#endregion

  //#region Hooks useEffect
  useEffect(() => {
    return () => {
      handleDesconectar();
    };
  }, []);

  useEffect(() => {
    if (appState === 'active') {
      handleConectar();
    } else if (Platform.OS === 'android' && Platform.Version >= 35) {
      handleDesconectar();
      limpaTabuleiro();
      setJogador('Jogador X');
      setPontuacaoJogadorX(0);
      setPontuacaoJogadorO(0);
      setEmpates(0);
      setJogoComecou(false);
      setJogadorAtual('');
      setJogadaAtual('');
      setDesativado(true);
      setTextoDaModal('');
      setModalVisivel(false);
    }
  }, [appState]);

  useEffect(() => {
    (jogador === user && jogoComecou) ? setDesativado(false) : setDesativado(true);
  }, [jogador, jogoComecou]);

  useEffect(() => {
    if (jogadorAtual === jogador && jogadaAtual) {
      validaJogada(celula, jogadaAtual, setCelula, jogadorAtual, setJogador, fimDaPartida);
    }
  }, [jogadaAtual]);

  useEffect(() => {
    if (jogoAcabou) {
      showMessage({
        message: 'Opponent left. Final score:',
        description: `Player X ${pontuacaoJogadorX} vs ${pontuacaoJogadorO} Player O` +
          `\n${empates} Draws`,
        type: 'info',
        icon: 'info',
        duration: 5000
      });

      navigate('Home');
    }
  }, [jogoAcabou]);

  useEffect(() => {
    if (textoDaModal) {
      setModalVisivel(true);
    }
  }, [textoDaModal]);

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', handleBotaoVoltar);

    return () => {
      BackHandler.removeEventListener('hardwareBackPress', handleBotaoVoltar);
    };
  }, [props.navigation]);

  useEffect(() => {
    const subscription = AppState.addEventListener('change', nextAppState => {
      setAppState(nextAppState);
    });

    return () => {
      subscription.remove();
    };
  }, []);

  useEffect(() => {
    if (!celula.every(str => str === '')) {
      validaResultado(celula, setVencedor, setFimDaPartida, corCelula, setCorCelula);
    }
  }, [celula]);

  useEffect(() => {
    let limpaTabuleiroTimeout;

    if (vencedor) {
      setDesativado(true);
      setJogadorAtual('');
      setJogadaAtual('');
      alteraPontuacao(vencedor, setPontuacaoJogadorX, setPontuacaoJogadorO, setEmpates);

      limpaTabuleiroTimeout = setTimeout(() => {
        if (vencedor === 'Empate') {
          setTextoDaModal('Draw');
        } else {
          let jogadorVenceu = vencedor.replace('Vencedor: ', '') === user;
          setTextoDaModal((jogadorVenceu) ? 'You win' : 'You lose');
        }

        limpaTabuleiro();

        if (jogador === user) {
          setDesativado(false);
        }
      }, 500);
    }

    return () => {
      clearTimeout(limpaTabuleiroTimeout);
    };
  }, [vencedor]);
  //#endregion

  return (
    <>
      {(!jogoComecou) ? (
        <>
          <CardAguardandoOponente codigoDaSala={roomCode} />

          {(action === 'create' && !carregando) && (
            <BannerAd
              unitId={(__DEV__) ? TestIds.BANNER : BANNER_ID}
              size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
              requestOptions={{
                requestNonPersonalizedAdsOnly: true
              }}
            />
          )}
        </>
      ) : (
        <Tabuleiro
          celula={celula}
          corCelula={corCelula}
          jogador={jogador}
          vencedor={vencedor}
          pontuacaoJogadorX={pontuacaoJogadorX}
          pontuacaoJogadorO={pontuacaoJogadorO}
          empates={empates}
          fimDaPartida={fimDaPartida}
          desativado={desativado}
          handleValidaJogada={handleFazerJogada}
          limpaTabuleiro={limpaTabuleiro}
          online={true}
        />
      )}

      <ModalResultadoDoJogo
        modalVisivel={modalVisivel}
        setModalVisivel={setModalVisivel}
        textoDaModal={textoDaModal}
        setTextoDaModal={setTextoDaModal}
      />

      <Modal visible={carregando} onRequestClose={() => null}>
        <Card containerStyle={styles.cardCarregando}>
          <Text bold centered noPaddingTop>CONNECTING...</Text>
          <Button type='clear' loading disabled noPaddingTop />
        </Card>
      </Modal>
    </>
  );
}