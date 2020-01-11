import React from 'react';
import AppContainer from './src/navigation/config';
import { AuthProvider } from './src/context/auth/AuthContext';

const App = () => {
  return (
    <AuthProvider>
      <AppContainer />
    </AuthProvider>
  );
};

export default App;
