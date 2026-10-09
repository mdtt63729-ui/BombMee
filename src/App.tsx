import React, { useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { RootNavigator } from './navigation/RootNavigator';
import { useSettingsStore } from './state/useSettingsStore';
import { colors } from './theme/colors';
export default function App() {
  const hydrate = useSettingsStore(s => s.hydrate);
  useEffect(() => { void hydrate(); }, [hydrate]);
  return <SafeAreaProvider><StatusBar style="light" backgroundColor={colors.bg}/><RootNavigator/></SafeAreaProvider>;
}
