import { message, Space, Typography } from 'antd';
import dayjs from 'dayjs';
import getConfig from 'next/config';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import { payslipApi } from '~/api-clients/modules/payslip-api';
import { PayrollTmp, Seo } from '~/components';
import { AppRoutes } from '~/models/constants/Routes';
import { Payload, Payslip as PayslipModel } from '~/models/modules/payslips';
import { Salary } from '~/models/modules/salaries';

const { serverRuntimeConfig } = getConfig();

export default function EditPayslipPage() {
  const router = useRouter();
  const { payslipId } = router.query;

  const [loading, setLoading] = useState<boolean>(true);
  const [payslip, setPayslip] = useState<PayslipModel | null>(null);
  const [sending, setSending] = useState<boolean>(false);

  useEffect(() => {
    if (payslipId) {
      fetchData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [payslipId]);

  const fetchData = async () => {
    try {
      const response = await payslipApi.getById(payslipId as string);
      setPayslip(response);
    } catch (error) {
      await router.push(`/${AppRoutes.payslips}`);
      await message.error('Opps, something went wrong!', 3);
    }
    setLoading(false);
  };

  const handleClickUpdatePayslip = async (salary: Salary, note: string) => {
    setSending(true);
    try {
      const payload: Payload = {
        ...salary,
        employeeId: payslip?.contract.employee.employeeId || '',
        contractId: payslip?.contract.contractId || '',
        paidDate: dayjs(payslip?.paidDate || '')
          .endOf('day')
          .toISOString(),
        note: note,
        paidType: payslip?.paidType || '',
      };
      await payslipApi.update(payslipId as string, payload);
      await router.push(`/${AppRoutes.payslips}`);
      await message.success('Update payslip successfully');
    } catch (error) {
      await message.error('Oops! Something went wrong. Please try again later');
    }
    setSending(false);
  };

  const handleClickCancel = async () => {
    await router.push(`/${AppRoutes.payslips}`);
  };

  return (
    <>
      <Seo
        data={{
          title: 'Edit Payslip | OT & Salary Management',
          description: 'Edit Payslip page',
          url: `${serverRuntimeConfig.HOST_URL}/${AppRoutes.payslips}/${payslipId}/edit`,
        }}
      />

      {loading ? (
        <div>Loading ...</div>
      ) : (
        <Space style={{ width: '100%' }} direction="vertical" size="middle">
          <section style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Typography.Title level={3}>Edit Payslip</Typography.Title>
          </section>

          <section>
            <PayrollTmp
              data={payslip as PayslipModel}
              button="Update"
              paidDate={payslip?.paidDate || ''}
              type={payslip?.paidType || ''}
              isSending={sending}
              handleClickCancel={handleClickCancel}
              handleClickSave={handleClickUpdatePayslip}
            />
          </section>
        </Space>
      )}
    </>
  );
}
