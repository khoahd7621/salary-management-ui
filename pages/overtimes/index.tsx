import { Button, Input, message, Space, Table, Typography } from 'antd';
import { ColumnsType, TablePaginationConfig } from 'antd/lib/table';
import { FilterValue, SorterResult, TableCurrentDataSource } from 'antd/lib/table/interface';
import dayjs from 'dayjs';
import getConfig from 'next/config';
import Link from 'next/link';
import { useEffect, useState } from 'react';

import { overtimeApi } from '~/api-clients/modules/overtime-api';
import { ButtonWithModal, Seo } from '~/components';
import { useDebounce } from '~/hooks';
import { TableParams } from '~/models/components/Table';
import { AppRoutes } from '~/models/constants/Routes';
import { NextPageWithLayout } from '~/models/layouts';
import { Overtime } from '~/models/modules/overtimes';

const { serverRuntimeConfig } = getConfig();

const LogOvertimesListPage: NextPageWithLayout = () => {
  const [data, setData] = useState<Overtime[]>([]);
  const [filteredData, setFilteredData] = useState<Overtime[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchValue, setSearchValue] = useState<string>('');
  const [tableParams, setTableParams] = useState<TableParams>({
    pagination: {
      current: 1,
      pageSize: 10,
    },
  });

  const debouncedValue = useDebounce(searchValue, 500);

  const map = new Map<string, Overtime>();
  if (data.length) {
    for (const item of data) {
      if (!map.has(item.employeeId)) {
        map.set(item.employeeId, item);
      }
    }
  }
  const filter = map.size ? Array.from(map.keys()).map((key) => map.get(key)) : [];

  const columns: ColumnsType<Overtime> = [
    {
      title: 'Employee',
      dataIndex: 'employee',
      filters: filter.map((item) => {
        return {
          text: item?.employee.name || '',
          value: item?.employeeId || '',
        };
      }),
      onFilter: (value: string | number | boolean, record) => (record.employeeId.indexOf(value as string) || 0) === 0,
      render: (_text, record) => record.employee?.name || 'N/A',
      sorter: (a, b) => (a.employee?.name?.length || 0) - (b.employee?.name?.length || 0),
      width: '20%',
      ellipsis: true,
    },
    {
      title: 'Date',
      dataIndex: 'overtimeDay',
      render: (_text, record) => dayjs(record.overtimeDay).format('DD/MM/YYYY'),
      sorter: (a, b) => dayjs(a.overtimeDay).diff(b.overtimeDay),
      width: '20%',
    },
    {
      title: 'Hours',
      dataIndex: 'hours',
      sorter: (a, b) => a.hours - b.hours,
      width: '20%',
    },
    {
      title: 'Action',
      dataIndex: 'action',
      width: '20%',
      render: (_text, record) => {
        return (
          <Space>
            <Link href={`/${AppRoutes.overtimes}/${record.overtimeId}`}>
              <Button type="primary">Edit</Button>
            </Link>
            <ButtonWithModal
              modalTitle="Warning"
              modalContent={`Are you sure to delete log ot of employee "${
                record.employee?.name || 'N/A'
              }" in date "${dayjs(record.overtimeDay).format('DD/MM/YYYY')}"`}
              onOk={() => {
                overtimeApi
                  .delete(record.overtimeId)
                  .then(() => {
                    message.success(`Delete log ot of "${record.employee?.name || 'N/A'}" successfully!`);
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
      const response = await overtimeApi.getAll();
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
        item.hours.toString().includes(searchValue) ||
        item.overtimeDay.includes(searchValue)
    );
  };

  const handleTableChange = (
    pagination: TablePaginationConfig,
    filters: Record<string, FilterValue | null>,
    sorter: SorterResult<Overtime> | SorterResult<Overtime>[],
    _extra: TableCurrentDataSource<Overtime>
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
          title: 'Log Overtimes | OT & Salary Management',
          description: 'List log overtimes page',
          url: `${serverRuntimeConfig.HOST_URL}/overtimes`,
        }}
      />

      <Space style={{ width: '100%' }} direction="vertical" size="large">
        <section style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Typography.Title level={3}>List overtime logs</Typography.Title>
          <Input
            placeholder="Input search text"
            allowClear
            onChange={(event) => setSearchValue(event.target.value)}
            style={{ width: 200 }}
          />
          <Link href={`/${AppRoutes.overtimes}/create`} passHref>
            <Button type="primary" ghost>
              Log new overtime
            </Button>
          </Link>
        </section>
        <section>
          <Table
            scroll={{ x: 800 }}
            columns={columns}
            rowKey={(record) => record.overtimeId}
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

export default LogOvertimesListPage;
