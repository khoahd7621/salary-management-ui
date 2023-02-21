import { Button, DatePicker, Form, Input, InputNumber, message, Select, Space, Typography } from 'antd';
import { useForm } from 'antd/lib/form/Form';
import getConfig from 'next/config';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';

import { Seo, UploadFiles } from '~/components';
import { SelectCompanyModal } from '~/components/modules/contracts';
import { AppRoutes } from '~/models/constants/Routes';
import { Company } from '~/models/modules/companies';
import { CreateForm, SalaryType, Type } from '~/models/modules/contracts';

const { serverRuntimeConfig } = getConfig();

export default function CreateContractPage() {
  const { RangePicker } = DatePicker;
  const [form] = useForm();
  const _router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const [file, setFile] = useState<any>(null);
  const [company, setCompany] = useState<Company | null>(null);

  const onFinish = async (_data: CreateForm) => {
    setLoading(true);
    try {
      // await contractApi.create();
      // await router.push(`/${AppRoutes.contracts}`);
      await message.success('Contract created successfully!', 3);
    } catch (error) {
      message.error('Something went wrong! Please refresh the page and try again!');
    }
    setLoading(false);
  };

  const handleSelectCompany = (company: Company | null) => {
    if (company) {
      setCompany(company);
      form.setFieldsValue({ companyId: company.companyId });
    } else {
      setCompany(null);
      form.setFieldsValue({ companyId: '' });
    }
  };

  return (
    <>
      <Seo
        data={{
          title: 'Create contract | OT & Salary Management',
          description: 'Create contract page',
          url: `${serverRuntimeConfig.HOST_URL}/${AppRoutes.contracts}/create`,
        }}
      />
      <Space style={{ width: '100%' }} direction="vertical" size="middle">
        <section style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Typography.Title level={3}>Create new contract</Typography.Title>
        </section>

        <Form
          form={form}
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          style={{ maxWidth: 600 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          autoComplete="off"
        >
          <Space style={{ width: '100%' }} direction="vertical">
            <Form.Item label="File" name="file" rules={[{ required: true, message: 'Please add contract file!' }]}>
              <UploadFiles
                file={file}
                setFile={(file) => {
                  if (file) {
                    setFile(file);
                    form.setFieldsValue({ file: file.name });
                  } else {
                    setFile(null);
                    form.setFieldsValue({ file: '' });
                  }
                }}
              />
            </Form.Item>
            <Form.Item
              label="Apply date"
              name="applyDate"
              rules={[{ required: true, message: 'Please input apply date!' }]}
            >
              <RangePicker format={'DD/MM/YYYY'} />
            </Form.Item>
            <Form.Item label="Job title" name="job" rules={[{ required: true, message: 'Please input job title!' }]}>
              <Input />
            </Form.Item>
            <Form.Item
              label="Basic salary"
              name="basicSalary"
              rules={[{ required: true, message: 'Please input basic salary!' }]}
            >
              <InputNumber
                formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                addonAfter="VNĐ"
                min={0}
                max={1000000000}
                style={{ width: '100%' }}
              />
            </Form.Item>
            <Form.Item
              label="Salary type"
              name="salaryType"
              rules={[{ required: true, message: 'Please select salary type!' }]}
            >
              <Select
                showSearch
                placeholder="Select salary type"
                allowClear
                onClear={() => form.setFieldsValue({ salaryType: '' })}
                onChange={(value) => form.setFieldsValue({ salaryType: value })}
                filterOption={(input, option) => (option?.label ?? '').toLowerCase().includes(input.toLowerCase())}
                options={[
                  {
                    value: SalaryType.Gross,
                    label: 'Gross',
                  },
                  {
                    value: SalaryType.Net,
                    label: 'Net',
                  },
                ]}
              />
            </Form.Item>
            <Form.Item label="BHXH" name="bhxh" rules={[{ required: true, message: 'Please input price of BHXH!' }]}>
              <InputNumber
                formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                addonAfter="VNĐ"
                min={0}
                max={1000000000}
                style={{ width: '100%' }}
              />
            </Form.Item>
            <Form.Item noStyle>
              <Form.Item
                label="Company"
                name="companyId"
                rules={[{ required: true, message: 'Please select a company!' }]}
              >
                <SelectCompanyModal setCompany={handleSelectCompany} companyName={company?.companyName || ''} />
              </Form.Item>
            </Form.Item>
            <Form.Item
              label="Company price"
              name="companyPrice"
              rules={[{ required: true, message: 'Please enter company price!' }]}
            >
              <InputNumber
                formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                addonAfter="VNĐ"
                min={0}
                max={1000000000}
                style={{ width: '100%' }}
              />
            </Form.Item>
            <Form.Item
              label="Employee"
              name="employeeId"
              rules={[{ required: true, message: 'Please select an employee!' }]}
            >
              <Input />
            </Form.Item>
            <Form.Item label="Type" name="type" rules={[{ required: true, message: 'Please select contract type!' }]}>
              <Select
                showSearch={true}
                placeholder="Select contract type"
                allowClear={true}
                onClear={() => form.setFieldsValue({ type: '' })}
                onChange={(value) => form.setFieldsValue({ type: value })}
                filterOption={(input, option) => (option?.label ?? '').toLowerCase().includes(input.toLowerCase())}
                options={[
                  {
                    value: Type.FullTime,
                    label: 'Full-time',
                  },
                  {
                    value: Type.Internship,
                    label: 'Internship',
                  },
                  {
                    value: Type.PartTime,
                    label: 'Part-time',
                  },
                  {
                    value: Type.Temporary,
                    label: 'Temporary',
                  },
                ]}
              />
            </Form.Item>

            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
              <Button disabled={loading} type="primary" htmlType="submit">
                Create
              </Button>
              <Link style={{ marginLeft: '16px' }} href={`/${AppRoutes.contracts}`} passHref>
                <Button type="primary" danger>
                  Cancel
                </Button>
              </Link>
            </Form.Item>
          </Space>
        </Form>
      </Space>
    </>
  );
}
