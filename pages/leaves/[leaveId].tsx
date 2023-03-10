import { Form, message, Space, Typography } from 'antd';
import dayjs from 'dayjs';
import getConfig from 'next/config';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import { leaveApi } from '~/api-clients/modules/leave-api-v2';
import { Seo } from '~/components';
import { LeaveForm } from '~/components/modules/leaves';
import { AppRoutes } from '~/models/constants/Routes';
import { Employee } from '~/models/modules/employees';
import { FormData } from '~/models/modules/leaves/v2';

const { serverRuntimeConfig } = getConfig();

export default function EditLogLeavePage() {
  const router = useRouter();
  const { leaveId } = router.query;
  const [form] = Form.useForm();
  const [employee, setEmployee] = useState<Employee | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [sending, setSending] = useState<boolean>(false);

  useEffect(() => {
    if (leaveId) {
      fetchLeave();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [leaveId]);

  const fetchLeave = async () => {
    try {
      const leave = await leaveApi.getById(leaveId as string);
      form.setFieldsValue({
        leaveDate: dayjs(leave.date),
        leaveHours: leave.hours,
        reason: leave.reason,
        employeeId: leave.employee.employeeId,
      });
      setEmployee({
        ...leave.employee,
        employeeId: leave.employee.employeeId,
      });
    } catch (error) {
      console.log(error);
      await router.push(`/${AppRoutes.leaves}`);
      message.error('Something went wrong! Please refresh the page and try again!');
    }
    setLoading(false);
  };

  const onFinish = async (data: FormData) => {
    setSending(true);
    try {
      await leaveApi.update(leaveId as string, {
        leaveDate: data.leaveDate.endOf('day').toISOString(),
        leaveHours: data.leaveHours,
        reason: data.reason,
        employeeId: employee?.employeeId || '',
      });
      await router.push(`/${AppRoutes.leaves}`);
      await message.success('Log leave updated successfully!', 3);
    } catch (error) {
      message.error('Something went wrong! Please refresh the page and try again!');
    }
    setSending(false);
  };

  return (
    <>
      <Seo
        data={{
          title: 'Update log leave | OT & Salary Management',
          description: 'Update log leave page',
          url: `${serverRuntimeConfig.HOST_URL}/${AppRoutes.leaves}/${leaveId}`,
        }}
      />
      <Space style={{ width: '100%' }} direction="vertical" size="middle">
        <section style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Typography.Title level={3}>Update log leave</Typography.Title>
        </section>
        {loading ? (
          <div>Loading...</div>
        ) : (
          <LeaveForm
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
