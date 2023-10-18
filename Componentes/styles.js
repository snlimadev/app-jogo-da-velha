import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    containerScrollView: {
        backgroundColor: 'lightgray',
    },

    container: {
        flex: 1,
        backgroundColor: 'lightgray',
        alignItems: 'center',
        justifyContent: 'center',
    },

    estiloBotao: {
        padding: 10,
    },

    titulo: {
        fontSize: 40,
        fontWeight: 'bold',
    },

    textoVencedor: {
        color: '#daa520',
        fontSize: 25,
        fontWeight: 'bold',
    },

    placar: {
        fontSize: 30,
        fontWeight: 'bold',
    },

    margemInferior: {
        marginBottom: 20,
    },

    margemSuperior: {
        marginTop: 20,
    },

    linha: {
        flexDirection: 'row',
        justifyContent: 'center',
    },

    linhasHorizontais: {
        borderBottomWidth: 3,
        borderBottomStyle: 'solid',
    },

    linhasVerticais: {
        borderLeftWidth: 3,
        borderLeftStyle: 'solid',
        borderRightWidth: 3,
        borderRightStyle: 'solid',
    },

    celula: {
        width: 115,
        height: 115,
        justifyContent: 'center',
        alignItems: 'center',
    },

    conteudoCelula: {
        fontSize: 75,
    },
});

export default styles;