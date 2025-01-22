import { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Icon, useTheme } from '@rneui/themed';

import TelaInicial from '../Telas/TelaInicial';
import Singleplayer from '../Telas/Singleplayer';
import Multiplayer from '../Telas/Multiplayer';
import Lobby from '../Telas/Lobby';
import Online from '../Telas/Online';

const Stack = createStackNavigator();

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
                name={'home'}
                type='ionicon'
                onPress={() => props.navigation.navigate('Home')}
              />
            )
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}