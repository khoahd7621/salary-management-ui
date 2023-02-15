import { Button, Space, Table, Typography } from 'antd';
import type { ColumnsType, TablePaginationConfig } from 'antd/es/table';
import type { FilterValue, SorterResult, TableCurrentDataSource } from 'antd/es/table/interface';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { companyApi } from '~/api-clients/modules/company-api';

import { Seo } from '~/components';
import { TableParams } from '~/models/components/Table';
import { NextPageWithLayout } from '~/models/layouts';
import { Company } from '~/models/modules/companies';

type DataType = Company;

const columns: ColumnsType<DataType> = [
  {
    title: 'Id',
    dataIndex: 'companyId',
    sorter: (a, b) => a.companyId.length - b.companyId.length,
    width: '20%',
    ellipsis: true,
  },
  {
    title: 'Name',
    dataIndex: 'companyName',
    sorter: (a, b) => a.companyName.length - b.companyName.length,
    width: '20%',
    ellipsis: true,
  },
  {
    title: 'Number of contract',
    dataIndex: 'contracts',
    render: (_text, record) => record.contracts?.length || 0,
    sorter: (a, b) => (a.contracts?.length || 0) - (b.contracts?.length || 0),
    width: '20%',
  },
  {
    title: 'Action',
    dataIndex: 'action',
    render: (_text, _record) => (
      <>
        <Button type="primary">Edit</Button>
        <Button style={{ marginLeft: '16px' }} type="primary" danger>
          Delete
        </Button>
      </>
    ),
  },
];

const CompaniesListPage: NextPageWithLayout = () => {
  const [data, setData] = useState<DataType[]>();
  const [loading, setLoading] = useState(false);
  const [tableParams, setTableParams] = useState<TableParams>({
    pagination: {
      current: 1,
      pageSize: 10,
    },
  });

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await companyApi.getAll();
      setData(response);
    } catch (error) {
      console.log(error);
      toast.error('Something went wrong! Please refresh the page and try again!');
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleTableChange = (
    pagination: TablePaginationConfig,
    filters: Record<string, FilterValue | null>,
    sorter: SorterResult<DataType> | SorterResult<DataType>[],
    _extra: TableCurrentDataSource<DataType>
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
          url: `${process.env.HOST_URL}/companies`,
        }}
      />

      <Space style={{ width: '100%' }} direction="vertical" size="large">
        <section style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Typography.Title level={3}>List companies</Typography.Title>
          <Link href="/companies/create" passHref>
            <Button type="primary" ghost>
              Create new company
            </Button>
          </Link>
        </section>
        <section>
          <Table
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
