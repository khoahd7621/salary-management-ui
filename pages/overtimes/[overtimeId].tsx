import { Form, message, Space, Typography } from 'antd';
import dayjs from 'dayjs';
import getConfig from 'next/config';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import { overtimeApi } from '~/api-clients/modules/overtime-api';
import { Seo } from '~/components';
import { OvertimeForm } from '~/components/modules/overtimes';
import { AppRoutes } from '~/models/constants/Routes';
import { Employee } from '~/models/modules/employees';
import { FormData } from '~/models/modules/overtimes';

const { serverRuntimeConfig } = getConfig();

export default function EditLogOvertimePage() {
  const router = useRouter();
  const { overtimeId } = router.query;
  const [form] = Form.useForm();
  const [employee, setEmployee] = useState<Employee | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [sending, setSending] = useState<boolean>(false);

  useEffect(() => {
    if (overtimeId) {
      fetchOvertime();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [overtimeId]);

  const fetchOvertime = async () => {
    try {
      const overtime = await overtimeApi.getById(overtimeId as string);
      form.setFieldsValue({
        hours: overtime.hours,
        date: dayjs(overtime.overtimeDay),
        employeeId: overtime.employeeId,
      });
      setEmployee({
        ...overtime.employee,
        employeeId: overtime.employeeId,
      });
    } catch (error) {
      console.log(error);
      await router.push(`/${AppRoutes.overtimes}`);
      message.error('Something went wrong! Please refresh the page and try again!');
    }
    setLoading(false);
  };

  const onFinish = async (data: FormData) => {
    setSending(true);
    try {
      await overtimeApi.update({
        id: overtimeId as string,
        overtimeDate: data.date.toISOString(),
        hours: data.hours,
        employeeId: employee?.employeeId || '',
      });
      await router.push(`/${AppRoutes.overtimes}`);
      await message.success('Log overtime updated successfully!', 3);
    } catch (error) {
      message.error('Something went wrong! Please refresh the page and try again!');
    }
    setSending(false);
  };

  return (
    <>
      <Seo
        data={{
          title: 'Update log overtime | OT & Salary Management',
          description: 'Update log overtime page',
          url: `${serverRuntimeConfig.HOST_URL}/${AppRoutes.overtimes}/${overtimeId}`,
        }}
      />
      <Space style={{ width: '100%' }} direction="vertical" size="middle">
        <section style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Typography.Title level={3}>Update log overtime</Typography.Title>
        </section>
        {loading ? (
          <div>Loading...</div>
        ) : (
          <OvertimeForm
            form={form}
            onFinish={onFinish}
            button="Update"
            isSending={sending}
            employee={employee}
            setEmployee={setEmployee}
          />
        )}
      </Space>
    </>
  );
}
