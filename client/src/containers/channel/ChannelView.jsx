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

const ChannelView = (props) => {
  const messages = [
    {
      author: 'Han Solo',
      avatar:
        'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
      content: 'This is a message',
      datetime: moment().fromNow()
    },
    {
      author: 'Luke Skywalker',
      avatar:
        'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
      content: 'This is also a message',
      datetime: moment().fromNow()
    },
    {
      author: 'Luke Skywalker',
      avatar:
        'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
      content: 'This is also a message',
      datetime: moment().fromNow()
    },
    {
      author: 'Luke Skywalker',
      avatar:
        'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
      content: 'This is also a message',
      datetime: moment().fromNow()
    },
    {
      author: 'Luke Skywalker',
      avatar:
        'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
      content: 'This is also a message',
      datetime: moment().fromNow()
    },
    {
      author: 'Luke Skywalker',
      avatar:
        'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
      content: 'This is also a message',
      datetime: moment().fromNow()
    }
  ];

  return (
    <>
      {props.selectedChannel ? (
        <List
          className='comment-list'
          itemLayout='horizontal'
          dataSource={messages}
          renderItem={(item) => (
            <li>
              <Comment
                actions={item.actions}
                author={item.author}
                avatar={item.avatar}
                content={item.content}
                datetime={item.datetime}
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
