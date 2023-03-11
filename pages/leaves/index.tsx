import { Button, Input, message, Space, Table, TablePaginationConfig, Typography } from 'antd';
import { ColumnsType } from 'antd/lib/table';
import { FilterValue, SorterResult, TableCurrentDataSource } from 'antd/lib/table/interface';
import dayjs from 'dayjs';
import getConfig from 'next/config';
import Link from 'next/link';
import { useEffect, useState } from 'react';

import { leaveApi } from '~/api-clients/modules/leave-api-v2';
import { ButtonWithModal, Seo } from '~/components';
import { useDebounce } from '~/hooks';
import { TableParams } from '~/models/components/Table';
import { AppRoutes } from '~/models/constants/Routes';
import { NextPageWithLayout } from '~/models/layouts';
import { Leave } from '~/models/modules/leaves/v2';

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

  const map = new Map<string, Leave>();
  if (data.length) {
    for (const item of data) {
      if (!map.has(item.employee.employeeId)) {
        map.set(item.employee.employeeId, item);
      }
    }
  }
  const filter = map.size ? Array.from(map.keys()).map((key) => map.get(key)) : [];

  const columns: ColumnsType<Leave> = [
    {
      title: 'Employee',
      dataIndex: 'employee',
      filters: filter?.map((item) => {
        return {
          text: item?.employee.name || '',
          value: item?.employee.employeeId || '',
        };
      }),
      onFilter: (value: string | number | boolean, record) =>
        (record.employee?.employeeId.indexOf(value as string) || 0) === 0,
      render: (_text, record) => record.employee?.name || 'N/A',
      sorter: (a, b) => (a.employee?.name?.length || 0) - (b.employee?.name?.length || 0),
      width: '20%',
      ellipsis: true,
    },
    {
      title: 'Date',
      dataIndex: 'date',
      render: (_text, record) => dayjs(record.date).format('DD/MM/YYYY'),
      sorter: (a, b) => dayjs(a.date).diff(b.date),
      width: '15%',
      ellipsis: true,
    },
    {
      title: 'Hours',
      dataIndex: 'hours',
      sorter: (a, b) => a.hours - b.hours,
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
            <Link href={`/${AppRoutes.leaves}/${record.leaveLogId}`}>
              <Button type="primary">Edit</Button>
            </Link>
            <ButtonWithModal
              modalTitle="Warning"
              modalContent={`Are you sure to delete log leave of employee "${
                record.employee?.name || 'N/A'
              }" at date "${dayjs(record.date).format('DD/MM/YYYY')}" with reason "${record.reason}"?`}
              onOk={() => {
                leaveApi
                  .delete(record.leaveLogId)
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
        dayjs(item.date).format('DD/MM/YYYY').includes(searchValue) ||
        item.hours.toString().includes(searchValue) ||
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
          url: `${serverRuntimeConfig.HOST_URL}/${AppRoutes.leaves}`,
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
          <Link href={`/${AppRoutes.leaves}/create`} passHref>
            <Button type="primary" ghost>
              Create new log leave
            </Button>
          </Link>
        </section>
        <section>
          <Table
            scroll={{ x: 800 }}
            columns={columns}
            rowKey={(record) => record.leaveLogId}
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
