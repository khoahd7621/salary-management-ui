import { Button, Form, Input, Space } from 'antd';
import { FormInstance } from 'antd/lib/form/Form';
import Link from 'next/link';

import { Regex } from '~/models/constants/Regex';
import { AppRoutes } from '~/models/constants/Routes';

export interface CompanyFormProps {
  form: FormInstance<any> | undefined;
  isSending: boolean;
  onFinish: (_values: any) => void;
}

export function CompanyForm({ form, onFinish, isSending }: CompanyFormProps) {
  return (
    <Form
      form={form}
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      style={{ maxWidth: 600 }}
      onFinish={onFinish}
      autoComplete="off"
    >
      <Space style={{ width: '100%' }} direction="vertical">
        <Form.Item
          label="Company name"
          name="companyName"
          rules={[{ required: true, message: 'Please input company name!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Email"
          name="email"
          rules={[
            { required: true, message: 'Please input company email!' },
            {
              type: 'email',
              message: 'The input is not valid email!',
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Phone"
          name="phone"
          rules={[
            { required: true, message: 'Please input company phone!' },
            {
              pattern: new RegExp(Regex.VIETNAM_PHONE_NUMBER),
              message: 'Phone number is not valid',
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Address"
          name="address"
          rules={[{ required: true, message: 'Please input company address!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button disabled={isSending} type="primary" htmlType="submit">
            Create
          </Button>
          <Link style={{ marginLeft: '16px' }} href={`/${AppRoutes.companies}`} passHref>
            <Button type="primary" danger>
              Cancel
            </Button>
          </Link>
        </Form.Item>
      </Space>
    </Form>
  );
}
