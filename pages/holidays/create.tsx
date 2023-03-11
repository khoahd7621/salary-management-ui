import { Form, message, Space, Typography } from 'antd';
import { Dayjs } from 'dayjs';
import getConfig from 'next/config';
import { useRouter } from 'next/router';
import { useState } from 'react';

import { holidayApi } from '~/api-clients/modules/holiday-api';
import { Seo } from '~/components';
import { HolidayForm } from '~/components/modules/holidays';
import { AppRoutes } from '~/models/constants/Routes';

const { serverRuntimeConfig } = getConfig();

export default function CreateHolidayPage() {
  const [form] = Form.useForm();
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);

  const onFinish = async (data: { name: string; applyDate: Dayjs[]; isPaid: boolean }) => {
    setLoading(true);
    try {
      await holidayApi.create({
        name: data.name,
        startDate: data.applyDate[0].endOf('day').toISOString(),
        endDate: data.applyDate[1].endOf('day').toISOString(),
        isPaid: data.isPaid,
      });
      await router.push(`/${AppRoutes.holidays}`);
      await message.success('Holiday created successfully!', 3);
    } catch (error) {
      message.error('Something went wrong! Please refresh the page and try again!');
    }
    setLoading(false);
  };

  return (
    <>
      <Seo
        data={{
          title: 'Create holiday | OT & Salary Management',
          description: 'Create holiday page',
          url: `${serverRuntimeConfig.HOST_URL}/${AppRoutes.holidays}/create`,
        }}
      />
      <Space style={{ width: '100%' }} direction="vertical" size="middle">
        <section style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Typography.Title level={3}>Create new holiday</Typography.Title>
        </section>

        <section>
          <HolidayForm form={form} onFinish={onFinish} button="Create" isSending={loading} />
        </section>
      </Space>
    </>
  );
}
