import { useState, useEffect, useMemo } from 'react';
import { View, Text, Button, Share, Modal } from 'react-native';

import styles from '../../css/styles';
import Tabuleiro from '../Tabuleiro';

import {
  validaJogada,
  validaResultado,
  alteraPontuacao,
  handleEventosWebSocket,
  criarOuEntrarNaSala,
  fazerJogada,
  handleRodadasDoJogo
} from '../Funcoes';

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
  const [readyState, setReadyState] = useState('CONNECTING');
  const [jogadorAtual, setJogadorAtual] = useState('');
  const [jogadaAtual, setJogadaAtual] = useState('');
  const [desativado, setDesativado] = useState(true);

  const ws = useMemo(() => new WebSocket('wss://api-basic-temporary-chat.glitch.me'), []);
  const { action, user, roomCode } = props.route.params;
  const navigate = props.navigation.navigate;

  //#region Funções locais
  const compartilhar = async () => {
    try {
      await Share.share({
        message: `O código da sala para o Jogo da Velha é ${roomCode}`
      });
    } catch (error) {
      alert(error.message);
    }
  };

  const handleCriarOuEntrarNaSala = () => {
    criarOuEntrarNaSala(action, user, roomCode, ws);
    setCarregando(false);
  };

  const handleFazerJogada = (jogada) => {
    if (celula[jogada] === '') {
      setDesativado(true);
      fazerJogada(jogada.toString(), ws, readyState);
    }
  };

  const handleJogadas = (e) => {
    handleRodadasDoJogo(
      e,
      setJogoComecou,
      setJogadorAtual,
      setJogadaAtual,
      navigate
    );
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
    handleEventosWebSocket(
      ws,
      setReadyState,
      handleCriarOuEntrarNaSala,
      handleJogadas,
      navigate
    );

    return () => {
      if (ws && readyState === 'OPEN') {
        ws.close();
      }
    };
  }, [readyState]);

  useEffect(() => {
    (jogador === user && jogoComecou) ? setDesativado(false) : setDesativado(true);
  }, [jogador, jogoComecou]);

  useEffect(() => {
    if (jogadorAtual && jogadaAtual) {
      validaJogada(celula, jogadaAtual, setCelula, jogadorAtual, setJogador, fimDaPartida);
    }
  }, [jogadorAtual, jogadaAtual]);

  useEffect(() => {
    if (!celula.every(str => str === '')) {
      validaResultado(celula, setVencedor, setFimDaPartida, corCelula, setCorCelula);
    }
  }, [celula]);

  useEffect(() => {
    if (vencedor) {
      setDesativado(true);
      setJogadorAtual('');
      setJogadaAtual('');
      alteraPontuacao(vencedor, setPontuacaoJogadorX, setPontuacaoJogadorO, setEmpates);

      const limpaTabuleiroTimeout = setTimeout(() => {
        limpaTabuleiro();

        if (jogador === user) {
          setDesativado(false);
        }
      }, 2500);

      return () => {
        clearTimeout(limpaTabuleiroTimeout);
      };
    }
  }, [vencedor]);
  //#endregion

  return (
    <>
      <Modal visible={carregando} onRequestClose={() => null}>
        <View style={styles.container}>
          <Text style={styles.textoDestacado}>
            Conectando-se ao servidor...
          </Text>
        </View>
      </Modal>

      {(!jogoComecou) ? (
        <View style={styles.container}>
          <Text>O código da sala é</Text>

          <Text style={[styles.placar, styles.margemInferior]} selectable>
            {roomCode}
          </Text>

          <Text style={[styles.margemInferiorMenor, styles.centralizaTexto]}>
            Compartilhe-o com um amigo e comece a jogar!
          </Text>

          <Text style={[styles.margemInferior, styles.centralizaTexto]}>
            Sua sessão vai expirar em 3 minutos se ninguém entar na sala.
          </Text>

          <Button title='Compartilhar' onPress={compartilhar} />
        </View>
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
    </>
  );
}