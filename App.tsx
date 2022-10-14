// import { StatusBar } from 'expo-status-bar';
// import { StyleSheet, Text, View } from 'react-native';
import { Routes } from './src/routes';

import { BottomModalProvider } from './src/context/BottomModal/BottomModalProvider';
import BottomModal from './src/components/modals/BottomModal';

export default function App() {
  return (
    <BottomModalProvider>
      <Routes/>
      <BottomModal/>
    </BottomModalProvider> 
  );
}
