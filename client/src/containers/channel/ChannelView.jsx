import React from 'react';
import moment from 'moment';
import {
  DislikeOutlined,
  LikeOutlined,
  DislikeFilled,
  LikeFilled,
  SendOutlined,
  MessageOutlined,
  UserAddOutlined
} from '@ant-design/icons';
import { Comment, Divider, List, PageHeader, Tooltip, Button } from 'antd';

import './channel.less';
import {
  useChannelState,
  useChannelDispatch
} from '../../contexts/ChannelContext';
import { queries } from '../../helpers/graphqlQueries';

const ChannelView = () => {
  const { selectedChannel, subscribeToMore, loading } = useChannelState();
  const dispatch = useChannelDispatch();

  React.useEffect(() => {
    subscribeToMore({
      document: queries.MESSAGE_SUBSCRIPTION,
      variables: { channelId: selectedChannel.id },
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) return prev;
        const newMessage = subscriptionData.data.message;
        dispatch({
          type: 'NEW_MESSAGE',
          payload: {
            newMessage
          }
        });
      }
    });
  }, []);

  return (
    <>
      <PageHeader
        title={`# ${selectedChannel.name}`}
        subTitle={selectedChannel.description}
        avatar={{ src: `${selectedChannel.avatar}` }}
        extra={[
          <Tooltip title={'Add user to channel'} key={'addUserBtn'}>
            <Button shape='circle-outline' icon={<UserAddOutlined />} />
          </Tooltip>
        ]}
      />
      <Divider />
      <List
        className='comment-list'
        itemLayout='horizontal'
        dataSource={selectedChannel.messages}
        renderItem={(item) => (
          <li>
            <Comment
              actions={item.actions}
              author={item.user.username}
              avatar={
                'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png'
              }
              content={item.content}
              datetime={moment(item.datetime).fromNow()}
            />
            <Divider />
          </li>
        )}
      />
    </>
  );
};

export default ChannelView;
