import { Button, Form, Input, message, Space, Typography } from 'antd';
import getConfig from 'next/config';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Seo } from '~/components';

import { companyApi } from '~/api-clients/modules/company-api';
import { Company } from '~/models/modules/companies';
import { CompanyForm } from './create';

const { serverRuntimeConfig } = getConfig();

export default function EditCompany() {
  const router = useRouter();
  const { companyId } = router.query;
  const [company, setCompany] = useState<Company>({
    companyId: '',
    companyName: '',
    address: '',
    contracts: [],
  });
  const [loading, setLoading] = useState<boolean>(true);
  const [sending, setSending] = useState<boolean>(false);

  useEffect(() => {
    if (companyId) {
      fetchCompany(companyId as string);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [companyId]);

  const fetchCompany = async (companyId: string) => {
    try {
      const response = await companyApi.getById(companyId);
      setCompany(response);
    } catch (error) {
      router.push('/companies');
    }
    setLoading(false);
  };

  const onFinish = async ({ companyName, address }: CompanyForm) => {
    setSending(true);
    try {
      await companyApi.update(companyId as string, companyName, address);
      await router.push('/companies');
      await message.success({
        content: 'Edit company successfully!',
        duration: 5,
      });
    } catch (error) {
      message.error({
        content: 'Something went wrong! Please refresh the page and try again!',
        duration: 5,
      });
    }
    setSending(false);
  };

  return (
    <>
      <Seo
        data={{
          title: 'Edit company | OT & Salary Management',
          description: 'Edit company page',
          url: `${serverRuntimeConfig.HOST_URL}/companies`,
        }}
      />

      <Space style={{ width: '100%' }} direction="vertical" size="large">
        <section style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Typography.Title level={3}>Edit company</Typography.Title>
        </section>
        {loading ? (
          <div>Loading ....</div>
        ) : (
          <section>
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
                  initialValue={company.companyName}
                  rules={[{ required: true, message: 'Please input company name!' }]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  label="Address"
                  name="address"
                  initialValue={company.address}
                  rules={[{ required: true, message: 'Please input company address!' }]}
                >
                  <Input />
                </Form.Item>

                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                  <Button disabled={sending} type="primary" htmlType="submit">
                    Edit
                  </Button>
                  <Link style={{ marginLeft: '16px' }} href="/companies" passHref>
                    <Button type="primary" danger>
                      Cancel
                    </Button>
                  </Link>
                </Form.Item>
              </Space>
            </Form>
          </section>
        )}
      </Space>
    </>
  );
}
