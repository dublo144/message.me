import React from 'react';
import { Form, Input, Avatar, Comment } from 'antd';

const Editor = (props) => {
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
            placeholder={`message ${props.channelName}...`}
            autoSize={{ minRows: 4, maxRows: 8 }}
          />
        </Form.Item>
      }
    />
  );
};

export default Editor;
