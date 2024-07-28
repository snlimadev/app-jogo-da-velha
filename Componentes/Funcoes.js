import { Alert } from 'react-native';

const conjuntosVencedores = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

//#region Função chamada no evento onPress de cada célula
export function validaJogada(celula, index, setCelula, jogador, setJogador, fimDaPartida) {
  if (celula[index] === '' && !fimDaPartida) {
    const novaCelula = [...celula];
    novaCelula[index] = (jogador === 'Jogador X') ? 'X' : 'O';
    setCelula(novaCelula);
    setJogador((jogador === 'Jogador X') ? 'Jogador O' : 'Jogador X');
  }
}
//#endregion

//#region Funções para validar o resultado e trocar a cor das células do conjunto vencedor
function trocaCorCelula(corCelula, index1, index2, index3, setCorCelula) {
  const novaCor = [...corCelula];
  novaCor[index1] = 'red';
  novaCor[index2] = 'red';
  novaCor[index3] = 'red';
  setCorCelula(novaCor);
}

export function validaResultado(celula, setVencedor, setFimDaPartida, corCelula, setCorCelula) {
  let conjuntoPreenchido = 0;
  for (let i = 0; i < 8; i++) {
    const index1 = conjuntosVencedores[i][0];
    const index2 = conjuntosVencedores[i][1];
    const index3 = conjuntosVencedores[i][2];
    if (celula[index1] === 'X' && celula[index2] === 'X' && celula[index3] === 'X') {
      setVencedor('Vencedor: Jogador X');
      setFimDaPartida(true);
      trocaCorCelula(corCelula, index1, index2, index3, setCorCelula);
      break;
    } else if (celula[index1] === 'O' && celula[index2] === 'O' && celula[index3] === 'O') {
      setVencedor('Vencedor: Jogador O');
      setFimDaPartida(true);
      trocaCorCelula(corCelula, index1, index2, index3, setCorCelula);
      break;
    } else if (celula[index1] !== '' && celula[index2] !== '' && celula[index3] !== '') {
      conjuntoPreenchido++;
      if (conjuntoPreenchido === 8) {
        setVencedor('Empate');
        setFimDaPartida(true);
      }
    }
  }
}
//#endregion

//#region Função para alterar a pontuação
export function alteraPontuacao(vencedor, setPontuacaoJogadorX, setPontuacaoJogadorO, setEmpates) {
  switch (vencedor) {
    case 'Vencedor: Jogador X':
      setPontuacaoJogadorX((pontuacaoJogadorX) => pontuacaoJogadorX + 1);
      break;
    case 'Vencedor: Jogador O':
      setPontuacaoJogadorO((pontuacaoJogadorO) => pontuacaoJogadorO + 1);
      break;
    case 'Empate':
      setEmpates((empates) => empates + 1);
      break;
    default:
      break;
  }
}
//#endregion

//#region Funções para fazer a jogada do computador no modo singleplayer
function preencheCelula(celula, index, setCelula, setJogador) {
  const novaCelula = [...celula];
  novaCelula[index] = 'O';
  setCelula(novaCelula);
  setJogador('Jogador X');
}

