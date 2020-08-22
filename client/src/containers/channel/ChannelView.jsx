import React from 'react';
import moment from 'moment';
import {
  DislikeOutlined,
  LikeOutlined,
  DislikeFilled,
  LikeFilled,
  SendOutlined,
  MessageOutlined
} from '@ant-design/icons';
import { Comment, Divider, List, Result } from 'antd';

import './channel.less';
import { useChannelState } from '../../contexts/ChannelContext';

const ChannelView = () => {
  const { selectedChannel, loading } = useChannelState();

  return (
    <>
      {selectedChannel ? (
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
      ) : (
        <Result
          icon={<MessageOutlined />}
          title='Select a channel to the left'
        />
      )}
    </>
  );
};

export default ChannelView;
