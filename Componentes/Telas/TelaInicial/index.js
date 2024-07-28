import { View, Button, ScrollView, Text } from 'react-native';

import styles from '../../../css/styles';

export default function TelaInicial(props) {
  return (
    <ScrollView contentContainerStyle={styles.containerScrollView}>
      <View style={styles.container}>

        <Text style={styles.textoBoasVindas}>
          Bem-vindo ao Jogo da Velha!
        </Text>

        <View style={styles.containerTelaInicial}>
          <View style={styles.estiloBotao}>
            <Button
              title='Um Jogador'
              onPress={() => props.navigation.navigate('Um Jogador')}
            />
          </View>

          <View style={styles.estiloBotao}>
            <Button
              title='Dois Jogadores'
              onPress={() => props.navigation.navigate('Dois Jogadores')}
            />
          </View>

          <View>
            <Button
              title='Online'
              onPress={() => props.navigation.navigate('Crie/entre em uma sala')}
            />
          </View>
        </View>

      </View>
    </ScrollView>
  );
}