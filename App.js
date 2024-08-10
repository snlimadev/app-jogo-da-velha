import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import TelaInicial from './Componentes/Telas/TelaInicial';
import Singleplayer from './Componentes/Telas/Singleplayer';
import Multiplayer from './Componentes/Telas/Multiplayer';
import Lobby from './Componentes/Telas/Lobby';
import Online from './Componentes/Telas/Online';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar style='dark' />

      <Stack.Navigator>
        <Stack.Screen name="Escolha o modo de jogo" component={TelaInicial} />
        <Stack.Screen name="Um Jogador" component={Singleplayer} />
        <Stack.Screen name="Dois Jogadores" component={Multiplayer} />
        <Stack.Screen name="Crie/entre em uma sala" component={Lobby} />
        <Stack.Screen name="Online" component={Online} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}