import { View, Button, ImageBackground } from 'react-native';

import styles from '../../../css/styles';
import imagemDeFundo from '../../../assets/imagemDeFundo.png';

export default function TelaInicial(props) {
  return (
    <ImageBackground source={imagemDeFundo} resizeMode='cover' style={styles.container}>
      <View>

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

        <View style={styles.estiloBotao}>
          <Button
            title='Online'
            onPress={() => props.navigation.navigate('Crie/entre em uma sala')}
          />
        </View>

      </View>
    </ImageBackground>
  );
}