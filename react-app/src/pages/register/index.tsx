import React from 'react';
import { Form, Input, Button, Select, message } from 'antd';
import { useNavigate } from 'react-router-dom';
import styles from './style.module.less';
import { postUser } from './api';

const { Option } = Select;

const Register: React.FC = () => {
  const navigate = useNavigate();
  const onFinish = (values: any) => {
    postUser(values).then(() => {
      message.success('Registered successfully, Please log in！');
      navigate('/signIn');
    });
  };

  return (
    <div className={styles.register}>
      <Form
        name="basic"
        labelCol={{ span: 12 }}
        wrapperCol={{ span: 16 }}
        onFinish={onFinish}
        autoComplete="off"
      >
        <Form.Item label="Name" name="name" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item
          name="email"
          label="E-mail"
          rules={[
            {
              type: 'email',
              message: 'The input is not valid E-mail!',
            },
            {
              required: true,
              message: 'Please input your E-mail!',
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="password"
          label="Password"
          rules={[{ required: true }]}
          hasFeedback
        >
          <Input.Password />
        </Form.Item>
        <Form.Item
          name="confirm"
          label="Confirm Password"
          dependencies={['password']}
          hasFeedback
          rules={[
            {
              required: true,
              message: 'Please confirm your password!',
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error('The two passwords that you entered do not match!')
                );
              },
            }),
          ]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item
          name="identity"
          label="Identity"
          // rules={[{ required: true }]}
        >
          <Select>
            <Option value="root">root</Option>
            <Option value="admin">admin</Option>
            <Option value="user">user</Option>
          </Select>
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Register;
