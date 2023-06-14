import { NavigationContainer } from '@react-navigation/native';
import { StripeProvider } from '@stripe/stripe-react-native';
import AuthProvider from './contexts/AuthContext';
import Navigation from './navigation/Navigation';

export default function App() {
  return (
    <NavigationContainer>
      <StripeProvider publishableKey='pk_test_51NHP70CPMf2RXRk01rTArdfCe8NU0nj8n47K2K24yGyTN6gRGkIS3i88yn0xE6GBax30b3YuNHbUCDSrCPPT7Z1A00Zk9C9LvV'>
        <AuthProvider>
          <Navigation/>
        </AuthProvider>
      </StripeProvider>
    </NavigationContainer>
  );
}

