import React from 'react';
import { Layout, Menu, Button, Space } from 'antd';
import './AppHeader.less';
import { NavLink } from 'react-router-dom';
import SignUpModal from '../../auth/signUpModal/SignUpModal';

const { Header } = Layout;

const AppHeader = () => {
  return (
    <Header className='header'>
      <div className='logo' />
      <Menu mode='horizontal' defaultSelectedKeys={['2']}>
        <Menu.Item key='1'>Home</Menu.Item>
        <Menu.Item key='2'>About us</Menu.Item>
        <Menu.Item key='3'>nav 3</Menu.Item>
        <Space style={{ float: 'right' }}>
          <SignUpModal />
          <Button shape={'round'}>Login</Button>
        </Space>
      </Menu>
    </Header>
  );
};

export default AppHeader;
