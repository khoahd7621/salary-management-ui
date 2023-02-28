import { Button, Space, Typography } from 'antd';
import getConfig from 'next/config';
import Link from 'next/link';

import { Seo } from '~/components';
import { AppRoutes } from '~/models/constants/Routes';
import { NextPageWithLayout } from '~/models/layouts';

const { serverRuntimeConfig } = getConfig();

const LogOvertimesListPage: NextPageWithLayout = () => {
  return (
    <>
      <Seo
        data={{
          title: 'Log Overtimes | OT & Salary Management',
          description: 'List log overtimes page',
          url: `${serverRuntimeConfig.HOST_URL}/overtimes`,
        }}
      />

      <Space style={{ width: '100%' }} direction="vertical" size="large">
        <section style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Typography.Title level={3}>List overtime logs</Typography.Title>
          <Link href={`/${AppRoutes.overtimes}/create`} passHref>
            <Button type="primary" ghost>
              Log new overtime
            </Button>
          </Link>
        </section>
        <section></section>
      </Space>
    </>
  );
};

export default LogOvertimesListPage;
