import React from 'react';
import Routes from './config/Routes';
import { AuthProvider, useAuthState } from './contexts/AuthContext';
import AppHeader from './components/layout/header/AppHeader';
import AppContent from './components/layout/content/AppContent';
import { Layout } from 'antd';

const App = () => {
  const { isLoggedIn } = useAuthState();
  return (
    <Layout>
      {isLoggedIn && <AppHeader />}
      <Layout style={{ padding: '0 200px' }}>
        <AppContent>
          <Routes />
        </AppContent>
      </Layout>
    </Layout>
  );
};

export default App;
