import { Button, message, Space, Table, Typography } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import dayjs from 'dayjs';
import getConfig from 'next/config';
import Link from 'next/link';
import { useEffect, useState } from 'react';

import { holidayApi } from '~/api-clients/modules/holiday-api';
import { ButtonWithModal, Seo } from '~/components';
import { TableParams } from '~/models/components/Table';
import { AppRoutes } from '~/models/constants/Routes';
import { NextPageWithLayout } from '~/models/layouts';
import { Holiday } from '~/models/modules/holidays';

const { serverRuntimeConfig } = getConfig();

const HolidaysListPage: NextPageWithLayout = () => {
  const [data, setData] = useState<Holiday[]>();
  const [loading, setLoading] = useState(false);
  const [tableParams, _setTableParams] = useState<TableParams>({
    pagination: {
      current: 1,
      pageSize: 10,
    },
  });

  const columns: ColumnsType<Holiday> = [
    {
      title: 'Name',
      dataIndex: 'name',
      sorter: (a, b) => (a.name?.length || 0) - (b.name?.length || 0),
      width: '20%',
      ellipsis: true,
    },
    {
      title: 'Start date',
      dataIndex: 'startDate',
      render: (_text, record) => dayjs(record.startDate).format('DD/MM/YYYY'),
      sorter: (a, b) => dayjs(a.startDate).diff(b.startDate),
      width: '20%',
    },
    {
      title: 'End date',
      dataIndex: 'endDate',
      render: (_text, record) => dayjs(record.endDate).format('DD/MM/YYYY'),
      sorter: (a, b) => dayjs(a.endDate).diff(b.endDate),
      width: '20%',
    },
    {
      title: 'Action',
      dataIndex: 'action',
      width: '20%',
      render: (_text, record) => {
        return (
          <Space>
            <Link href={`/${AppRoutes.holidays}/${record.holidayId}`}>
              <Button type="primary">Edit</Button>
            </Link>
            <ButtonWithModal
              modalTitle="Warning"
              modalContent={`Are you sure to delete holiday "${record.name}"`}
              onOk={() => {
                holidayApi
                  .delete(record.holidayId)
                  .then(() => {
                    message.success(`Delete holiday "${record.name}" successfully!`);
                    fetchData();
                  })
                  .catch(() => {
                    message.error('Something went wrong! Please refresh page and try again!');
                  });
              }}
            >
              Delete
            </ButtonWithModal>
          </Space>
        );
      },
    },
  ];

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await holidayApi.getAll();
      setData(response);
    } catch (error) {
      console.log(error);
      message.error('Something went wrong! Please refresh the page and try again!');
    }
    setLoading(false);
  };

  return (
    <>
      <Seo
        data={{
          title: 'Holidays | OT & Salary Management',
          description: 'List holidays page',
          url: `${serverRuntimeConfig.HOST_URL}/${AppRoutes.holidays}`,
        }}
      />

      <Space style={{ width: '100%' }} direction="vertical" size="large">
        <section style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Typography.Title level={3}>List holidays</Typography.Title>
          <Link href={`/${AppRoutes.holidays}/create`} passHref>
            <Button type="primary" ghost>
              Create new holiday
            </Button>
          </Link>
        </section>
        <section>
          <Table
            scroll={{ x: 800 }}
            columns={columns}
            rowKey={(record) => record.holidayId}
            dataSource={data}
            pagination={tableParams.pagination}
            loading={loading}
          />
        </section>
      </Space>
    </>
  );
};

export default HolidaysListPage;
