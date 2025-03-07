import { useState, useEffect } from 'react';
import { View, ScrollView } from 'react-native';
import { Button, Card, Icon, Text, Input } from '@rneui/themed';
import { BannerAd, BannerAdSize, TestIds } from 'react-native-google-mobile-ads';

import styles from '../../css/styles';

const BANNER_ID = 'ca-app-pub-4878437225305198/5154911335';

export default function Lobby(props) {
  const [codigoDaSala, setCodigoDaSala] = useState('');
  const [camposEntradaVisiveis, setCamposEntradaVisiveis] = useState(false);
  const [inputEmFoco, setInputEmFoco] = useState(false);
  const [botaoDesativado, setBotaoDesativado] = useState(true);

  //#region Funções locais
  const alternarVisibilidadeCamposEntrada = () => {
    setCodigoDaSala('');
    setInputEmFoco(false);
    setCamposEntradaVisiveis((estado) => !estado);
  };

  const handleCriarSala = () => {
    const codigoAleatorio = Math.floor(1000 + Math.random() * 9000);

    const horario = new Intl.DateTimeFormat('pt-BR', {
      timeZone: 'America/Sao_Paulo',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    }).format(new Date()).replace(':', '');

    props.navigation.navigate('Multiplayer (Online)', {
      action: 'create',
      user: 'Jogador X',
      roomCode: String(codigoAleatorio) + String(horario)
    });
  };

  const handleEntrarNaSala = () => {
    props.navigation.navigate('Multiplayer (Online)', {
      action: 'join',
      user: 'Jogador O',
      roomCode: codigoDaSala
    });
  };
  //#endregion

  useEffect(() => {
    (codigoDaSala.trim()) ? setBotaoDesativado(false) : setBotaoDesativado(true);
  }, [codigoDaSala]);

  return (
    <>
      <ScrollView
        contentContainerStyle={styles.containerScrollView}
        keyboardShouldPersistTaps='handled'
      >
        {(!camposEntradaVisiveis) ? (
          <>
            <Card containerStyle={{ marginBottom: 15 }}>
              <Card.Title>INSTRUCTIONS</Card.Title>

              <Card.Divider />

              <Text centered noPaddingTop>
                The creator of the room will be Player X.
              </Text>

              <Text centered>
                The user who joins the room will be Player O.
              </Text>
            </Card>

            <Button onPress={handleCriarSala} noPaddingTop>
              <Icon name='plus-circle' type='feather' /> CREATE A ROOM
            </Button>

            <Button onPress={alternarVisibilidadeCamposEntrada}>
              <Icon name='arrow-right-circle' type='feather' /> JOIN A ROOM
            </Button>
          </>
        ) : (
          <Card>
            <Card.Title>JOIN ROOM</Card.Title>

            <Card.Divider />

            <Input
              placeholder='Enter the room code'
              keyboardType='number-pad'
              maxLength={8}
              value={codigoDaSala}
              onChangeText={(e) => {
                setCodigoDaSala(e);
                setBotaoDesativado(!e);
              }}
              onFocus={() => setInputEmFoco(true)}
              onBlur={() => setInputEmFoco(false)}
              renderErrorMessage={false}
              focused={inputEmFoco}
            />

            <Card.Divider footer />

            <View style={styles.flexRowContainer}>
              <Button
                title='CANCEL'
                color='secondary'
                onPress={alternarVisibilidadeCamposEntrada}
                halfWidth
                noPaddingTop
              />

              <Button
                title='OK'
                disabled={botaoDesativado}
                onPress={handleEntrarNaSala}
                halfWidth
                noPaddingTop
              />
            </View>
          </Card>
        )}
      </ScrollView>

      <BannerAd
        unitId={(__DEV__) ? TestIds.BANNER : BANNER_ID}
        size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
        requestOptions={{
          requestNonPersonalizedAdsOnly: true
        }}
      />
    </>
  );
}