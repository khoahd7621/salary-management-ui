import { Button, Input, message, Space, Table, Typography } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { TablePaginationConfig } from 'antd/lib/table';
import { FilterValue, SorterResult, TableCurrentDataSource } from 'antd/lib/table/interface';
import getConfig from 'next/config';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

import { employeeApi } from '~/api-clients/modules/employee-api';
import { ButtonWithModal, Seo } from '~/components';
import { Detail, LogLeaveModal, LogOTModal } from '~/components/modules/employees';
import { useDebounce } from '~/hooks';
import { TableParams } from '~/models/components/Table';
import { NextPageWithLayout } from '~/models/layouts';
import { Employee } from '~/models/modules/employees';

const { serverRuntimeConfig } = getConfig();

const EmployeesListPage: NextPageWithLayout = () => {
  const [data, setData] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(false);
  const [filteredData, setFilteredData] = useState<Employee[]>([]);
  const [searchValue, setSearchValue] = useState<string>('');
  const [tableParams, setTableParams] = useState<TableParams>({
    pagination: {
      current: 1,
      pageSize: 10,
    },
  });
  const [employeeIdOT, setEmployeeIdOT] = useState<string>('');
  const [employeeIdLeave, setEmployeeIdLeave] = useState<string>('');

  const debouncedValue = useDebounce(searchValue, 500);

  const columns: ColumnsType<Employee> = [
    {
      title: 'Code',
      dataIndex: 'code',
      render: (_text, record) => (
        <ButtonWithModal
          modalTitle="Employee detail"
          modalContent={<Detail data={record} />}
          type="info"
          okText="Close"
          okType="primary"
          isLink
        >
          {record.code}
        </ButtonWithModal>
      ),
      sorter: (a, b) => (a.code?.length || 0) - (b.code?.length || 0),
      width: '10%',
      ellipsis: true,
    },
    {
      title: 'Name',
      dataIndex: 'name',
      render: (_text, record) => (
        <ButtonWithModal
          modalTitle="Employee detail"
          modalContent={<Detail data={record} />}
          type="info"
          okText="Close"
          okType="primary"
          isLink
        >
          {record.name}
        </ButtonWithModal>
      ),
      sorter: (a, b) => (a.name?.length || 0) - (b.name?.length || 0),
      width: '20%',
      ellipsis: true,
    },
    {
      title: 'Image',
      dataIndex: 'image',
      render: (_text, record) => (
        <ButtonWithModal
          modalTitle="Employee detail"
          modalContent={<Detail data={record} />}
          type="info"
          okText="Close"
          okType="primary"
          isLink
        >
          <Image width={50} height={50} src={record.image || ''} alt={`${record.name}`} />
        </ButtonWithModal>
      ),
      sorter: false,
      width: '10%',
    },
    {
      title: 'Phone',
      dataIndex: 'phoneNumber',
      render: (_text, record) => (
        <ButtonWithModal
          modalTitle="Employee detail"
          modalContent={<Detail data={record} />}
          type="info"
          okText="Close"
          okType="primary"
          isLink
        >
          {record.phoneNumber || 'N/A'}
        </ButtonWithModal>
      ),
      sorter: (a, b) => (a?.phoneNumber.length || 0) - (b?.phoneNumber.length || 0),
      width: '10%',
      ellipsis: true,
    },
    {
      title: 'Email',
      dataIndex: 'email',
      render: (_text, record) => (
        <ButtonWithModal
          modalTitle="Employee detail"
          modalContent={<Detail data={record} />}
          type="info"
          okText="Close"
          okType="primary"
          isLink
        >
          {record.email || 'N/A'}
        </ButtonWithModal>
      ),
      sorter: (a, b) => (a?.email.length || 0) - (b?.email.length || 0),
      width: '10%',
      ellipsis: true,
    },
    {
      title: 'Action',
      dataIndex: 'action',
      render: (_text, record) => {
        return (
          <Space>
            <Link href={`/employees/${record.employeeId}`}>
              <Button type="primary">Edit</Button>
            </Link>
            <ButtonWithModal
              modalTitle="Warning"
              modalContent={`Are you sure to delete employee "${record.name}"`}
              onOk={() => {
                employeeApi
                  .delete(record.employeeId)
                  .then(() => {
                    message.success('Delete employee successfully!');
                    fetchData();
                  })
                  .catch((error) => {
                    console.log(error);
                    message.error('Something went wrong! Please refresh page and try again!');
                  });
              }}
            >
              Delete
            </ButtonWithModal>
            <Button
              style={{ backgroundColor: '#ccc', color: '#000' }}
              onClick={() => setEmployeeIdOT(record.employeeId)}
            >
              Log OT
            </Button>
            <Button
              style={{ backgroundColor: '#fca130', color: '#fff' }}
              onClick={() => setEmployeeIdLeave(record.employeeId)}
            >
              Log Leave
            </Button>
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
      const response = await employeeApi.getAll();
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
        item.code?.toLowerCase().includes(debouncedValue.toLowerCase()) ||
        item.name?.toLowerCase().includes(debouncedValue.toLowerCase())
    );
  };

  const handleTableChange = (
    pagination: TablePaginationConfig,
    filters: Record<string, FilterValue | null>,
    sorter: SorterResult<Employee> | SorterResult<Employee>[],
    _extra: TableCurrentDataSource<Employee>
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
          title: 'Employees | OT & Salary Management',
          description: 'List employees page',
          url: `${serverRuntimeConfig.HOST_URL}/employees`,
        }}
      />

      <Space style={{ width: '100%' }} direction="vertical" size="large">
        <section style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Typography.Title level={3}>List employees</Typography.Title>
          <Input
            placeholder="Input search text"
            allowClear
            onChange={(event) => setSearchValue(event.target.value)}
            style={{ width: 200 }}
          />
          <Link href="/employees/create" passHref>
            <Button type="primary" ghost>
              Create new employee
            </Button>
          </Link>
        </section>
        <section>
          <Table
            scroll={{ x: 800 }}
            columns={columns}
            rowKey={(record) => record.employeeId}
            dataSource={filteredData}
            pagination={tableParams.pagination}
            loading={loading}
            onChange={handleTableChange}
          />
        </section>
      </Space>

      <LogOTModal employeeId={employeeIdOT} setEmployeeId={setEmployeeIdOT} />
      <LogLeaveModal employeeId={employeeIdLeave} setEmployeeId={setEmployeeIdLeave} />
    </>
  );
};

export default EmployeesListPage;
