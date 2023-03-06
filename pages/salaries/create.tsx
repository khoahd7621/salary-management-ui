import { message, Space, Typography } from 'antd';
import getConfig from 'next/config';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import { salaryApi } from '~/api-clients/modules/salary-api';
import { Seo } from '~/components';
import Payroll from '~/components/Payroll';
import { AppRoutes } from '~/models/constants/Routes';
import { Salary } from '~/models/modules/salaries';

const { serverRuntimeConfig } = getConfig();

export default function CalculateSalaryPages() {
  const route = useRouter();
  const { employeeId, salaryType, date } = route.query;

  const [data, setData] = useState<Salary | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

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

            <Payroll data={data as Salary} type={salaryType as string} employeeId={employeeId as string} />
          </Space>
        </>
      )}
    </>
  );
}
