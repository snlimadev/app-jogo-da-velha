import { useState, useEffect } from 'react';

import Tabuleiro from '../Tabuleiro';

import {
  validaJogada,
  validaResultado,
  alteraPontuacao,
  fazJogadaDoComputador
} from '../Funcoes';

export default function Singleplayer() {
  const [celula, setCelula] = useState(Array(9).fill(''));
  const [corCelula, setCorCelula] = useState(Array(9).fill('black'));
  const [jogador, setJogador] = useState('Jogador X');
  const [vencedor, setVencedor] = useState('');
  const [pontuacaoJogadorX, setPontuacaoJogadorX] = useState(0);
  const [pontuacaoJogadorO, setPontuacaoJogadorO] = useState(0);
  const [empates, setEmpates] = useState(0);
  const [fimDaPartida, setFimDaPartida] = useState(false);

  //#region Funções locais
  const handleValidaJogada = (index) => {
    validaJogada(celula, index, setCelula, jogador, setJogador, fimDaPartida);
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
    if (!celula.every(str => str === '')) {
      validaResultado(celula, setVencedor, setFimDaPartida, corCelula, setCorCelula);
    }
  }, [celula]);

  useEffect(() => {
    if (vencedor) {
      alteraPontuacao(vencedor, setPontuacaoJogadorX, setPontuacaoJogadorO, setEmpates);
    }
  }, [vencedor]);

  useEffect(() => {
    fazJogadaDoComputador(celula, setCelula, jogador, setJogador, fimDaPartida);
  }, [jogador, fimDaPartida]);
  //#endregion

  return (
    <Tabuleiro
      celula={celula}
      corCelula={corCelula}
      jogador={jogador}
      vencedor={vencedor}
      pontuacaoJogadorX={pontuacaoJogadorX}
      pontuacaoJogadorO={pontuacaoJogadorO}
      empates={empates}
      fimDaPartida={fimDaPartida}
      desativado={false}
      handleValidaJogada={handleValidaJogada}
      limpaTabuleiro={limpaTabuleiro}
      online={false}
    />
  );
}