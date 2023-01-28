import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { Text, View } from 'react-native';
import AuthProvider from './contexts/AuthContext';
import Navigation from './navigation/Navigation';

export default function App() {
  return (
    <NavigationContainer>
      <AuthProvider>
        <Navigation/>
      </AuthProvider>
    </NavigationContainer>
  );
}

