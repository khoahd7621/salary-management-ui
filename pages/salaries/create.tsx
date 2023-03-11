import { message, Space, Typography } from 'antd';
import dayjs from 'dayjs';
import getConfig from 'next/config';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { payslipApi } from '~/api-clients/modules/payslip-api';

import { salaryApi } from '~/api-clients/modules/salary-api';
import { PayrollTmp, Seo } from '~/components';
import { AppRoutes } from '~/models/constants/Routes';
import { Payload } from '~/models/modules/payslips';
import { Salary } from '~/models/modules/salaries';

const { serverRuntimeConfig } = getConfig();

export default function CalculateSalaryPages() {
  const route = useRouter();
  const { employeeId, salaryType, date } = route.query;

  const [data, setData] = useState<Salary | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [sending, setSending] = useState<boolean>(false);

  useEffect(() => {
    if (employeeId && salaryType && date) {
      fetchData();
    } else {
      route.push(`/${AppRoutes.salaries}`);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [employeeId, salaryType, date]);

  const fetchData = async () => {
    try {
      const response = await salaryApi.calculateSalary({
        employeeId: employeeId as string,
        type: salaryType as string,
        date: date as string,
      });
      setData(response);
      setLoading(false);
    } catch (error: any) {
      await route.push(`/${AppRoutes.salaries}`);
      await message.error("Opps, employee don't have contact or something went wrong!", 3);
    }
  };

  const handleClickSavePayslip = async (salary: Salary, note: string) => {
    setSending(true);
    try {
      const payload: Payload = {
        ...salary,
        employeeId: employeeId as string,
        contractId: salary.contract.contractId,
        paidDate: dayjs().endOf('day').toISOString(),
        note: note,
        paidType: salaryType as string,
      };
      await payslipApi.create(payload);
      await route.push(`/${AppRoutes.payslips}`);
      await message.success('Save payslip successfully');
    } catch (error) {
      await message.error('Oops! Something went wrong. Please try again later');
    }
    setSending(false);
  };

  const handleClickCancel = async () => {
    await route.push(`/${AppRoutes.salaries}`);
  };

  return (
    <>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <>
          <Seo
            data={{
              title: 'Temporary payslip | OT & Salary Management',
              description: 'Temporary payslip page',
              url: `${serverRuntimeConfig.HOST_URL}/${AppRoutes.salaries}/create`,
            }}
          />

          <Space style={{ width: '100%' }} direction="vertical" size="large">
            <Typography.Title level={3}>Temporary payslip</Typography.Title>

            <PayrollTmp
              data={data as Salary}
              type={salaryType as string}
              button="Save"
              isSending={sending}
              handleClickSave={handleClickSavePayslip}
              handleClickCancel={handleClickCancel}
            />
          </Space>
        </>
      )}
    </>
  );
}
