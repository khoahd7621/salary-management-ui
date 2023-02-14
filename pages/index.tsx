import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Form, Input, Space, Typography } from 'antd';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { toast } from 'react-toastify';

import { postLogin } from '~/api-clients/modules/auth-apis';
import { Seo } from '~/components';
import { SubLayout } from '~/layouts';
import { NextPageWithLayout } from '~/models/layouts';
import { Payload, User } from '~/models/modules/login';
import { useAppDispatch } from '~/redux/hooks';
import { login as dispatchActionLogin } from '~/redux/slices/authSlice';

const LoginPage: NextPageWithLayout = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [isSending, setIsSending] = useState(false);

  const handleLogin = async (values: Payload) => {
    setIsSending(true);
    try {
      const response: User = await postLogin(values);
      dispatch(dispatchActionLogin(response));
      router.push('/dashboard');
      toast.success('Login successfully');
    } catch (error: any) {
      console.log(error);
      toast.error(error.message || 'Login failed');
    }
    setIsSending(false);
  };

  return (
    <div>
      <Seo
        data={{
          title: 'Login',
          description: 'Login page',
          url: `${process.env.HOST_URL}`,
        }}
      />

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
                  min: 3,
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
