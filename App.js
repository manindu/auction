import React, { useEffect } from 'react';
import firestore from '@react-native-firebase/firestore';
import AppContainer from './src/navigation';
import { AuthProvider } from './src/context/auth/AuthContext';

const App = () => {
  const bootstrap = async () => {
    await firestore().settings({
      persistence: false,
    });
  };

  useEffect(() => {
    bootstrap();
  }, []);

  return (
    <AuthProvider>
      <AppContainer />
    </AuthProvider>
  );
};

export default App;
