import React from 'react';
import { Form, Input, Button } from 'antd';
import './SignUp.less';

const SignUpForm = () => {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    console.log('Received values of form: ', values);
  };

  return (
    <Form
      form={form}
      name='signup_form'
      className='signup-form'
      scrollToFirstError
    >
      <Form.Item
        name='firstname'
        rules={[{ required: true, message: 'Please input your first name!' }]}
      >
        <Input placeholder='First Name' />
      </Form.Item>
      <Form.Item
        name='lastName'
        rules={[{ required: true, message: 'Please input your first name!' }]}
      >
        <Input placeholder='Last Name' />
      </Form.Item>

      <Form.Item
        name='email'
        rules={[
          {
            type: 'email',
            message: 'The input is not valid E-mail!'
          },
          {
            required: true,
            message: 'Please input your E-mail!'
          }
        ]}
      >
        <Input placeholder='E-mail' />
      </Form.Item>

      <Form.Item
        name='password'
        rules={[
          {
            required: true,
            message: 'Please input your password!'
          }
        ]}
        hasFeedback
      >
        <Input.Password placeholder='Password' />
      </Form.Item>

      <Form.Item
        name='confirm'
        dependencies={['password']}
        hasFeedback
        rules={[
          {
            required: true,
            message: 'Please confirm your password!'
          },
          ({ getFieldValue }) => ({
            validator(rule, value) {
              if (!value || getFieldValue('password') === value) {
                return Promise.resolve();
              }
              return Promise.reject(
                'The two passwords that you entered do not match!'
              );
            }
          })
        ]}
      >
        <Input.Password placeholder='Confirm Password' />
      </Form.Item>

      <Form.Item>
        <Button
          type='primary'
          shape='round'
          htmlType='submit'
          className='signup-form-button'
        >
          Register
        </Button>
      </Form.Item>
    </Form>
  );
};

export default SignUpForm;
