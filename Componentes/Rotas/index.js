import { useState } from 'react';
import { KeyboardAvoidingView, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Icon, useTheme } from '@rneui/themed';

import TelaInicial from '../Telas/TelaInicial';
import Singleplayer from '../Telas/Singleplayer';
import Multiplayer from '../Telas/Multiplayer';
import Lobby from '../Telas/Lobby';
import Online from '../Telas/Online';

const Stack = createNativeStackNavigator();

export default function Rotas() {
  const [iconeDoTema, setIconeDoTema] = useState('moon');
  const { theme, updateTheme } = useTheme();

  const alternaModoEscuro = () => {
    updateTheme((tema) => ({
      mode: (tema.mode === 'light') ? 'dark' : 'light',
    }));

    setIconeDoTema((iconeDoTema === 'moon') ? 'sunny' : 'moon');
  };

  return (
    <NavigationContainer theme={theme}>
      <SafeAreaView
        style={{ flex: 1, backgroundColor: theme.colors.background }}
        edges={['bottom']}
      >
        <Stack.Navigator
          screenOptions={{
            headerStyle: { backgroundColor: theme.colors.primary },
            headerTitleAlign: 'center',
            headerTitleStyle: { color: theme.colors.topBarText },
            headerTintColor: theme.colors.topBarText,
            headerRight: () => (
              <Icon
                topBar
                name={iconeDoTema}
                type='ionicon'
                onPress={alternaModoEscuro}
              />
            )
          }}
        >
          <Stack.Screen name="Home" component={TelaInicial} />

          <Stack.Screen name="Singleplayer" component={Singleplayer} />

          <Stack.Screen name="Multiplayer (Local)" component={Multiplayer} />

          <Stack.Screen name="Lobby" component={Lobby} />

          <Stack.Screen
            name="Multiplayer (Online)"
            component={Online}
            options={(props) => ({
              headerLeft: () => (
                <Icon
                  topBar
                  name='home'
                  type='ionicon'
                  onPress={() => props.navigation.navigate('Home')}
                />
              )
            })}
          />
        </Stack.Navigator>

        {(Platform.OS === 'android' && Platform.Version >= 35) && (
          <KeyboardAvoidingView behavior='padding' />
        )}
      </SafeAreaView>
    </NavigationContainer>
  );
}