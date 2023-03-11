import { UploadOutlined } from '@ant-design/icons';
import { Button, message, Space, Table, Typography, Upload } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { TablePaginationConfig } from 'antd/lib/table';
import { FilterValue, SorterResult, TableCurrentDataSource } from 'antd/lib/table/interface';
import { RcFile, UploadChangeParam, UploadFile } from 'antd/lib/upload/interface';
import dayjs from 'dayjs';
import getConfig from 'next/config';
import Link from 'next/link';
import { UploadRequestOption } from 'rc-upload/lib/interface';
import { useEffect, useState } from 'react';

import { AxiosProgressEvent } from 'axios';
import { holidayApi } from '~/api-clients/modules/holiday-api';
import { ButtonWithModal, Seo } from '~/components';
import { TableParams } from '~/models/components/Table';
import { AppRoutes } from '~/models/constants/Routes';
import { NextPageWithLayout } from '~/models/layouts';
import { Holiday } from '~/models/modules/holidays';

const { serverRuntimeConfig } = getConfig();

const HolidaysListPage: NextPageWithLayout = () => {
  const [data, setData] = useState<Holiday[]>();
  const [loading, setLoading] = useState(false);
  const [tableParams, setTableParams] = useState<TableParams>({
    pagination: {
      current: 1,
      pageSize: 10,
    },
  });

  const columns: ColumnsType<Holiday> = [
    {
      title: 'Name',
      dataIndex: 'holidayName',
      sorter: (a, b) => (a.holidayName?.length || 0) - (b.holidayName?.length || 0),
      width: '20%',
      ellipsis: true,
    },
    {
      title: 'Start date',
      dataIndex: 'startDate',
      render: (_text, record) => dayjs(record.startDate).format('DD/MM/YYYY'),
      sorter: (a, b) => dayjs(a.startDate).diff(b.startDate),
      width: '20%',
    },
    {
      title: 'End date',
      dataIndex: 'endDate',
      render: (_text, record) => dayjs(record.endDate).format('DD/MM/YYYY'),
      sorter: (a, b) => dayjs(a.endDate).diff(b.endDate),
      width: '20%',
    },
    {
      title: 'Is paid',
      dataIndex: 'endDate',
      render: (_text, record) => (record.isPaid ? 'Yes' : 'No'),
      width: '20%',
    },
    {
      title: 'Action',
      dataIndex: 'action',
      width: '20%',
      render: (_text, record) => {
        return (
          <Space>
            <Link href={`/${AppRoutes.holidays}/${record.holidayId}`}>
              <Button type="primary">Edit</Button>
            </Link>
            <ButtonWithModal
              modalTitle="Warning"
              modalContent={`Are you sure to delete holiday "${record.holidayName}"`}
              onOk={() => {
                holidayApi
                  .delete(record.holidayId)
                  .then(() => {
                    message.success(`Delete holiday "${record.holidayName}" successfully!`);
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
      const response = await holidayApi.getAll();
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
    sorter: SorterResult<Holiday> | SorterResult<Holiday>[],
    _extra: TableCurrentDataSource<Holiday>
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

  const beforeUpload = (file: RcFile) => {
    const isExcel = file.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
    if (!isExcel) {
      message.error('You can only upload XLSX file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error('File must smaller than 2MB!');
    }
    return (isExcel && isLt2M) || Upload.LIST_IGNORE;
  };

  const customRequest = async ({ file, onSuccess, onProgress, onError }: UploadRequestOption) => {
    try {
      await holidayApi.import(file, (progressEvent: AxiosProgressEvent) => {
        const percentCompleted = Math.round((progressEvent.loaded * 100) / (progressEvent.total || 1));
        onProgress?.({ percent: percentCompleted });
      });
      onSuccess?.(file);
    } catch (error: any) {
      onError?.(error);
    }
  };

  function onChange(info: UploadChangeParam<UploadFile<any>>) {
    if (info.file.status === 'done') {
      message.success(`${info.file.name} file uploaded successfully`);
      fetchData();
      setTableParams({
        pagination: {
          current: 1,
          pageSize: 10,
        },
      });
    } else if (info.file.status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
  }

  return (
    <>
      <Seo
        data={{
          title: 'Holidays | OT & Salary Management',
          description: 'List holidays page',
          url: `${serverRuntimeConfig.HOST_URL}/${AppRoutes.holidays}`,
        }}
      />

      <Space style={{ width: '100%' }} direction="vertical" size="large">
        <section style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Typography.Title level={3}>List holidays</Typography.Title>

          <Space>
            <Upload onChange={onChange} beforeUpload={beforeUpload} customRequest={customRequest}>
              <Button icon={<UploadOutlined />}>Click to Upload</Button>
            </Upload>

            <a
              href={'/assets/HolidayTemplate.xlsx'}
              download="HolidayTemplate"
              target="_blank"
              rel="noreferrer noopener"
            >
              <Button>Download Excel Template</Button>
            </a>
          </Space>

          <Link href={`/${AppRoutes.holidays}/create`} passHref>
            <Button type="primary" ghost>
              Create new holiday
            </Button>
          </Link>
        </section>
        <section>
          <Table
            scroll={{ x: 800 }}
            columns={columns}
            rowKey={(record) => record.holidayId}
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

export default HolidaysListPage;
