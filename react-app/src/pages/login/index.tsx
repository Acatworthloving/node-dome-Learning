import React from 'react';
import { Button, Form, Input, message } from 'antd';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { setUserInfo } from '@src/utils/token';
import { postLogin } from './api';
import styles from './style.module.less';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const onFinish = (values: any) => {
    postLogin(values).then((result: any) => {
      setUserInfo(result.data);
      message.success('login successfully ！');
      navigate('/fundList');
    });
  };

  return (
    <div className={styles.signIn}>
      <Form
        name="normal_login"
        className="login-form"
        initialValues={{ remember: true }}
        onFinish={onFinish}
      >
        <Form.Item
          name="email"
          rules={[{ required: true, message: 'Please input your email!' }]}
        >
          <Input prefix={<UserOutlined className="site-form-item-icon" />} />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
          />
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
          >
            Log in
          </Button>
        </Form.Item>
        <Form.Item>
          <a href="javacript:;" onClick={() => navigate('/register')}>
            register now!
          </a>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Login;
