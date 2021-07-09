import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { NavigationContainer } from '@react-navigation/native';
import { AuthStackScreen, HomeStackScreen, InfoStackScreen } from './src/navigation';

import {PersonalDetailsProvider} from './src/context/PersonalDetailsContext';
import {AuthProvider} from './src/context/AuthContext';
import { useAuth } from './src/context/AuthContext';

const AppEntry = () => {
  const { isLogin, isCompleteLogin } = useAuth();
  return (
    <NavigationContainer>
      {isCompleteLogin ? <HomeStackScreen /> : isLogin ? <InfoStackScreen /> : <AuthStackScreen />}
    </NavigationContainer>
  );
};

export default function App() {

  return (
    <SafeAreaProvider>
      <AuthProvider>
        <PersonalDetailsProvider>
        <AppEntry />
        </PersonalDetailsProvider>
      </AuthProvider>
    </SafeAreaProvider>
  );
}
