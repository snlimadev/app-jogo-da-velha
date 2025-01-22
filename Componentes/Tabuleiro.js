import { Text, ScrollView, View, Pressable } from 'react-native';
import { useTheme } from '@rneui/themed';

import Placar from './Placar';
import styles from '../css/styles';

export default function Tabuleiro(props) {
  const { theme } = useTheme();

  const obterCorPorIndice = (indice) => {
    if (props.corCelula[indice] === 'black') {
      return theme.colors.black;
    } else {
      return theme.colors.primary;
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.containerScrollView}>

      <Placar
        pontuacaoJogadorX={props.pontuacaoJogadorX}
        pontuacaoJogadorO={props.pontuacaoJogadorO}
        empates={props.empates}
        vencedor={props.vencedor}
        fimDaPartida={props.fimDaPartida}
        online={props.online}
        limpaTabuleiro={props.limpaTabuleiro}
        jogador={props.jogador}
      />

      <View style={{ alignItems: 'center' }}>
        <View
          style={[
            styles.linha,
            styles.linhasHorizontais,
            { marginTop: 20, borderColor: theme.colors.black }
          ]}
        >
          <Pressable
            onPress={() => props.handleValidaJogada(0)}
            style={styles.celula}
            disabled={props.desativado}
          >
            <Text style={[styles.conteudoCelula, { color: obterCorPorIndice(0) }]}>
              {props.celula[0]}
            </Text>
          </Pressable>

          <View style={[styles.linhasVerticais, { borderColor: theme.colors.black }]}>
            <Pressable
              onPress={() => props.handleValidaJogada(1)}
              style={styles.celula}
              disabled={props.desativado}
            >
              <Text style={[styles.conteudoCelula, { color: obterCorPorIndice(1) }]}>
                {props.celula[1]}
              </Text>
            </Pressable>
          </View>

          <Pressable
            onPress={() => props.handleValidaJogada(2)}
            style={styles.celula}
            disabled={props.desativado}
          >
            <Text style={[styles.conteudoCelula, { color: obterCorPorIndice(2) }]}>
              {props.celula[2]}
            </Text>
          </Pressable>
        </View>

        <View
          style={[
            styles.linha,
            styles.linhasHorizontais,
            { borderColor: theme.colors.black }
          ]}
        >
          <Pressable
            onPress={() => props.handleValidaJogada(3)}
            style={styles.celula}
            disabled={props.desativado}
          >
            <Text style={[styles.conteudoCelula, { color: obterCorPorIndice(3) }]}>
              {props.celula[3]}
            </Text>
          </Pressable>

          <View style={[styles.linhasVerticais, { borderColor: theme.colors.black }]}>
            <Pressable
              onPress={() => props.handleValidaJogada(4)}
              style={styles.celula}
              disabled={props.desativado}
            >
              <Text style={[styles.conteudoCelula, { color: obterCorPorIndice(4) }]}>
                {props.celula[4]}
              </Text>
            </Pressable>
          </View>

          <Pressable
            onPress={() => props.handleValidaJogada(5)}
            style={styles.celula}
            disabled={props.desativado}
          >
            <Text style={[styles.conteudoCelula, { color: obterCorPorIndice(5) }]}>
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
            <Text style={[styles.conteudoCelula, { color: obterCorPorIndice(6) }]}>
              {props.celula[6]}
            </Text>
          </Pressable>

          <View style={[styles.linhasVerticais, { borderColor: theme.colors.black }]}>
            <Pressable
              onPress={() => props.handleValidaJogada(7)}
              style={styles.celula}
              disabled={props.desativado}
            >
              <Text style={[styles.conteudoCelula, { color: obterCorPorIndice(7) }]}>
                {props.celula[7]}
              </Text>
            </Pressable>
          </View>

          <Pressable
            onPress={() => props.handleValidaJogada(8)}
            style={styles.celula}
            disabled={props.desativado}
          >
            <Text style={[styles.conteudoCelula, { color: obterCorPorIndice(8) }]}>
              {props.celula[8]}
            </Text>
          </Pressable>
        </View>
      </View>
    </ScrollView>
  );
}