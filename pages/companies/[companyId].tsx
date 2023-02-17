import { Button, Form, Input, Space, Typography } from 'antd';
import getConfig from 'next/config';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
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
    contracts: [],
  });
  const [loading, setLoading] = useState<boolean>(true);
  const [sending, setSending] = useState<boolean>(false);

  useEffect(() => {
    if (companyId) {
      fetchCompany(companyId as string);
    }
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

  const onFinish = async ({ companyName }: CompanyForm) => {
    setSending(true);
    try {
      await companyApi.update(companyId as string, companyName);
      router.push('/companies');
    } catch (error) {
      toast.error('Something went wrong! Please refresh the page and try again!');
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
