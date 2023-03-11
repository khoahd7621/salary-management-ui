import { Button, message, Space, Table, Typography } from 'antd';
import type { ColumnsType, TablePaginationConfig } from 'antd/es/table';
import type { FilterValue, SorterResult, TableCurrentDataSource } from 'antd/es/table/interface';
import getConfig from 'next/config';
import Link from 'next/link';
import { useEffect, useState } from 'react';

import { companyApi } from '~/api-clients/modules/company-api';
import { ButtonWithModal, Seo } from '~/components';
import { TableParams } from '~/models/components/Table';
import { AppRoutes } from '~/models/constants/Routes';
import { NextPageWithLayout } from '~/models/layouts';
import { Company } from '~/models/modules/companies';

const { serverRuntimeConfig } = getConfig();

const CompaniesListPage: NextPageWithLayout = () => {
  const [data, setData] = useState<Company[]>();
  const [loading, setLoading] = useState(false);
  const [tableParams, setTableParams] = useState<TableParams>({
    pagination: {
      current: 1,
      pageSize: 10,
    },
  });

  const columns: ColumnsType<Company> = [
    {
      title: 'Name',
      dataIndex: 'companyName',
      sorter: (a, b) => (a.companyName?.length || 0) - (b.companyName?.length || 0),
      width: '20%',
      ellipsis: true,
    },
    {
      title: 'Address',
      dataIndex: 'address',
      render: (_text, record) => record.address || 'N/A',
      sorter: (a, b) => (a.address?.length || 0) - (b.address?.length || 0),
      width: '20%',
      ellipsis: true,
    },
    {
      title: 'Email',
      dataIndex: 'email',
      render: (_text, record) => record.email || 'N/A',
      sorter: (a, b) => (a.email?.length || 0) - (b.email?.length || 0),
      width: '20%',
    },
    {
      title: 'Phone',
      dataIndex: 'phone',
      render: (_text, record) => record.phone || 'N/A',
      sorter: (a, b) => (a.phone?.length || 0) - (b.phone?.length || 0),
      width: '20%',
    },
    {
      title: 'Action',
      dataIndex: 'action',
      render: (_text, record) => {
        return (
          <Space>
            <Link href={`/${AppRoutes.companies}/${record.companyId}`}>
              <Button type="primary">Edit</Button>
            </Link>
            <ButtonWithModal
              modalTitle="Warning"
              modalContent={`Are you sure to delete company "${record.companyName}"`}
              onOk={() => {
                companyApi
                  .delete(record.companyId)
                  .then(() => {
                    message.success('Delete company successfully!');
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
      const response = await companyApi.getAll();
      setData(response);
    } catch (error) {
      console.log(error);
      message.error('Something went wrong! Please refresh the page and try again!');
    }
    setLoading(false);
  };

  const handleTableChange = (
    pagination: TablePaginationConfig,
    filters: Record<string, FilterValue | null>,
    sorter: SorterResult<Company> | SorterResult<Company>[],
    _extra: TableCurrentDataSource<Company>
  ) => {
    setTableParams({
      pagination,
      filters,
      ...sorter,
    });

    if (pagination.pageSize !== tableParams.pagination?.pageSize) {
      setData([]);
    }
  };

  return (
    <>
      <Seo
        data={{
          title: 'Companies | OT & Salary Management',
          description: 'List companies page',
          url: `${serverRuntimeConfig.HOST_URL}/${AppRoutes.companies}`,
        }}
      />

      <Space style={{ width: '100%' }} direction="vertical" size="large">
        <section style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Typography.Title level={3}>List companies</Typography.Title>
          <Link href={`/${AppRoutes.companies}/create`} passHref>
            <Button type="primary" ghost>
              Create new company
            </Button>
          </Link>
        </section>
        <section>
          <Table
            scroll={{ x: 800 }}
            columns={columns}
            rowKey={(record) => record.companyId}
            dataSource={data}
            pagination={tableParams.pagination}
            loading={loading}
            onChange={handleTableChange}
          />
        </section>
      </Space>
    </>
  );
};

export default CompaniesListPage;
