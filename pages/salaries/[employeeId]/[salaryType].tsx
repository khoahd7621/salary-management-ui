import { message } from 'antd';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import { salaryApi } from '~/api-clients/modules/salary-api';
import Payroll from '~/components/Payroll';
import { AppRoutes } from '~/models/constants/Routes';
import { Salary } from '~/models/modules/salaries';

export default function CalculateSalaryPage() {
  const route = useRouter();
  const { employeeId, salaryType } = route.query;

  const [data, setData] = useState<Salary | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (employeeId && salaryType) {
      fetchData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [employeeId, salaryType]);

  const fetchData = async () => {
    try {
      const response = await salaryApi.calculateSalary(employeeId as string, salaryType as string);
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
          <Payroll data={data as Salary} />
        </>
      )}
    </>
  );
}
