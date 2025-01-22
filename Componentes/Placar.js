import { View } from 'react-native';
import { Card, Text, Button, Icon } from '@rneui/themed';

import styles from '../css/styles';

export default function Placar(props) {
  const obterVencedor = (texto) => {
    let vencedor = '';

    switch (texto) {
      case 'Vencedor: Jogador X':
        vencedor = 'Player X wins!';
        break;
      case 'Vencedor: Jogador O':
        vencedor = 'Player O wins!';
        break;
      case 'Empate':
        vencedor = 'Draw!';
        break;
      default:
        break;
    }

    return vencedor;
  };

  return (
    <>
      <Card containerStyle={{ marginBottom: 20 }}>
        <Card.Title>SCORE</Card.Title>

        <Card.Divider />

        <View style={styles.flexColumnContainer}>
          <View style={styles.flexRowContainer}>
            <Text noPaddingTop>Player X</Text>
            <Text bold xxlarge noPaddingTop> {props.pontuacaoJogadorX} </Text>

            <Text noPaddingTop>vs</Text>

            <Text bold xxlarge noPaddingTop> {props.pontuacaoJogadorO} </Text>
            <Text noPaddingTop>Player O</Text>
          </View>

          <View style={styles.flexRowContainer}>
            <Text bold xxlarge noPaddingTop>{props.empates} </Text>
            <Text noPaddingTop>Draws</Text>
          </View>
        </View>
      </Card>

      {(props.fimDaPartida && !props.online) ? (
        <>
          <Text bold centered large noPaddingTop style={{ color: '#DAA520' }}>
            {obterVencedor(props.vencedor)}
          </Text>

          <Button onPress={props.limpaTabuleiro}>
            <Icon name='play-circle-outline' type='ionicons' /> PLAY AGAIN
          </Button>
        </>
      ) : (
        <Text centered noPaddingTop>
          {(props.jogador === 'Jogador X') ? "Player X's turn" : "Player O's turn"}
        </Text>
      )}
    </>
  );
}