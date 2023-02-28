import { Form, message, Space, Typography } from 'antd';
import getConfig from 'next/config';
import { useRouter } from 'next/router';
import { useState } from 'react';

import { leaveApi } from '~/api-clients/modules/leave-api';
import { Seo } from '~/components';
import { LeaveForm } from '~/components/modules/leaves';
import { AppRoutes } from '~/models/constants/Routes';
import { Employee } from '~/models/modules/employees';
import { FormData } from '~/models/modules/leaves';

const { serverRuntimeConfig } = getConfig();

export default function CreateLogLeavePage() {
  const [form] = Form.useForm();
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const [employee, setEmployee] = useState<Employee | null>(null);

  const onFinish = async (data: FormData) => {
    setLoading(true);
    try {
      await leaveApi.create({
        startDate: data.applyDate[0].toISOString(),
        endDate: data.applyDate[1].toISOString(),
        reason: data.reason,
        employeeId: employee?.employeeId || '',
      });
      await router.push(`/${AppRoutes.leaves}`);
      await message.success('Leave logged successfully!', 3);
    } catch (error) {
      message.error('Something went wrong! Please refresh the page and try again!');
    }
    setLoading(false);
  };

  return (
    <>
      <Seo
        data={{
          title: 'Log leaves | OT & Salary Management',
          description: 'Log leaves page',
          url: `${serverRuntimeConfig.HOST_URL}/${AppRoutes.leaves}/create`,
        }}
      />
      <Space style={{ width: '100%' }} direction="vertical" size="middle">
        <section style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Typography.Title level={3}>Log leave</Typography.Title>
        </section>

        <section>
          <LeaveForm
            form={form}
            onFinish={onFinish}
            button="Create"
            isSending={loading}
            employee={employee}
            setEmployee={setEmployee}
          />
        </section>
      </Space>
    </>
  );
}
