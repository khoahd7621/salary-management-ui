import { Space, Typography } from 'antd';
import getConfig from 'next/config';
import { useRouter } from 'next/router';

import { Seo } from '~/components';
import { Payslip } from '~/components/modules/payslips';
import { AppRoutes } from '~/models/constants/Routes';

const { serverRuntimeConfig } = getConfig();

export interface ViewPayslipPageProps {}

export default function ViewPayslipPage(_props: ViewPayslipPageProps) {
  const router = useRouter();
  const { payslipId } = router.query;

  return (
    <>
      <Seo
        data={{
          title: 'Payslip | OT & Salary Management',
          description: 'Payslip page',
          url: `${serverRuntimeConfig.HOST_URL}/${AppRoutes.payslips}/${payslipId}/view`,
        }}
      />
      <Space style={{ width: '100%' }} direction="vertical" size="middle">
        <section style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Typography.Title level={3}>Payslip</Typography.Title>
        </section>

        <section>
          <Payslip />
        </section>
      </Space>
    </>
  );
}
