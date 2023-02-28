import { Form, message, Space, Typography } from 'antd';
import getConfig from 'next/config';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { overtimeApi } from '~/api-clients/modules/overtime-api';

import { Seo } from '~/components';
import { OvertimeForm } from '~/components/modules/overtimes';
import { AppRoutes } from '~/models/constants/Routes';
import { Employee } from '~/models/modules/employees';
import { FormData } from '~/models/modules/overtimes';

const { serverRuntimeConfig } = getConfig();

export default function CreateLogOvertimePage() {
  const [form] = Form.useForm();
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const [employee, setEmployee] = useState<Employee | null>(null);

  const onFinish = async (data: FormData) => {
    setLoading(true);
    try {
      await overtimeApi.create({
        overtimeDate: data.date.toISOString(),
        hours: data.hours,
        employeeId: employee?.employeeId || '',
      });
      await router.push(`/${AppRoutes.overtimes}`);
      await message.success('Overtime logged successfully!', 3);
    } catch (error) {
      message.error('Something went wrong! Please refresh the page and try again!');
    }
    setLoading(false);
  };

  return (
    <>
      <Seo
        data={{
          title: 'Log overtimes | OT & Salary Management',
          description: 'Log overtimes page',
          url: `${serverRuntimeConfig.HOST_URL}/${AppRoutes.overtimes}/create`,
        }}
      />
      <Space style={{ width: '100%' }} direction="vertical" size="middle">
        <section style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Typography.Title level={3}>Log overtime</Typography.Title>
        </section>

        <section>
          <OvertimeForm
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
