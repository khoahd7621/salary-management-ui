import { Button, Input, message, Space, Table, Typography } from 'antd';
import { ColumnsType, TablePaginationConfig } from 'antd/lib/table';
import { FilterValue, SorterResult, TableCurrentDataSource } from 'antd/lib/table/interface';
import getConfig from 'next/config';
import Link from 'next/link';
import { useEffect, useState } from 'react';

import { payslipApi } from '~/api-clients/modules/payslip-api';
import { ButtonWithModal, Seo } from '~/components';
import { useDebounce } from '~/hooks';
import { TableParams } from '~/models/components/Table';
import { AppRoutes } from '~/models/constants/Routes';
import { NextPageWithLayout } from '~/models/layouts';
import { Payslip } from '~/models/modules/payslips';

const { serverRuntimeConfig } = getConfig();

const PayslipListPage: NextPageWithLayout = () => {
  const [data, setData] = useState<Payslip[]>([]);
  const [filteredData, setFilteredData] = useState<Payslip[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchValue, setSearchValue] = useState<string>('');
  const [tableParams, setTableParams] = useState<TableParams>({
    pagination: {
      current: 1,
      pageSize: 10,
    },
  });

  const debouncedValue = useDebounce(searchValue, 500);

  const columns: ColumnsType<Payslip> = [
    {
      title: 'Type',
      dataIndex: '',
      ellipsis: true,
    },
    {
      title: 'Employee',
      dataIndex: '',
    },
    {
      title: 'Company',
      dataIndex: '',
      ellipsis: true,
    },
    {
      title: 'Date',
      dataIndex: '',
      ellipsis: true,
    },
    {
      title: 'Total money',
      dataIndex: '',
      ellipsis: true,
    },
    {
      title: 'Action',
      dataIndex: 'action',
      width: '20%',
      render: (_text, _record) => {
        return (
          <Space>
            <Link href={`/${AppRoutes.payslips}/${'N/a'}`}>
              <Button type="primary" style={{ background: '#3a9c6f' }}>
                View
              </Button>
            </Link>
            <Link href={`/${AppRoutes.payslips}/${'N/a'}`}>
              <Button type="primary">Edit</Button>
            </Link>
            <ButtonWithModal
              modalTitle="Warning"
              modalContent={`Are you sure to delete payslip type "${'N/A'}" between employee "${'N/A'}" and company "${'N/A'}"`}
              onOk={() => {}}
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

  useEffect(() => {
    setFilteredData(filterData());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedValue]);

  const fetchData = async () => {
    setLoading(true);
    try {
      // Todo: call api to get data
      const _response = payslipApi.getAll();
      setData([]);
      setFilteredData([]);
    } catch (error) {
      console.log(error);
      message.error('Something went wrong! Please refresh the page and try again!');
    }
    setLoading(false);
  };

  const filterData = () => {
    return data.filter((item) => item);
  };

  const handleTableChange = (
    pagination: TablePaginationConfig,
    filters: Record<string, FilterValue | null>,
    sorter: SorterResult<Payslip> | SorterResult<Payslip>[],
    _extra: TableCurrentDataSource<Payslip>
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
          title: 'Payslips | OT & Salary Management',
          description: 'List payslips page',
          url: `${serverRuntimeConfig.HOST_URL}/${AppRoutes.payslips}`,
        }}
      />

      <Space style={{ width: '100%' }} direction="vertical" size="large">
        <section style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Typography.Title level={3}>List payslips</Typography.Title>
          <Input
            placeholder="Input search text"
            allowClear
            onChange={(event) => setSearchValue(event.target.value)}
            style={{ width: 200 }}
          />
          <Link href={`/${AppRoutes.salaries}`} passHref>
            <Button type="primary" ghost>
              Create new payslip
            </Button>
          </Link>
        </section>

        <section>
          <Table
            scroll={{ x: 800 }}
            columns={columns}
            rowKey={(record) => record.payHistoryId}
            dataSource={filteredData}
            pagination={tableParams.pagination}
            loading={loading}
            onChange={handleTableChange}
          />
        </section>
      </Space>
    </>
  );
};

export default PayslipListPage;
