import { ThemeProvider } from '@rneui/themed';
import FlashMessage from 'react-native-flash-message';

import temaPersonalizado from './Temas/TemaPersonalizado';
import Rotas from './Componentes/Rotas';

export default function App() {
  return (
    <ThemeProvider theme={temaPersonalizado}>
      <Rotas />

      <FlashMessage position='top' />
    </ThemeProvider>
  );
}