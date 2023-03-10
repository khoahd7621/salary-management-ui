import { Form, message, Space, Typography } from 'antd';
import getConfig from 'next/config';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Seo } from '~/components';

import { companyApi } from '~/api-clients/modules/company-api';
import { CompanyForm } from '~/components/modules/companies';
import { AppRoutes } from '~/models/constants/Routes';
import { FormData } from '~/models/modules/companies';

const { serverRuntimeConfig } = getConfig();

export default function EditCompany() {
  const router = useRouter();
  const { companyId } = router.query;

  const [form] = Form.useForm();

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
      form.setFieldsValue({
        companyName: response.companyName,
        email: response.email,
        phone: response.phone,
        address: response.address,
      });
    } catch (error) {
      console.log(error);
      router.push(`/${AppRoutes.companies}`);
    }
    setLoading(false);
  };

  const onFinish = async (data: FormData) => {
    setSending(true);
    try {
      await companyApi.update(companyId as string, data);
      await router.push(`/${AppRoutes.companies}`);
      await message.success({
        content: 'Edit company successfully!',
        duration: 5,
      });
    } catch (error) {
      console.log(error);
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
          url: `${serverRuntimeConfig.HOST_URL}/${AppRoutes.companies}`,
        }}
      />

      <Space style={{ width: '100%' }} direction="vertical" size="large">
        <section style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Typography.Title level={3}>Edit company</Typography.Title>
        </section>

        {loading ? <div>Loading ....</div> : <CompanyForm form={form} onFinish={onFinish} isSending={sending} />}
      </Space>
    </>
  );
}
