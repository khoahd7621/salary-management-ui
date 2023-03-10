import { Button, message, Space, Tag, Typography } from 'antd';
import { ColumnsType } from 'antd/es/table';
import Table, { TablePaginationConfig } from 'antd/lib/table';
import { FilterValue, SorterResult, TableCurrentDataSource } from 'antd/lib/table/interface';
import dayjs from 'dayjs';
import getConfig from 'next/config';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { contractApi, GetPagination } from '~/api-clients/modules/contract-api';

import { ButtonWithModal, Seo } from '~/components';
import { ContractDetail } from '~/components/modules/contracts/ContractDetail';
import { TableParams } from '~/models/components/Table';
import { AppRoutes } from '~/models/constants/Routes';
import { NextPageWithLayout } from '~/models/layouts';
import { Contract, Status } from '~/models/modules/contracts';

const { serverRuntimeConfig } = getConfig();

const ContractsListPage: NextPageWithLayout = () => {
  const { Title } = Typography;
  const [data, setData] = useState<Contract[]>();
  const [loading, setLoading] = useState(false);
  const [tableParams, setTableParams] = useState<TableParams>({
    sortField: undefined,
    sortOrder: undefined,
    pagination: {
      current: 1,
      pageSize: 10,
      total: 0,
    },
  });

  const columns: ColumnsType<Contract> = [
    {
      title: 'Company',
      dataIndex: 'partner',
      render: (_text, record) => (
        <ButtonWithModal
          modalTitle="Contract detail"
          modalContent={<ContractDetail data={record} />}
          type="info"
          okText="Close"
          okType="primary"
          isLink
        >
          {record.partner?.companyName}
        </ButtonWithModal>
      ),
      sorter: (a, b) => (a.partner?.companyName?.length || 0) - (b.partner?.companyName?.length || 0),
      width: '15%',
      ellipsis: true,
    },
    {
      title: 'Employee',
      dataIndex: 'employee',
      render: (_text, record) => (
        <ButtonWithModal
          modalTitle="Contract detail"
          modalContent={<ContractDetail data={record} />}
          type="info"
          okText="Close"
          okType="primary"
          isLink
        >
          {record.employee?.name}
        </ButtonWithModal>
      ),
      sorter: (a, b) => (a.employee?.name?.length || 0) - (b.employee?.name?.length || 0),
      width: '15%',
      ellipsis: true,
    },
    {
      title: 'Start date',
      dataIndex: 'startDate',
      render: (_text, record) => (
        <ButtonWithModal
          modalTitle="Contract detail"
          modalContent={<ContractDetail data={record} />}
          type="info"
          okText="Close"
          okType="primary"
          isLink
        >
          {dayjs(record.startDate).format('DD/MM/YYYY')}
        </ButtonWithModal>
      ),
      sorter: (a, b) => dayjs(a.startDate).diff(b.startDate),
      width: '12%',
    },
    {
      title: 'End date',
      dataIndex: 'endDate',
      render: (_text, record) => (
        <ButtonWithModal
          modalTitle="Contract detail"
          modalContent={<ContractDetail data={record} />}
          type="info"
          okText="Close"
          okType="primary"
          isLink
        >
          {dayjs(record.endDate).format('DD/MM/YYYY')}
        </ButtonWithModal>
      ),
      sorter: (a, b) => dayjs(a.endDate).diff(b.endDate),
      width: '12%',
    },
    {
      title: 'Status',
      dataIndex: 'contractStatus',
      render: (_text, record) => {
        let color = 'green';
        if (record.contractStatus === Status.Expired) {
          color = 'volcano';
        } else if (record.contractStatus === Status.Inactive) {
          color = 'red';
        } else if (record.contractStatus === Status.Terminated) {
          color = 'geekblue';
        }
        return (
          <ButtonWithModal
            modalTitle="Contract detail"
            modalContent={<ContractDetail data={record} />}
            type="info"
            okText="Close"
            okType="primary"
            isLink
          >
            <Tag color={color}>{record.contractStatus}</Tag>
          </ButtonWithModal>
        );
      },
      width: '10%',
    },
    {
      title: 'Action',
      dataIndex: 'action',
      render: (_text, record) => {
        return (
          <Space>
            <Link href={`/${AppRoutes.contracts}/${record.contractId}`}>
              <Button type="primary">Edit</Button>
            </Link>
            <ButtonWithModal
              modalTitle="Warning"
              modalContent={`Are you sure to delete contract between "${record.partner.companyName}" and "${record.employee.name}"`}
              onOk={() => {
                contractApi
                  .delete(record.contractId)
                  .then(() => {
                    message.success('Delete contract successfully!');
                    fetchData({
                      pageNumber: 1,
                      pageSize: 10,
                      sortBy: undefined,
                      isDesc: undefined,
                    });
                  })
                  .catch((error) => {
                    console.log(error);
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
    fetchData({
      pageNumber: 1,
      pageSize: 10,
      sortBy: undefined,
      isDesc: undefined,
    });
  }, []);

  const fetchData = async (param: GetPagination) => {
    setLoading(true);
    try {
      const response = await contractApi.getAllWithPagination(param);
      setData(response.results);
      setTableParams((prev) => {
        return {
          ...prev,
          pagination: {
            current: response.currentPage,
            pageSize: response.itemPerPage,
            total: response.totalCount,
          },
        };
      });
    } catch (error) {
      console.log(error);
      message.error('Something went wrong! Please refresh the page and try again!');
    }
    setLoading(false);
  };

  const handleTableChange = (
    pagination: TablePaginationConfig,
    filters: Record<string, FilterValue | null>,
    sorter: SorterResult<Contract> | SorterResult<Contract>[],
    _extra: TableCurrentDataSource<Contract>
  ) => {
    let sortBy = undefined;
    let isDesc = undefined;
    if ((sorter as SorterResult<Contract>).column) {
      sortBy = (sorter as SorterResult<Contract>).field;
      isDesc = (sorter as SorterResult<Contract>).order === 'descend';
    }
    fetchData({
      pageNumber: pagination.current || 1,
      pageSize: pagination.pageSize || 10,
      isDesc: isDesc,
      sortBy: sortBy as string,
    });
    setTableParams({
      pagination: {
        ...pagination,
        current: pagination.current,
      },
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
        <section>
          <Table
            scroll={{ x: 800 }}
            columns={columns}
            rowKey={(record) => record.contractId}
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

export default ContractsListPage;
