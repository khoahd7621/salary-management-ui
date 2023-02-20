import { Button, DatePicker, Form, Input, message, Space, Typography } from 'antd';
import dayjs, { Dayjs } from 'dayjs';
import getConfig from 'next/config';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import { holidayApi } from '~/api-clients/modules/holiday-api';
import { Seo } from '~/components';
import { AppRoutes } from '~/models/constants/Routes';

const { serverRuntimeConfig } = getConfig();

export default function CreateHolidayPage() {
  const { RangePicker } = DatePicker;
  const router = useRouter();
  const { holidayId } = router.query;
  const [form] = Form.useForm();
  const [loading, setLoading] = useState<boolean>(true);
  const [sending, setSending] = useState<boolean>(false);

  useEffect(() => {
    if (holidayId) {
      fetchHoliday();
    }
  }, [holidayId]);

  const fetchHoliday = async () => {
    try {
      const holiday = await holidayApi.getById(holidayId as string);
      form.setFieldsValue({
        name: holiday.holidayName || '',
        applyDate: [dayjs(holiday.startDate), dayjs(holiday.endDate)],
      });
    } catch (error) {
      console.log(error);
      await router.push(`/${AppRoutes.holidays}`);
      message.error('Something went wrong! Please refresh the page and try again!');
    }
    setLoading(false);
  };

  const onFinish = async (data: { name: string; applyDate: Dayjs[] }) => {
    setSending(true);
    try {
      await holidayApi.create({
        name: data.name,
        startDate: data.applyDate[0].toISOString(),
        endDate: data.applyDate[1].toISOString(),
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
              <Form.Item label="Name" name="name" rules={[{ required: true, message: 'Please input holiday name!' }]}>
                <Input />
              </Form.Item>
              <Form.Item
                label="Apply date"
                name="applyDate"
                rules={[{ required: true, message: 'Please input apply date!' }]}
              >
                <RangePicker format={'DD/MM/YYYY'} />
              </Form.Item>

              <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                <Button disabled={sending} type="primary" htmlType="submit">
                  Update
                </Button>
                <Link style={{ marginLeft: '16px' }} href={`/${AppRoutes.holidays}`} passHref>
                  <Button type="primary" danger>
                    Cancel
                  </Button>
                </Link>
              </Form.Item>
            </Space>
          </Form>
        )}
      </Space>
    </>
  );
}
