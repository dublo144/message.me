import React from 'react';
import { Form, Input, Avatar, Comment } from 'antd';
import { useChannelState } from '../../contexts/ChannelContext';

const Editor = () => {
  const {
    selectedChannel: { name }
  } = useChannelState();

  return (
    <Comment
      avatar={
        <Avatar
          src='https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png'
          alt='Han Solo'
        />
      }
      content={
        <Form.Item>
          <Input.TextArea
            placeholder={`message ${name}...`}
            autoSize={{ minRows: 4, maxRows: 8 }}
          />
        </Form.Item>
      }
    />
  );
};

export default Editor;
