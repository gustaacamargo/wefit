import * as React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { useBottomModal } from '../../hooks/useBottomModal';

function Settings() {
  const { setVisible } = useBottomModal();

  return (
    <TouchableOpacity onPress={() => setVisible(true)} style={{ justifyContent: 'center', alignItems: 'center', marginRight: 16 }}>
      <FontAwesome name="gear" size={24} color="rgba(0, 0, 0, 0.87)" />
    </TouchableOpacity>
  );
}

export { Settings }