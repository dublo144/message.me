import React from 'react';
import { Layout, Menu } from 'antd';
import {
  CommentOutlined,
  MessageOutlined,
  NumberOutlined
} from '@ant-design/icons';
import { useQuery, useLazyQuery } from '@apollo/client';
import { queries } from '../../../helpers/graphqlQueries';

const { Sider } = Layout;

const SideBar = (props) => {
  const {
    loading: channelsLoading,
    error: channelsError,
    data: channelsData
  } = useQuery(queries.CHANNELS);

  const [
    channelDetails,
    { loading: channelLoading, error: channelError, data: channelData }
  ] = useLazyQuery(queries.CHANNEL_DETAILS, {
    onCompleted: props.setSelectedChannel
  });

  return (
    <Sider
      width={'15vw'}
      style={{
        height: '100vh',
        position: 'fixed',
        left: 0
      }}
    >
      <Menu
        mode={'inline'}
        theme={'light'}
        defaultOpenKeys={['channels', 'privateMessages']}
        style={{
          paddingLeft: 15,
          paddingTop: '15vh',
          height: '100%',
          borderRight: 0
        }}
      >
        <Menu.SubMenu
          key='channels'
          icon={<CommentOutlined />}
          title='My Channels'
        >
          {channelsData?.channels.map((channel) => (
            <Menu.Item
              key={channel.id}
              onClick={() =>
                channelDetails({ variables: { input: channel.id } })
              }
              icon={<NumberOutlined />}
            >
              {channel.name}
            </Menu.Item>
          ))}
        </Menu.SubMenu>

        <Menu.SubMenu
          key='privateMessages'
          icon={<MessageOutlined />}
          title='Private Messages'
        ></Menu.SubMenu>
      </Menu>
    </Sider>
  );
};

export default SideBar;
