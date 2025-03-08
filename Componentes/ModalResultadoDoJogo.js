import { useState, useEffect } from 'react';
import { View, Modal } from 'react-native';
import { Card, Text, Icon } from '@rneui/themed';

import styles from '../css/styles';

export default function ModalResultadoDoJogo(props) {
  const [modalExibido, setModalExibido] = useState(false);

  useEffect(() => {
    if (props.modalVisivel && !modalExibido) {
      const timeout = setTimeout(() => {
        props.setModalVisivel(false);
        setModalExibido(true);
      }, 2000);

      return () => {
        clearTimeout(timeout);
        setModalExibido(false);
        props.setTextoDaModal('');
      }
    }
  }, [props.modalVisivel]);

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={props.modalVisivel}
      onRequestClose={() => null}
    >
      <View style={styles.overlayDaModal}>
        <Card>
          <View style={styles.flexColumnContainer}>
            {(props.textoDaModal === 'Draw') && (
              <>
                <Icon name='exclamationcircleo' type='antdesign' xxxlarge warning />
                <Text bold xlarge warning>{props.textoDaModal}</Text>
              </>
            )}

            {(props.textoDaModal === 'You win') && (
              <>
                <Icon name='checkcircleo' type='antdesign' xxxlarge success />
                <Text bold xlarge success>{props.textoDaModal}</Text>
              </>
            )}

            {(props.textoDaModal === 'You lose') && (
              <>
                <Icon name='closecircleo' type='antdesign' xxxlarge danger />
                <Text bold xlarge danger>{props.textoDaModal}</Text>
              </>
            )}
          </View>
        </Card>
      </View>
    </Modal>
  );
}