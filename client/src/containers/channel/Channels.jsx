import React from 'react';
import { Layout, PageHeader } from 'antd';
import './channel.less';
import SideBar from '../../components/layout/sidebar/SideBar';
import AppHeader from '../../components/layout/header/AppHeader';
import ChannelView from './ChannelView';
import Editor from './Editor';
import { useChannelState } from '../../contexts/ChannelContext';

const Channels = () => {
  const { selectedChannel } = useChannelState();
  return (
    <Layout
      style={{
        minHeight: '100%'
      }}
    >
      <AppHeader />
      <Layout>
        <SideBar />
        <Layout
          style={{
            marginTop: 64,
            minHeight: '90vh',
            padding: '24px 0px',
            marginLeft: '15vw'
          }}
        >
          {selectedChannel && (
            <PageHeader
              title={`# ${selectedChannel.name}`}
              subTitle={selectedChannel.description}
              avatar={{ src: `${selectedChannel.avatar}` }}
            />
          )}
          <Layout.Content
            style={{
              borderRadius: 10,
              overflowY: 'auto',
              backgroundColor: 'white',
              maxHeight: '63vh',
              marginLeft: 24,
              padding: 24
            }}
          >
            <ChannelView />
          </Layout.Content>
          {selectedChannel && (
            <Layout.Footer
              style={{
                height: '20vh',
                position: 'fixed',
                bottom: 0,
                right: 0,
                width: '85%',
                padding: 24
              }}
            >
              <Editor />
            </Layout.Footer>
          )}
        </Layout>
      </Layout>
    </Layout>
  );
};

export default Channels;