export function fazJogadaDoComputador(celula, setCelula, jogador, setJogador, fimDaPartida) {
  //#region Corrige o bug em que o computador realiza a jogada após o fim do jogo
  let gameOver = false;
  for (let i = 0; i < 8; i++) {
    const index1 = conjuntosVencedores[i][0];
    const index2 = conjuntosVencedores[i][1];
    const index3 = conjuntosVencedores[i][2];
    if (celula[index1] === 'X' && celula[index2] === 'X' && celula[index3] === 'X') {
      gameOver = true;
      break;
    }
  }
  //#endregion

  if (jogador === 'Jogador O' && !fimDaPartida && !gameOver) {
    jogadaFeita = false;
    //#region Jogadas que selam a vitória
    for (let i = 0; i < 8; i++) {
      const index1 = conjuntosVencedores[i][0];
      const index2 = conjuntosVencedores[i][1];
      const index3 = conjuntosVencedores[i][2];
      if (celula[index1] === '' && celula[index2] === 'O' && celula[index3] === 'O') {
        preencheCelula(celula, index1, setCelula, setJogador);
        jogadaFeita = true;
        break;
      } else if (celula[index1] === 'O' && celula[index2] === '' && celula[index3] === 'O') {
        preencheCelula(celula, index2, setCelula, setJogador);
        jogadaFeita = true;
        break;
      } else if (celula[index1] === 'O' && celula[index2] === 'O' && celula[index3] === '') {
        preencheCelula(celula, index3, setCelula, setJogador);
        jogadaFeita = true;
        break;
      }
    }
    //#endregion

    //#region Jogadas que impedem a derrota
    if (!jogadaFeita) {
      for (let i = 0; i < 8; i++) {
        const index1 = conjuntosVencedores[i][0];
        const index2 = conjuntosVencedores[i][1];
        const index3 = conjuntosVencedores[i][2];
        if (celula[index1] === '' && celula[index2] === 'X' && celula[index3] === 'X') {
          preencheCelula(celula, index1, setCelula, setJogador);
          jogadaFeita = true;
          break;
        } else if (celula[index1] === 'X' && celula[index2] === '' && celula[index3] === 'X') {
          preencheCelula(celula, index2, setCelula, setJogador);
          jogadaFeita = true;
          break;
        } else if (celula[index1] === 'X' && celula[index2] === 'X' && celula[index3] === '') {
          preencheCelula(celula, index3, setCelula, setJogador);
          jogadaFeita = true;
          break;
        }
      }
    }
    //#endregion

    //#region Demais jogadas
    if (!jogadaFeita) {
      if (celula[4] === '') {
        preencheCelula(celula, 4, setCelula, setJogador);
      } else if (celula[3] === '' && celula[4] !== 'X' && celula[5] !== 'X') {
        preencheCelula(celula, 3, setCelula, setJogador);
      } else if (celula[1] === '' && celula[4] !== 'X' && celula[7] !== 'X') {
        preencheCelula(celula, 1, setCelula, setJogador);
      } else if (celula[0] === '') {
        preencheCelula(celula, 0, setCelula, setJogador);
      } else if (celula[2] === '') {
        preencheCelula(celula, 2, setCelula, setJogador);
      } else if (celula[6] === '') {
        preencheCelula(celula, 6, setCelula, setJogador);
      } else if (celula[8] === '') {
        preencheCelula(celula, 8, setCelula, setJogador);
      } else if (celula[1] === '') {
        preencheCelula(celula, 1, setCelula, setJogador);
      } else if (celula[3] === '') {
        preencheCelula(celula, 3, setCelula, setJogador);
      } else if (celula[5] === '') {
        preencheCelula(celula, 5, setCelula, setJogador);
      } else if (celula[7] === '') {
        preencheCelula(celula, 7, setCelula, setJogador);
      }
    }
    //#endregion
  }
}
//#endregion

//#region Funções do modo online
export function handleEventosWebSocket(
  ws,
  setReadyState,
  handleCriarOuEntrarNaSala,
  handleJogadas,
  navigate
) {
  if (ws) {
    ws.onopen = () => {
      setReadyState('OPEN');
      handleCriarOuEntrarNaSala();
    };

    ws.onclose = () => {
      setReadyState('CLOSED');
      navigate('Crie/entre em uma sala');
    };

    ws.onerror = () => {
      Alert.alert(
        'A conexão com o servidor foi perdida ou expirou',
        'Por favor, verifique sua conexão com a internet ' +
        'e tente novamente mais tarde.'
      );
    };

    ws.onmessage = (e) => {
      handleJogadas(e);
    };
  }
}

export function criarOuEntrarNaSala(action, user, roomCode, ws) {
  const mensagem = {
    action: action,
    user: user,
    roomCode: roomCode,
    maxClients: 2
  };

  ws.send(JSON.stringify(mensagem));
};

export function fazerJogada(jogada, ws, readyState) {
  if (readyState === 'OPEN') {
    const mensagem = {
      text: jogada
    };

    if (ws) {
      ws.send(JSON.stringify(mensagem));
    }
  }
};

export function handleRodadasDoJogo(
  e,
  setJogoComecou,
  setJogadorAtual,
  setJogadaAtual,
  navigate
) {
  try {
    const mensagem = JSON.parse(e.data);
    const jogadorAtual = mensagem.sender;
    const jogadaAtual = mensagem.message;
    const evento = mensagem.event;
    const erro = mensagem.error;

    if (jogadorAtual && jogadaAtual) {
      setJogadorAtual(jogadorAtual);
      setJogadaAtual(jogadaAtual);
    } else if (evento) {
      if (evento === 'Jogador O joined the room') {
        setJogoComecou(true);
      } else if (evento.endsWith('left the room')) {
        Alert.alert(
          'Aviso',
          'O adversário saiu do jogo.'
        );

        navigate('Crie/entre em uma sala');
      }
    } else if (erro) {
      Alert.alert(
        'A conexão com o servidor foi perdida ou expirou',
        'Por favor, verifique sua conexão com a internet ' +
        'e tente novamente mais tarde.\n\n' +
        'Detalhes do erro: ' + erro
      );

      navigate('Crie/entre em uma sala');
    }
  } catch (error) {
    console.error('Erro: ', error);
  }
};
//#endregion
