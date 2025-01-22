import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  containerScrollView: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 10,
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

  flexRowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  flexColumnContainer: {
    flexDirection: 'column',
    alignItems: 'center',
  },

  overlayDaModal: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },

  cardCarregando: {
    flex: 1,
    justifyContent: 'center',
    marginHorizontal: 0,
    borderRadius: 0,
    borderWidth: 0,
  },
});

export default styles;