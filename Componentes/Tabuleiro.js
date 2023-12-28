import { Text, ScrollView, View, Pressable, Button } from 'react-native';

import styles from '../css/styles';

export default function Tabuleiro(props) {
  return (
    <ScrollView contentContainerStyle={styles.containerScrollView}>
      <View style={styles.container}>

        <Text style={[styles.titulo, styles.margemInferior]}>
          Jogo da Velha
        </Text>

        <Text style={styles.margemInferiorMenor}>
          Jogador X <Text style={styles.placar}>{props.pontuacaoJogadorX} </Text>
          vs.
          <Text style={styles.placar}> {props.pontuacaoJogadorO}</Text> Jogador O
        </Text>

        <Text style={styles.margemInferior}>
          <Text style={styles.placar}>{props.empates}</Text> Empates
        </Text>

        {(props.fimDaPartida) && (
          <>
            <Text style={[styles.textoVencedor, styles.margemInferior]}>
              {props.vencedor}
            </Text>

            {(!props.online) && (
              <View style={styles.margemInferior}>
                <Button
                  title='Reiniciar partida'
                  onPress={() => props.limpaTabuleiro()}
                />
              </View>
            )}
          </>
        )}

        <Text style={styles.margemSuperior}>
          Vez do {props.jogador}
        </Text>

        <View style={[styles.linha, styles.linhasHorizontais, styles.margemSuperior]}>
          <Pressable
            onPress={() => props.handleValidaJogada(0)}
            style={styles.celula}
            disabled={props.desativado}
          >
            <Text style={[styles.conteudoCelula, { color: props.corCelula[0] }]}>
              {props.celula[0]}
            </Text>
          </Pressable>

          <View style={styles.linhasVerticais}>
            <Pressable
              onPress={() => props.handleValidaJogada(1)}
              style={styles.celula}
              disabled={props.desativado}
            >
              <Text style={[styles.conteudoCelula, { color: props.corCelula[1] }]}>
                {props.celula[1]}
              </Text>
            </Pressable>
          </View>

          <Pressable
            onPress={() => props.handleValidaJogada(2)}
            style={styles.celula}
            disabled={props.desativado}
          >
            <Text style={[styles.conteudoCelula, { color: props.corCelula[2] }]}>
              {props.celula[2]}
            </Text>
          </Pressable>
        </View>

        <View style={[styles.linha, styles.linhasHorizontais]}>
          <Pressable
            onPress={() => props.handleValidaJogada(3)}
            style={styles.celula}
            disabled={props.desativado}
          >
            <Text style={[styles.conteudoCelula, { color: props.corCelula[3] }]}>
              {props.celula[3]}
            </Text>
          </Pressable>

          <View style={styles.linhasVerticais}>
            <Pressable
              onPress={() => props.handleValidaJogada(4)}
              style={styles.celula}
              disabled={props.desativado}
            >
              <Text style={[styles.conteudoCelula, { color: props.corCelula[4] }]}>
                {props.celula[4]}
              </Text>
            </Pressable>
          </View>

          <Pressable
            onPress={() => props.handleValidaJogada(5)}
            style={styles.celula}
            disabled={props.desativado}
          >
            <Text style={[styles.conteudoCelula, { color: props.corCelula[5] }]}>
              {props.celula[5]}
            </Text>
          </Pressable>
        </View>

        <View style={styles.linha}>
          <Pressable
            onPress={() => props.handleValidaJogada(6)}
            style={styles.celula}
            disabled={props.desativado}
          >
            <Text style={[styles.conteudoCelula, { color: props.corCelula[6] }]}>
              {props.celula[6]}
            </Text>
          </Pressable>

          <View style={styles.linhasVerticais}>
            <Pressable
              onPress={() => props.handleValidaJogada(7)}
              style={styles.celula}
              disabled={props.desativado}
            >
              <Text style={[styles.conteudoCelula, { color: props.corCelula[7] }]}>
                {props.celula[7]}
              </Text>
            </Pressable>
          </View>

          <Pressable
            onPress={() => props.handleValidaJogada(8)}
            style={styles.celula}
            disabled={props.desativado}
          >
            <Text style={[styles.conteudoCelula, { color: props.corCelula[8] }]}>
              {props.celula[8]}
            </Text>
          </Pressable>
        </View>

      </View>
    </ScrollView>
  );
}