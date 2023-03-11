import { Space, Typography } from 'antd';
import getConfig from 'next/config';

import { Seo } from '~/components';
import { CalculateForm } from '~/components/modules/salaries';
import { AppRoutes } from '~/models/constants/Routes';
import { NextPageWithLayout } from '~/models/layouts';

const { serverRuntimeConfig } = getConfig();

const SalariesPage: NextPageWithLayout = () => {
  return (
    <>
      <Seo
        data={{
          title: 'Calculate salary | OT & Salary Management',
          description: 'Calculate salary page',
          url: `${serverRuntimeConfig.HOST_URL}/${AppRoutes.salaries}`,
        }}
      />

      <Space style={{ width: '100%' }} direction="vertical" size="large">
        <Typography.Title level={3}>Calculate salary</Typography.Title>

        <CalculateForm />
      </Space>
    </>
  );
};

export default SalariesPage;
