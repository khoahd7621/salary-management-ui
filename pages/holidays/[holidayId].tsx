import { Form, message, Space, Typography } from 'antd';
import dayjs, { Dayjs } from 'dayjs';
import getConfig from 'next/config';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import { holidayApi } from '~/api-clients/modules/holiday-api';
import { Seo } from '~/components';
import { HolidayForm } from '~/components/modules/holidays';
import { AppRoutes } from '~/models/constants/Routes';

const { serverRuntimeConfig } = getConfig();

export default function CreateHolidayPage() {
  const router = useRouter();
  const { holidayId } = router.query;
  const [form] = Form.useForm();
  const [loading, setLoading] = useState<boolean>(true);
  const [sending, setSending] = useState<boolean>(false);

  useEffect(() => {
    if (holidayId) {
      fetchHoliday();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [holidayId]);

  const fetchHoliday = async () => {
    try {
      const holiday = await holidayApi.getById(holidayId as string);
      form.setFieldsValue({
        name: holiday.holidayName || '',
        applyDate: [dayjs(holiday.startDate), dayjs(holiday.endDate)],
        isPaid: holiday.isPaid,
      });
    } catch (error) {
      console.log(error);
      await router.push(`/${AppRoutes.holidays}`);
      message.error('Something went wrong! Please refresh the page and try again!');
    }
    setLoading(false);
  };

  const onFinish = async (data: { name: string; applyDate: Dayjs[]; isPaid: boolean }) => {
    setSending(true);
    try {
      await holidayApi.update({
        id: holidayId as string,
        name: data.name,
        startDate: data.applyDate[0].toISOString(),
        endDate: data.applyDate[1].toISOString(),
        isPaid: data.isPaid,
      });
      await router.push(`/${AppRoutes.holidays}`);
      await message.success('Holiday updated successfully!', 3);
    } catch (error) {
      message.error('Something went wrong! Please refresh the page and try again!');
    }
    setSending(false);
  };

  return (
    <>
      <Seo
        data={{
          title: 'Update holiday | OT & Salary Management',
          description: 'Update holiday page',
          url: `${serverRuntimeConfig.HOST_URL}/${AppRoutes.holidays}/${holidayId}`,
        }}
      />
      <Space style={{ width: '100%' }} direction="vertical" size="middle">
        <section style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Typography.Title level={3}>Update holiday</Typography.Title>
        </section>
        {loading ? (
          <div>Loading...</div>
        ) : (
          <HolidayForm form={form} onFinish={onFinish} button="Update" isSending={sending} />
        )}
      </Space>
    </>
  );
}
