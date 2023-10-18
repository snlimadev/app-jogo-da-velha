import { View, Button, ImageBackground } from 'react-native';

import styles from './styles';
import imagemDeFundo from '../assets/imagemDeFundo.png';

export default function TelaInicial(props) {
    return (
        <ImageBackground source={imagemDeFundo} resizeMode="cover" style={styles.container}>

            <View style={styles.estiloBotao}>
                <Button title="Um Jogador" onPress={() => props.navigation.navigate("Um Jogador")} />
            </View>

            <View style={styles.estiloBotao}>
                <Button title="Dois Jogadores" onPress={() => props.navigation.navigate("Dois Jogadores")} />
            </View>

        </ImageBackground>
    );
}