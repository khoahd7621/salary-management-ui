import { Button, Input, message, Space, Table, Typography } from 'antd';
import { ColumnsType, TablePaginationConfig } from 'antd/lib/table';
import { FilterValue, SorterResult, TableCurrentDataSource } from 'antd/lib/table/interface';
import dayjs from 'dayjs';
import getConfig from 'next/config';
import Link from 'next/link';
import { useEffect, useState } from 'react';

import { payslipApi } from '~/api-clients/modules/payslip-api';
import { ButtonWithModal, Seo } from '~/components';
import { ButtonSendMail } from '~/components/ButtonSendMail';
import { useDebounce } from '~/hooks';
import { TableParams } from '~/models/components/Table';
import { AppRoutes } from '~/models/constants/Routes';
import { NextPageWithLayout } from '~/models/layouts';
import { Payslip } from '~/models/modules/payslips';
import { formatMoney } from '~/utils/format';

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
      dataIndex: 'paidType',
      filters: [
        {
          text: 'Staff',
          value: 'Staff',
        },
        {
          text: 'Partner',
          value: 'Partner',
        },
      ],
      filterSearch: true,
      onFilter: (value: string | number | boolean, record) => record.paidType.includes(value as string),
      sorter: (a, b) => a.paidType.length - b.paidType.length,
      ellipsis: true,
    },
    {
      title: 'Employee',
      dataIndex: 'contract',
      render: (_text, record) => record.contract.employee.name,
      sorter: (a, b) => a.contract.employee.name.length - b.contract.employee.name.length,
    },
    {
      title: 'Company',
      dataIndex: 'contract',
      render: (_text, record) => record.contract.partner.companyName,
      sorter: (a, b) => a.contract.partner.companyName.length - b.contract.partner.companyName.length,
      ellipsis: true,
    },
    {
      title: 'Date',
      dataIndex: 'paidDate',
      render: (_text, record) => dayjs(record.paidDate).format('MM/YYYY'),
      sorter: (a, b) => dayjs(a.paidDate).diff(b.paidDate.length),
      ellipsis: true,
    },
    {
      title: 'Total money',
      dataIndex: 'finalIncome',
      render: (_text, record) => formatMoney.VietnamDong.format(record.finalIncome || 0),
      sorter: (a, b) => a.finalIncome - b.finalIncome,
      ellipsis: true,
    },
    {
      title: 'Action',
      dataIndex: 'action',
      width: '340px',
      render: (_text, record) => {
        return (
          <Space>
            <Link href={`/${AppRoutes.payslips}/${record.payHistoryId}/view`}>
              <Button type="primary" style={{ background: '#3a9c6f' }}>
                View
              </Button>
            </Link>

            <Link href={`/${AppRoutes.payslips}/${record.payHistoryId}/edit`}>
              <Button type="primary">Edit</Button>
            </Link>

            <ButtonWithModal
              modalTitle="Warning"
              modalContent={`Are you sure to delete payslip type "${record.paidType}" between employee "${
                record.contract.employee.name
              }" and company "${record.contract.partner.companyName}" in "${dayjs(record.paidDate).format('MM/YYYY')}"`}
              onOk={() => {
                payslipApi
                  .delete(record.payHistoryId)
                  .then(() => {
                    message.success(`Delete payslip successfully!`);
                    fetchData();
                  })
                  .catch(() => {
                    message.error('Something went wrong! Please refresh page and try again!');
                  });
              }}
            >
              Delete
            </ButtonWithModal>

            <ButtonSendMail data={record} />
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
      const response = await payslipApi.getAll();
      setData(response.results);
      setFilteredData(response.results);
    } catch (error) {
      console.log(error);
      message.error('Something went wrong! Please refresh the page and try again!');
    }
    setLoading(false);
  };

  const filterData = () => {
    return data.filter(
      (item) =>
        item.contract.employee.name.toLowerCase().includes(searchValue.toLowerCase()) ||
        item.contract.partner.companyName.toLowerCase().includes(searchValue.toLowerCase()) ||
        item.paidType.toLowerCase().includes(searchValue.toLowerCase()) ||
        dayjs(item.paidDate).format('MM/YYYY').toLowerCase().includes(searchValue.toLowerCase()) ||
        formatMoney.VietnamDong.format(item.finalIncome || 0)
          .toLowerCase()
          .includes(searchValue.toLowerCase())
    );
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
