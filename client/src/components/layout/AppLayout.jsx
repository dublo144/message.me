import React from 'react';
import { Layout } from 'antd';
import SideBar from './sideBar/SideBar';
import AppContent from './content/AppContent';

const AppLayout = () => {
  return (
    <Layout>
      <Layout>
        <SideBar />
        <AppContent />
      </Layout>
    </Layout>
  );
};

export default AppLayout;
