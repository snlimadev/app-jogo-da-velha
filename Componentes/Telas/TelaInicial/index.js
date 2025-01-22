import { useState, useCallback } from 'react';
import { ScrollView, Linking, Pressable } from 'react-native';
import { Text, Button, Icon } from '@rneui/themed';
import { BannerAd, BannerAdSize, TestIds } from 'react-native-google-mobile-ads';
import { useFocusEffect } from '@react-navigation/native';

import styles from '../../../css/styles';

const BANNER_ID = 'ca-app-pub-4878437225305198/5832255109';

export default function TelaInicial(props) {
  const [bannerVisivel, setBannerVisivel] = useState(false);

  const handleAbrirURL = (appId) => {
    Linking.openURL(`https://play.google.com/store/apps/details?id=${appId}`);
  };

  useFocusEffect(
    useCallback(() => {
      setBannerVisivel(true);

      return () => {
        setBannerVisivel(false);
      };
    }, [])
  );

  return (
    <>
      <ScrollView contentContainerStyle={styles.containerScrollView}>
        <Text h4 centered noPaddingTop>
          Welcome to Tic-Tac-Toe - Online!
        </Text>

        <Button onPress={() => props.navigation.navigate('Singleplayer')}>
          <Icon name='user' type='feather' /> SINGLEPLAYER
        </Button>

        <Button onPress={() => props.navigation.navigate('Multiplayer (Local)')}>
          <Icon name='users' type='feather' /> MULTIPLAYER (LOCAL)
        </Button>

        <Button onPress={() => props.navigation.navigate('Lobby')}>
          <Icon name='users' type='feather' /> MULTIPLAYER (ONLINE)
        </Button>

        <Text centered>
          <Text noPaddingTop>If you like it, please </Text>

          <Pressable onPress={() => handleAbrirURL('com.snlimadev.jogodavelha')}>
            <Text primary bold underline noPaddingTop>rate the app</Text>
          </Pressable>
        </Text>

        <Text centered>
          <Text noPaddingTop>You may also like our other online games, </Text>

          <Pressable onPress={() => handleAbrirURL('com.snlimadev.battleship')}>
            <Text primary bold underline noPaddingTop>Battleship</Text>
          </Pressable>

          <Text noPaddingTop> and </Text>

          <Pressable onPress={() => handleAbrirURL('com.snlimadev.rockpaperscissors')}>
            <Text primary bold underline noPaddingTop>Rock Paper Scissors</Text>
          </Pressable>
        </Text>
      </ScrollView>

      {(bannerVisivel) && (
        <BannerAd
          unitId={(__DEV__) ? TestIds.BANNER : BANNER_ID}
          size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
          requestOptions={{
            requestNonPersonalizedAdsOnly: true
          }}
        />
      )}
    </>
  );
}