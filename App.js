import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import TelaInicial from './Componentes/TelaInicial';
import Singleplayer from './Componentes/Singleplayer';
import Multiplayer from './Componentes/Multiplayer';

const Stack = createStackNavigator();

export default function App() {

  return (
    <NavigationContainer>

      <Stack.Navigator>
        <Stack.Screen name="Escolha o modo de jogo" component={TelaInicial} />
        <Stack.Screen name="Um Jogador" component={Singleplayer} />
        <Stack.Screen name="Dois Jogadores" component={Multiplayer} />
      </Stack.Navigator>

    </NavigationContainer>
  );

}