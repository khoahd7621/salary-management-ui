import { Button, DatePicker, Form, Input, message, Select, Space, Typography } from 'antd';
import { Dayjs } from 'dayjs';
import getConfig from 'next/config';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';

import { holidayApi } from '~/api-clients/modules/holiday-api';
import { Seo } from '~/components';
import { AppRoutes } from '~/models/constants/Routes';

const { serverRuntimeConfig } = getConfig();

export default function CreateHolidayPage() {
  const { RangePicker } = DatePicker;
  const [form] = Form.useForm();
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);

  const onFinish = async (data: { name: string; applyDate: Dayjs[]; isPaid: boolean }) => {
    setLoading(true);
    try {
      await holidayApi.create({
        name: data.name,
        startDate: data.applyDate[0].toISOString(),
        endDate: data.applyDate[1].toISOString(),
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
            <Form.Item
              label="Paid"
              name="isPaid"
              rules={[{ required: true, message: 'Please select pay or unpay in this holiday!' }]}
            >
              <Select
                showSearch
                allowClear
                onClear={() => form.setFieldsValue({ isPaid: '' })}
                onChange={(value) => form.setFieldsValue({ isPaid: value })}
                filterOption={(input, option) => (option?.label ?? '').toLowerCase().includes(input.toLowerCase())}
                options={[
                  {
                    value: false,
                    label: 'No',
                  },
                  {
                    value: true,
                    label: 'Yes',
                  },
                ]}
              />
            </Form.Item>

            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
              <Button disabled={loading} type="primary" htmlType="submit">
                Create
              </Button>
              <Link style={{ marginLeft: '16px' }} href={`/${AppRoutes.holidays}`} passHref>
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
