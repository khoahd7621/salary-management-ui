import { Button, Space, Table, Typography } from 'antd';
import { ColumnsType } from 'antd/es/table';
import getConfig from 'next/config';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import { employeeApi } from '~/api-clients/modules/employee-api';
import { ButtonWithModal, Seo } from '~/components';
import { TableParams } from '~/models/components/Table';
import { NextPageWithLayout } from '~/models/layouts';
import { Employee } from '~/models/modules/employees';

const { serverRuntimeConfig } = getConfig();

const EmployeesListPage: NextPageWithLayout = () => {
  const [data, setData] = useState<Employee[]>();
  const [loading, setLoading] = useState(false);
  const [tableParams, _setTableParams] = useState<TableParams>({
    pagination: {
      current: 1,
      pageSize: 10,
    },
  });

  const columns: ColumnsType<Employee> = [
    {
      title: 'Id',
      dataIndex: 'employeeId',
      sorter: (a, b) => (a.employeeId?.length || 0) - (b.employeeId?.length || 0),
      width: '20%',
      ellipsis: true,
    },
    {
      title: 'Image',
      dataIndex: 'image',
      render: (_text, record) => <Image width={50} height={50} src={record.image || ''} alt={`${record.name}`} />,
      sorter: false,
      width: '10%',
    },
    {
      title: 'Name',
      dataIndex: 'name',
      sorter: (a, b) => (a.name?.length || 0) - (b.name?.length || 0),
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
                  .delete(record.employeeId as string)
                  .then(() => {
                    toast.success('Delete employee successfully!');
                    // fetchData();
                  })
                  .catch(() => {
                    toast.error('Something went wrong! Please refresh page and try again!');
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
      const response = await employeeApi.getAll();
      setData(response);
    } catch (error) {
      console.log(error);
      toast.error('Something went wrong! Please refresh the page and try again!');
    }
    setLoading(false);
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
            rowKey={(record) => record.employeeId as string}
            dataSource={data}
            pagination={tableParams.pagination}
            loading={loading}
          />
        </section>
      </Space>
    </>
  );
};

export default EmployeesListPage;
