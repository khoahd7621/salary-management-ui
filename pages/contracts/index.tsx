import { Button, Space, Typography } from 'antd';
import getConfig from 'next/config';
import Link from 'next/link';

import { Seo } from '~/components';
import { AppRoutes } from '~/models/constants/Routes';
import { NextPageWithLayout } from '~/models/layouts';

const { serverRuntimeConfig } = getConfig();

const ContractsListPage: NextPageWithLayout = () => {
  const { Title } = Typography;
  return (
    <>
      <Seo
        data={{
          title: 'Contracts | OT & Salary Management',
          description: 'List contracts page',
          url: `${serverRuntimeConfig.HOST_URL}/contracts`,
        }}
      />

      <Space style={{ width: '100%' }} direction="vertical" size="large">
        <section style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Title level={3}>List contracts</Title>
          <Link href={`/${AppRoutes.contracts}/create`} passHref>
            <Button type="primary" ghost>
              Create new contract
            </Button>
          </Link>
        </section>
        <section></section>
      </Space>
    </>
  );
};

export default ContractsListPage;
