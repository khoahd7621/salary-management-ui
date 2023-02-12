import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Form, Input, Space, Typography } from 'antd';
import { useRouter } from 'next/router';
import { useState } from 'react';

import { SubLayout } from '~/components/layouts';
import { NextPageWithLayout } from '~/models/components/layouts';
import { LoginPayload } from '~/modules/login/models/loginPayload';
import { login } from '~/modules/login/services/authService';

const LoginPage: NextPageWithLayout = () => {
  const router = useRouter();
  const [isSending, setIsSending] = useState(false);

  const handleLogin = async (values: LoginPayload) => {
    setIsSending(true);
    try {
      await login(values);
      router.push('/dashboard');
    } catch (error) {
      console.log(error);
    }
    setIsSending(false);
  };

  return (
    <div>
      <div className="max-w-md mt-8 mx-auto p-4 bg-white border rounded-md border-solid border-gray-400">
        <Typography.Title level={3} className="text-center !mb-8">
          Login
        </Typography.Title>
        <Form
          initialValues={{
            remember: true,
          }}
          onFinish={handleLogin}
        >
          <Space className="w-full" direction="vertical" size="small">
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
  );
};

LoginPage.Layout = SubLayout;

export default LoginPage;
