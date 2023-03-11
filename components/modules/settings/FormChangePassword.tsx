import { Button, Form, Input, message } from 'antd';
import { useState } from 'react';

import { profileApi } from '~/api-clients/modules/profile-api';

type FormData = {
  oldPassword: string;
  newPassword: string;
  confirm: string;
};

export function FormChangePassword() {
  const [form] = Form.useForm();

  const [isSending, setIsSending] = useState(false);

  const handleChangePassword = async (values: FormData) => {
    setIsSending(true);
    try {
      await profileApi.changePassword({
        oldPassword: values.oldPassword,
        newPassword: values.newPassword,
      });
      message.success('Change password successfully!', 3);
    } catch (error: any) {
      console.log(error);
      if (error?.response.status === 400) message.error(error?.response.data);
      else message.error('Change password failed! Please try again later.', 3);
    }
    form.resetFields();
    setIsSending(false);
  };

  return (
    <Form
      form={form}
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      style={{ maxWidth: 600 }}
      onFinish={handleChangePassword}
      disabled={isSending}
      autoComplete="off"
    >
      <Form.Item
        label="Old password"
        name="oldPassword"
        rules={[{ required: true, message: 'Please input your password!' }]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        name="newPassword"
        label="New password"
        rules={[
          {
            required: true,
            message: 'Please input your password!',
          },
          {
            min: 6,
            message: 'Password must be at least 6 characters',
          },
        ]}
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
              if (!value || getFieldValue('newPassword') === value) {
                return Promise.resolve();
              }
              return Promise.reject(new Error('Confirm password not match new password!'));
            },
          }),
        ]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button disabled={isSending} type="primary" htmlType="submit">
          Change password
        </Button>
      </Form.Item>
    </Form>
  );
}
