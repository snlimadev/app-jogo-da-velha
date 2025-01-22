import { ScrollView, Share } from 'react-native';
import * as Clipboard from 'expo-clipboard';
import { Button, Card, Text, Icon } from '@rneui/themed';
import { showMessage } from 'react-native-flash-message';

import styles from '../css/styles';

export default function CardAguardandoOponente(props) {
  const codigo = props.codigoDaSala;
  const texto = `Room code for Tic-Tac-Toe - Online is ${codigo}`;

  //#region Funções locais
  const copiar = async () => {
    try {
      await Clipboard.setStringAsync(texto);
      showMessage({ message: 'Copied', type: 'info', icon: 'info' });
    } catch (error) {
      alert(error.message);
    }
  };

  const compartilhar = async () => {
    try {
      await Share.share({ message: texto });
    } catch (error) {
      alert(error.message);
    }
  };
  //#endregion

  return (
    <ScrollView contentContainerStyle={styles.containerScrollView}>
      <Card>
        <Card.Title>Waiting for an opponent...</Card.Title>

        <Card.Divider />

        <Text selectable centered noPaddingTop>
          The room code is <Text bold>{codigo}</Text>. Please note your session
          will expire in 3 minutes if an opponent doesn't join the game.
        </Text>

        <Button type='outline' size='sm' info onPress={copiar}>
          <Icon name='copy' type='font-awesome' small info /> COPY ROOM CODE
        </Button>

        <Button type='outline' size='sm' info onPress={compartilhar}>
          <Icon name='share-alt' type='font-awesome' small info /> SHARE ROOM CODE
        </Button>
      </Card>
    </ScrollView>
  );
}