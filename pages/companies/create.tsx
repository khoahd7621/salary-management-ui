import { Form, message, Space, Typography } from 'antd';
import getConfig from 'next/config';
import { useRouter } from 'next/router';
import { useState } from 'react';

import { companyApi } from '~/api-clients/modules/company-api';
import { Seo } from '~/components';
import { CompanyForm } from '~/components/modules/companies';
import { AppRoutes } from '~/models/constants/Routes';
import { FormData } from '~/models/modules/companies';

const { serverRuntimeConfig } = getConfig();

export default function CreateCompanyPage() {
  const [form] = Form.useForm<FormData>();

  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);

  const onFinish = async (data: FormData) => {
    setLoading(true);
    try {
      await companyApi.create(data);
      message.success('Company created successfully!');
      router.push(`/${AppRoutes.companies}`);
    } catch (error: any) {
      if (error.response.status === 400) {
        message.error(error.response.data);
      } else message.error('Something went wrong! Please refresh the page and try again!');
    }
    setLoading(false);
  };

  return (
    <>
      <Seo
        data={{
          title: 'Create Company | OT & Salary Management',
          description: 'Create company page',
          url: `${serverRuntimeConfig.HOST_URL}/${AppRoutes.companies}/create`,
        }}
      />
      <Space style={{ width: '100%' }} direction="vertical" size="middle">
        <section style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Typography.Title level={3}>Create new company</Typography.Title>
        </section>

        <CompanyForm form={form} onFinish={onFinish} isSending={loading} />
      </Space>
    </>
  );
}
