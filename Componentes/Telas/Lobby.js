import { useState, useEffect } from 'react';
import { View, ScrollView, Text, Button, TextInput } from 'react-native';

import styles from '../../css/styles';

export default function Lobby(props) {
  const [codigoDaSala, setCodigoDaSala] = useState('');
  const [camposEntradaVisiveis, setCamposEntradaVisiveis] = useState(false);
  const [inputEmFoco, setInputEmFoco] = useState(false);
  const [botaoDesativado, setBotaoDesativado] = useState(true);

  //#region Funções locais
  const alternarVisibilidadeCamposEntrada = () => {
    setCodigoDaSala('');
    setInputEmFoco(false);
    setCamposEntradaVisiveis((estado) => !estado);
  };

  const handleCriarSala = () => {
    const codigoAleatorio = Math.floor(10000 + Math.random() * 90000).toString();

    props.navigation.navigate('Online', {
      action: 'create',
      user: 'Jogador X',
      roomCode: codigoAleatorio
    });
  };

  const handleEntrarNaSala = () => {
    props.navigation.navigate('Online', {
      action: 'join',
      user: 'Jogador O',
      roomCode: codigoDaSala
    });

    alternarVisibilidadeCamposEntrada();
  };
  //#endregion

  useEffect(() => {
    (codigoDaSala.trim()) ? setBotaoDesativado(false) : setBotaoDesativado(true);
  }, [codigoDaSala]);

  return (
    <ScrollView
      contentContainerStyle={styles.containerScrollView}
      keyboardShouldPersistTaps='handled'
    >
      <View style={styles.container}>

        {(!camposEntradaVisiveis) ? (
          <>
            <Text style={[styles.textoDestacado, styles.margemInferiorMenor]}>
              O criador da sala será o Jogador X.
            </Text>

            <Text style={[styles.textoDestacado, styles.margemInferiorMenor]}>
              Quem entrar na sala será o Jogador O.
            </Text>

            <View style={styles.margemSuperior}>
              <View style={styles.estiloBotao}>
                <Button
                  title='Criar uma sala'
                  onPress={handleCriarSala}
                />
              </View>

              <View>
                <Button
                  title='Entrar em uma sala'
                  onPress={alternarVisibilidadeCamposEntrada}
                />
              </View>
            </View>
          </>
        ) : (
          <View>
            <View style={[styles.linha, styles.margemInferiorMenor]}>
              <Text style={styles.textoDestacado}>
                Qual é o código da sala?
              </Text>
            </View>

            <View style={[styles.linha, styles.margemInferiorMenor]}>
              <TextInput
                textAlign='center'
                keyboardType='number-pad'
                maxLength={5}
                value={codigoDaSala}
                onChangeText={setCodigoDaSala}
                style={[
                  styles.input,
                  (inputEmFoco) ? styles.inputEmFoco : styles.inputNormal
                ]}
                onFocus={() => setInputEmFoco(true)}
                onBlur={() => setInputEmFoco(false)}
              />
            </View>

            <View style={[styles.linha, styles.margemSuperior]}>
              <View style={styles.estiloBotaoContainer}>
                <Button
                  title='Cancelar'
                  onPress={alternarVisibilidadeCamposEntrada}
                  color='red'
                />
              </View>

              <View style={styles.estiloBotaoContainer}>
                <Button
                  title='Entrar'
                  onPress={handleEntrarNaSala}
                  disabled={botaoDesativado}
                />
              </View>
            </View>
          </View>
        )}

      </View>
    </ScrollView>
  );
}