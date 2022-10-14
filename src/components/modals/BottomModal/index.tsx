import React, { useEffect, useRef, useState } from 'react';
import { View, Text } from 'react-native'; 
import { Button, HStack, TextInput } from "@react-native-material/core";
import { Modalize } from 'react-native-modalize';
import { useBottomModal } from '../../../hooks/useBottomModal';
import { getItemOfAsyncStorage, setItemOnAsyncStorage } from '../../../helpers/asyncStorage';
import { styles } from './styles';

const BottomModal = () => {
  const { visible, setVisible } = useBottomModal();
  const [username, setUsername] = useState("")

  const retrieveUsername = async (): Promise<void> => {
    const username = await getItemOfAsyncStorage("username")
    setUsername(username)
  }
  
  useEffect(() => {
    retrieveUsername()
  }, [])
  
  useEffect(() => {
    if (visible) {
      openModal();
    }
  }, [visible])

  const modalizeRef = useRef<Modalize>(null);

  const openModal = () => {
    modalizeRef.current?.open();
  };

  const closeModal = () => {
    setVisible(false)
    modalizeRef.current?.close();
  };

  const handleSave = () => {
    setItemOnAsyncStorage("username", username)
    closeModal()
  }

  return (
    <Modalize 
      ref={modalizeRef} 
      adjustToContentHeight
      handlePosition="inside"
    >
      <View style={styles.bottomNavigationView}>
        <View style={{ justifyContent: 'space-between' }}>
          <Text
            style={styles.modalTitle}>
            Alterar usuário selecionado
          </Text>
        </View>
        <View style={styles.containerInput}>
          <TextInput label="Nome do usuário" value={username} onChangeText={setUsername} style={{ width: "100%" }} />
        </View>
        <HStack mr={16} ml={16} spacing={6} style={{ display: "flex", paddingBottom: 32 }}>
          <Button
            variant="text"
            color='#1976D2'
            title="Cancelar"
            onPress={closeModal}
            style={styles.button}
            titleStyle={{ fontWeight: "500" }}
          />
          <Button
            color='#1976D2'
            title="Salvar"
            onPress={handleSave}
            style={styles.button}
            titleStyle={{ fontWeight: "500" }}
          />
        </HStack>
      </View>
    </Modalize>
  );
};

export default BottomModal;