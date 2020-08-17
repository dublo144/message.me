import React from 'react';
import Routes from './config/Routes';
import { AuthProvider } from './contexts/AuthContext';
import AppHeader from './components/layout/header/AppHeader';

const App = () => {
  return (
    <AuthProvider>
      <AppHeader />
      <Routes />
    </AuthProvider>
  );
};

export default App;
