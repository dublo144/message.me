import React from 'react';
import { Layout } from 'antd';

const { Content } = Layout;

const AppContent = ({ children }) => {
  return (
    <Layout>
      <Content
        className='site-layout-background'
        style={{
          padding: 24,
          marginTop: 64,
          minHeight: '95vh'
        }}
      >
        {children}
      </Content>
    </Layout>
  );
};

export default AppContent;
