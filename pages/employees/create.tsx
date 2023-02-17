import { Button, DatePicker, Form, Input, message, Space, Typography } from 'antd';
import getConfig from 'next/config';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';

import { employeeApi } from '~/api-clients/modules/employee-api';
import { Seo } from '~/components';
import UploadImage from '~/components/UploadImage';
import { CreateForm } from '~/models/modules/employees';

const { serverRuntimeConfig } = getConfig();

export default function CreateEmployeePage() {
  const router = useRouter();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState<boolean>(false);
  const [imageUrl, setImageUrl] = useState<string>('');

  const onFinish = async (data: CreateForm) => {
    setLoading(true);
    try {
      await employeeApi.create({ ...data, dateOfBirth: data.dateOfBirth.toISOString() });
      message.success('Create employee successfully!');
      router.push('/employees');
    } catch (error) {
      console.log(error);
      message.error('Something went wrong! Please refresh the page and try again!');
    }
    setLoading(false);
  };

  const handleSetImageUrl = (url: string) => {
    setImageUrl(url);
    form.setFieldsValue({ image: url });
  };

  return (
    <>
      <Seo
        data={{
          title: 'Create Employee | OT & Salary Management',
          description: 'Create employee page',
          url: `${serverRuntimeConfig.HOST_URL}/employees/create`,
        }}
      />
      <Space style={{ width: '100%' }} direction="vertical" size="middle">
        <section style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Typography.Title level={3}>Create new employee</Typography.Title>
        </section>

        <Form
          form={form}
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          style={{ maxWidth: 600 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          autoComplete="off"
        >
          <Space style={{ width: '100%' }} direction="vertical">
            <Form.Item
              label="Name"
              name="employeeName"
              rules={[{ required: true, message: 'Please input employee name!' }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Date of birth"
              name="dateOfBirth"
              rules={[{ required: true, message: 'Please input date of birth' }]}
            >
              <DatePicker format={['DD/MM/YYYY']} />
            </Form.Item>
            <Form.Item label="Image" name="image" rules={[{ required: true, message: 'Please add an image' }]}>
              <UploadImage imageUrl={imageUrl} setImageUrl={handleSetImageUrl} />
            </Form.Item>
            <Form.Item
              label="Address"
              name="address"
              rules={[
                { required: true, message: 'Please input an address' },
                { max: 255, message: 'Address is maximum 255 characters' },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Identity number"
              name="identityNumber"
              rules={[
                { required: true, message: 'Please input identity number' },
                {
                  pattern: new RegExp(/\b\d{9}(?:\d{3})?\b/),
                  message: 'Identity number is not valid',
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Phone"
              name="phoneNumber"
              rules={[
                { required: true, message: 'Please input employee phone number' },
                {
                  pattern: new RegExp(/(03|05|07|08|09|01[2|6|8|9])+(\d{8})\b/),
                  message: 'Phone number is not valid',
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
              <Button disabled={loading} type="primary" htmlType="submit">
                Create
              </Button>
              <Link style={{ marginLeft: '16px' }} href="/employees" passHref>
                <Button type="primary" danger>
                  Cancel
                </Button>
              </Link>
            </Form.Item>
          </Space>
        </Form>
      </Space>
    </>
  );
}
