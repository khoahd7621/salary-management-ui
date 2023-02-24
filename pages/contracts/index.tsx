import { Button, message, Space, Typography } from 'antd';
import getConfig from 'next/config';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { contractApi } from '~/api-clients/modules/contract-api';

import { Seo } from '~/components';
import { AppRoutes } from '~/models/constants/Routes';
import { NextPageWithLayout } from '~/models/layouts';
import { Contract } from '~/models/modules/contracts';

const { serverRuntimeConfig } = getConfig();

const ContractsListPage: NextPageWithLayout = () => {
  const { Title } = Typography;
  const [data, setData] = useState<Contract[]>();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await contractApi.getAllWithPagination();
      setData(response.results);
    } catch (error) {
      console.log(error);
      message.error('Something went wrong! Please refresh the page and try again!');
    }
    setLoading(false);
  };

  console.log(data);

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
