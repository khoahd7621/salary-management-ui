import { Button, Form, Input, Space, Typography } from 'antd';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { toast } from 'react-toastify';
import getConfig from 'next/config';

import { companyApi } from '~/api-clients/modules/company-api';
import { Seo } from '~/components';

const { serverRuntimeConfig } = getConfig();

export interface CompanyFrom {
  companyName: string;
}

export default function CreateCompanyPage() {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);

  const onFinish = async ({ companyName }: CompanyFrom) => {
    setLoading(true);
    try {
      await companyApi.create(companyName);
      router.push('/companies');
    } catch (error) {
      toast.error('Something went wrong! Please refresh the page and try again!');
    }
    setLoading(false);
  };

  return (
    <>
      <Seo
        data={{
          title: 'Create Company | OT & Salary Management',
          description: 'Create company page',
          url: `${serverRuntimeConfig.HOST_URL}/companies/create`,
        }}
      />
      <Space style={{ width: '100%' }} direction="vertical" size="middle">
        <section style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Typography.Title level={3}>Create new company</Typography.Title>
        </section>

        <Form
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          style={{ maxWidth: 600 }}
          initialValues={{ remember: true }}
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

            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
              <Button disabled={loading} type="primary" htmlType="submit">
                Create
              </Button>
              <Link style={{ marginLeft: '16px' }} href="/companies" passHref>
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
