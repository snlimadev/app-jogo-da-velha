import { useState, useEffect } from 'react';
import { Text, ScrollView, View, Pressable, Button } from 'react-native';

import styles from './styles';
import { validaJogada, validaResultado, alteraPontuacao, fazJogadaDoComputador } from './Funcoes';

export default function Singleplayer() {

  const [celula, setCelula] = useState(Array(9).fill(''));
  const [corCelula, setCorCelula] = useState(Array(9).fill('black'));
  const [jogador, setJogador] = useState('Jogador X');
  const [vencedor, setVencedor] = useState('');
  const [pontuacaoJogadorX, setPontuacaoJogadorX] = useState(0);
  const [pontuacaoJogadorO, setPontuacaoJogadorO] = useState(0);
  const [fimDaPartida, setFimDaPartida] = useState(false);
  const botaoReset = (fimDaPartida) ? <Button title="Reiniciar partida" onPress={limpaTabuleiro} /> : <></>;

  useEffect(() => {
    validaResultado(celula, setVencedor, setFimDaPartida, corCelula, setCorCelula);
  }, [celula]);

  useEffect(() => {
    alteraPontuacao(vencedor, pontuacaoJogadorX, setPontuacaoJogadorX, pontuacaoJogadorO, setPontuacaoJogadorO);
  }, [vencedor]);

  useEffect(() => {
    fazJogadaDoComputador(celula, setCelula, jogador, setJogador, fimDaPartida);
  }, [jogador, fimDaPartida]);

  function limpaTabuleiro() {
    setCelula(Array(9).fill(''));
    setCorCelula(Array(9).fill('black'));
    setVencedor('');
    setFimDaPartida(false);
  }

  return (
    <ScrollView style={styles.containerScrollView}>
      <View style={styles.container}>

        <Text style={[styles.titulo, styles.margemSuperior, styles.margemInferior]}>Jogo da Velha</Text>

        <Text style={styles.margemInferior}>
          Jogador X <Text style={styles.placar}>{pontuacaoJogadorX} </Text>
          vs.
          <Text style={styles.placar}> {pontuacaoJogadorO}</Text> Jogador O
        </Text>

        <Text style={[styles.textoVencedor, styles.margemInferior]}>{vencedor}</Text>

        <View style={styles.margemInferior}>{botaoReset}</View>

        <Text>Vez do {jogador}</Text>

        <View style={[styles.linha, styles.linhasHorizontais, styles.margemSuperior]}>

          <Pressable onPress={() => { validaJogada(celula, 0, setCelula, jogador, setJogador, fimDaPartida) }} style={styles.celula}>
            <Text style={[styles.conteudoCelula, { color: corCelula[0] }]}>{celula[0]}</Text>
          </Pressable>

          <View style={styles.linhasVerticais}>
            <Pressable onPress={() => { validaJogada(celula, 1, setCelula, jogador, setJogador, fimDaPartida) }} style={styles.celula}>
              <Text style={[styles.conteudoCelula, { color: corCelula[1] }]}>{celula[1]}</Text>
            </Pressable>
          </View>

          <Pressable onPress={() => { validaJogada(celula, 2, setCelula, jogador, setJogador, fimDaPartida) }} style={styles.celula}>
            <Text style={[styles.conteudoCelula, { color: corCelula[2] }]}>{celula[2]}</Text>
          </Pressable>

        </View>

        <View style={[styles.linha, styles.linhasHorizontais]}>

          <Pressable onPress={() => { validaJogada(celula, 3, setCelula, jogador, setJogador, fimDaPartida) }} style={styles.celula}>
            <Text style={[styles.conteudoCelula, { color: corCelula[3] }]}>{celula[3]}</Text>
          </Pressable>

          <View style={styles.linhasVerticais}>
            <Pressable onPress={() => { validaJogada(celula, 4, setCelula, jogador, setJogador, fimDaPartida) }} style={styles.celula}>
              <Text style={[styles.conteudoCelula, { color: corCelula[4] }]}>{celula[4]}</Text>
            </Pressable>
          </View>

          <Pressable onPress={() => { validaJogada(celula, 5, setCelula, jogador, setJogador, fimDaPartida) }} style={styles.celula}>
            <Text style={[styles.conteudoCelula, { color: corCelula[5] }]}>{celula[5]}</Text>
          </Pressable>

        </View>

        <View style={styles.linha}>

          <Pressable onPress={() => { validaJogada(celula, 6, setCelula, jogador, setJogador, fimDaPartida) }} style={styles.celula}>
            <Text style={[styles.conteudoCelula, { color: corCelula[6] }]}>{celula[6]}</Text>
          </Pressable>

          <View style={styles.linhasVerticais}>
            <Pressable onPress={() => { validaJogada(celula, 7, setCelula, jogador, setJogador, fimDaPartida) }} style={styles.celula}>
              <Text style={[styles.conteudoCelula, { color: corCelula[7] }]}>{celula[7]}</Text>
            </Pressable>
          </View>

          <Pressable onPress={() => { validaJogada(celula, 8, setCelula, jogador, setJogador, fimDaPartida) }} style={styles.celula}>
            <Text style={[styles.conteudoCelula, { color: corCelula[8] }]}>{celula[8]}</Text>
          </Pressable>

        </View>

      </View>
    </ScrollView>
  );
}