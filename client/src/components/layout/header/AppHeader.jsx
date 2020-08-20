import React from 'react';
import { Layout, Menu, Space, Button, Tooltip, Dropdown } from 'antd';
import './AppHeader.less';
import {
  UserOutlined,
  BellOutlined,
  DownOutlined,
  DashboardOutlined,
  MessageOutlined
} from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { useAuthState, useAuthDispatch } from '../../../contexts/AuthContext';

const { Header } = Layout;

const AppHeader = () => {
  const { isLoggedIn, username } = useAuthState();
  const dispatch = useAuthDispatch();

  const dropdownMenu = (
    <Menu>
      <Menu.Item key='signOut' onClick={() => dispatch({ type: 'SIGN_OUT' })}>
        Sign out
      </Menu.Item>
    </Menu>
  );
  return (
    <Header className='header'>
      <div className='logo' />
      <Menu mode='horizontal' defaultSelectedKeys={['2']}>
        <Menu.Item key='dashboard' icon={<DashboardOutlined />}>
          <Link to='/dashboard'>Dashboard</Link>
        </Menu.Item>
        <Space style={{ float: 'right' }}>
          <Tooltip title='Profile'>
            <Link to={`/profile/${username}`}>
              <Button shape='circle' icon={<UserOutlined />} />
            </Link>
          </Tooltip>
          {username}
          <Tooltip title='Messages'>
            <Link to={'/messages'}>
              <Button shape='circle' icon={<MessageOutlined />} />
            </Link>
          </Tooltip>
          <Dropdown overlay={dropdownMenu}>
            <Button shape='circle' icon={<DownOutlined />} />
          </Dropdown>
        </Space>
      </Menu>
    </Header>
  );
};

export default AppHeader;
