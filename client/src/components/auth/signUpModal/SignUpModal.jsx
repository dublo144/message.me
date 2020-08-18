import React from 'react';
import Modal from 'antd/lib/modal/Modal';
import { Button } from 'antd';
import SignUpForm from './SignUpForm';
import './SignUp.less';

const SignUpModal = () => {
  const [visible, setVisible] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  return (
    <>
      <Button type='primary' shape={'round'} onClick={() => setVisible(true)}>
        Join Message.me
      </Button>
      <Modal
        className={'signup-modal'}
        visible={visible}
        footer={null}
        onCancel={() => setVisible(false)}
      >
        <SignUpForm setVisible={setVisible} />
      </Modal>
    </>
  );
};

export default SignUpModal;
