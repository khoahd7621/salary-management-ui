import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Alert, Button, Form, Input, Space, Typography } from 'antd';
import { useState } from 'react';
import getConfig from 'next/config';

import { Seo } from '~/components';
import { ProtectedLogin } from '~/components/ProtectedLogin';
import { useAuth } from '~/hooks';
import { SubLayout } from '~/layouts';
import { NextPageWithLayout } from '~/models/layouts';
import { Payload } from '~/models/modules/login';
import { User } from '~/models/modules/User';
import { useAppDispatch } from '~/redux/hooks';
import { login as dispatchActionLogin } from '~/redux/slices/authSlice';

const { publicRuntimeConfig } = getConfig();

const LoginPage: NextPageWithLayout = () => {
  const dispatch = useAppDispatch();
  const [isSending, setIsSending] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>('');

  const { login } = useAuth();

  const handleLogin = async (values: Payload) => {
    setErrorMessage('');
    setIsSending(true);
    try {
      const response: User = await login(values);
      dispatch(dispatchActionLogin(response));
    } catch (error: any) {
      console.log(error);
      setErrorMessage('Invalid username or password' || error.message);
    }
    setIsSending(false);
  };

  return (
    <ProtectedLogin>
      <div>
        <Seo
          data={{
            title: 'Login',
            description: 'Login page',
            url: `${publicRuntimeConfig.HOST_URL}`,
          }}
        />

        <div
          style={{
            maxWidth: '28rem',
            margin: '0 auto',
            marginTop: '32px',
            padding: '16px',
            backgroundColor: '#fff',
            border: '1px solid #d9d9d9',
            borderRadius: '6px',
          }}
        >
          <Typography.Title level={3} style={{ textAlign: 'center', marginBottom: '32px' }}>
            Login
          </Typography.Title>
          {errorMessage && (
            <Alert style={{ marginBottom: '16px' }} message="Error" description={errorMessage} type="error" closable />
          )}
          <Form
            initialValues={{
              remember: true,
            }}
            onFinish={handleLogin}
          >
            <Space style={{ width: '100%' }} direction="vertical" size="small">
              <Form.Item
                name="username"
                rules={[
                  {
                    required: true,
                    message: 'Please input your Username!',
                  },
                ]}
              >
                <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
              </Form.Item>
              <Form.Item
                name="password"
                rules={[
                  {
                    required: true,
                    message: 'Please input your Password!',
                  },
                  {
                    min: 6,
                    message: 'Password must be at least 6 characters',
                  },
                ]}
              >
                <Input.Password prefix={<LockOutlined className="site-form-item-icon" />} placeholder="Password" />
              </Form.Item>
              <Form.Item>
                <Button disabled={isSending} type="primary" htmlType="submit" className="w-full">
                  Log in
                </Button>
              </Form.Item>
            </Space>
          </Form>
        </div>
      </div>
    </ProtectedLogin>
  );
};

LoginPage.Layout = SubLayout;

export default LoginPage;
