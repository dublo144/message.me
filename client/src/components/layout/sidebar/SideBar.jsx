import React from 'react';
import { Layout, Menu } from 'antd';
import {
  CommentOutlined,
  MessageOutlined,
  NumberOutlined
} from '@ant-design/icons';
import { useQuery, useLazyQuery } from '@apollo/client';
import { queries } from '../../../helpers/graphqlQueries';
import {
  useChannelDispatch,
  useChannelState
} from '../../../contexts/ChannelContext';

const { Sider } = Layout;

const SideBar = () => {
  const dispatch = useChannelDispatch();
  const { channels } = useChannelState();

  const { loading: channelsLoading } = useQuery(queries.CHANNELS, {
    onCompleted: (data) =>
      dispatch({
        type: 'GET_CHANNELS_SUCCESS',
        payload: {
          channels: data.channels
        }
      }),
    onError: (error) =>
      dispatch({
        type: 'GET_CHANNELS_ERROR',
        payload: {
          error
        }
      })
  });

  const [channelDetails, { loading: channelLoading }] = useLazyQuery(
    queries.CHANNEL_DETAILS,
    {
      onCompleted: (data) =>
        dispatch({
          type: 'SELECT_CHANNEL_SUCCESS',
          payload: {
            selectedChannel: data.channelDetails
          }
        }),
      onError: (error) =>
        dispatch({
          type: 'SELECT_CHANNEL_ERROR',
          payload: {
            error
          }
        })
    }
  );

  React.useEffect(() => {
    dispatch({
      type: 'SET_LOADING',
      payload: { loading: channelLoading || channelsLoading }
    });
  }, [channelLoading, channelsLoading]);

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
          {channels.map((channel) => (
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
