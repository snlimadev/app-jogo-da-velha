import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  containerScrollView: {
    flexGrow: 1,
    backgroundColor: 'lightgray',
    justifyContent: 'center',
  },

  container: {
    flex: 1,
    backgroundColor: 'lightgray',
    alignItems: 'center',
    justifyContent: 'center',
  },

  estiloBotao: {
    paddingBottom: 20,
  },

  estiloBotaoContainer: {
    paddingHorizontal: 10,
  },

  titulo: {
    fontSize: 40,
    fontWeight: 'bold',
  },

  textoBoasVindas: {
    fontSize: 25,
    fontWeight: 'bold',
    textAlign: 'center',
    paddingBottom: 20,
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
    marginBottom: 15,
  },

  margemInferiorMenor: {
    marginBottom: 5,
  },

  margemSuperior: {
    marginTop: 15,
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
    width: 110,
    height: 110,
    justifyContent: 'center',
    alignItems: 'center',
  },

  conteudoCelula: {
    fontSize: 75,
  },

  textoDestacado: {
    fontWeight: 'bold',
    fontSize: 15,
    textAlign: 'center',
  },

  centralizaTexto: {
    textAlign: 'center',
  },

  input: {
    borderRadius: 5,
    width: 100,
    backgroundColor: 'white',
  },

  inputNormal: {
    borderWidth: 1,
    borderColor: 'gray',
  },

  inputEmFoco: {
    borderWidth: 3,
    borderColor: 'black',
  },
});

export default styles;