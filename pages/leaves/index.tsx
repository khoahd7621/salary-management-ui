import { Button, Input, message, Space, Table, TablePaginationConfig, Typography } from 'antd';
import { ColumnsType } from 'antd/lib/table';
import { FilterValue, SorterResult, TableCurrentDataSource } from 'antd/lib/table/interface';
import dayjs from 'dayjs';
import getConfig from 'next/config';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { leaveApi } from '~/api-clients/modules/leave-api';

import { ButtonWithModal, Seo } from '~/components';
import { useDebounce } from '~/hooks';
import { TableParams } from '~/models/components/Table';
import { AppRoutes } from '~/models/constants/Routes';
import { NextPageWithLayout } from '~/models/layouts';
import { Leave } from '~/models/modules/leaves';

const { serverRuntimeConfig } = getConfig();

const LogLeavesListPage: NextPageWithLayout = () => {
  const [data, setData] = useState<Leave[]>([]);
  const [filteredData, setFilteredData] = useState<Leave[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchValue, setSearchValue] = useState<string>('');
  const [tableParams, setTableParams] = useState<TableParams>({
    pagination: {
      current: 1,
      pageSize: 10,
    },
  });

  const debouncedValue = useDebounce(searchValue, 500);

  const columns: ColumnsType<Leave> = [
    {
      title: 'Employee',
      dataIndex: 'employee',
      filters: data?.map((_item) => {
        // Todo: Map employee name to filter
        return {
          text: '',
          value: '',
        };
      }),
      // specify the condition of filtering result
      // here is that finding the name started with `value`
      onFilter: (value: string | number | boolean, record) =>
        (record.employee?.name.indexOf(value as string) || 0) === 0,
      render: (_text, record) => record.employee?.name || 'N/A',
      sorter: (a, b) => (a.employee?.name?.length || 0) - (b.employee?.name?.length || 0),
      width: '20%',
      ellipsis: true,
    },
    {
      title: 'Start date',
      dataIndex: 'startDate',
      render: (_text, record) => dayjs(record.startDate).format('DD/MM/YYYY'),
      sorter: (a, b) => dayjs(a.startDate).diff(b.startDate),
      width: '15%',
      ellipsis: true,
    },
    {
      title: 'End date',
      dataIndex: 'endDate',
      render: (_text, record) => dayjs(record.endDate).format('DD/MM/YYYY'),
      sorter: (a, b) => dayjs(a.endDate).diff(b.endDate),
      width: '15%',
      ellipsis: true,
    },
    {
      title: 'Reason',
      dataIndex: 'reason',
      width: '20%',
    },
    {
      title: 'Action',
      dataIndex: 'action',
      width: '20%',
      render: (_text, record) => {
        return (
          <Space>
            <Link href={`/${AppRoutes.leaves}/${record.leaveTimeId}`}>
              <Button type="primary">Edit</Button>
            </Link>
            <ButtonWithModal
              modalTitle="Warning"
              modalContent={`Are you sure to delete log leave of employee "${
                record.employee?.name || 'N/A'
              }" from date "${dayjs(record.startDate).format('DD/MM/YYYY')}" to date "${dayjs(record.endDate).format(
                'DD/MM/YYYY'
              )}" with reason "${record.reason}"?`}
              onOk={() => {
                leaveApi
                  .delete(record.leaveTimeId)
                  .then(() => {
                    message.success(`Delete log leave of "${record.employee?.name || 'N/A'}" successfully!`);
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

  useEffect(() => {
    setFilteredData(filterData());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedValue]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await leaveApi.getAll();
      setData(response);
      setFilteredData(response);
    } catch (error) {
      console.log(error);
      message.error('Something went wrong! Please refresh the page and try again!');
    }
    setLoading(false);
  };

  const filterData = () => {
    return data.filter(
      (item) =>
        item.employee?.name.toLowerCase().includes(searchValue.toLowerCase()) ||
        item.startDate.includes(searchValue) ||
        item.endDate.includes(searchValue) ||
        item.reason.toLowerCase().includes(searchValue.toLowerCase())
    );
  };

  const handleTableChange = (
    pagination: TablePaginationConfig,
    filters: Record<string, FilterValue | null>,
    sorter: SorterResult<Leave> | SorterResult<Leave>[],
    _extra: TableCurrentDataSource<Leave>
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
          title: 'Leaves | OT & Salary Management',
          description: 'List log leaves page',
          url: `${serverRuntimeConfig.HOST_URL}/leaves`,
        }}
      />

      <Space style={{ width: '100%' }} direction="vertical" size="large">
        <section style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Typography.Title level={3}>List leave logs</Typography.Title>
          <Input
            placeholder="Input search text"
            allowClear
            onChange={(event) => setSearchValue(event.target.value)}
            style={{ width: 200 }}
          />
          <Link href={`/${AppRoutes.overtimes}/create`} passHref>
            <Button type="primary" ghost>
              Create new log leave
            </Button>
          </Link>
        </section>
        <section>
          <Table
            scroll={{ x: 800 }}
            columns={columns}
            rowKey={(record) => record.leaveTimeId}
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

export default LogLeavesListPage;
