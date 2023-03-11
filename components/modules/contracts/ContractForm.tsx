import { Button, DatePicker, Form, Input, InputNumber, Select, Space } from 'antd';
import { FormInstance } from 'antd/lib/form/Form';
import Link from 'next/link';

import { UploadFiles } from '~/components/UploadFiles';
import { AppRoutes } from '~/models/constants/Routes';
import { Company } from '~/models/modules/companies';
import { SalaryType, Type } from '~/models/modules/contracts';
import { Employee } from '~/models/modules/employees';
import { addCommasToNumber } from '~/utils/format';
import { SelectCompanyModal } from './SelectCompanyModal';
import { SelectEmployeeModal } from './SelectEmployeeModal';

export interface ContractFormProps {
  form: FormInstance<any> | undefined;
  onFinish: (_values: any) => void;
  file: any;
  setFile: (_file: any) => void;
  company: Company | null;
  setCompany: (_company: Company | null) => void;
  employee: Employee | null;
  setEmployee: (_employee: Employee | null) => void;
  isSending: boolean;
  button: 'Create' | 'Update';
}

export function ContractForm({
  form,
  onFinish,
  file,
  setFile,
  company,
  setCompany,
  employee,
  setEmployee,
  isSending,
  button,
}: ContractFormProps) {
  const { RangePicker } = DatePicker;

  const handleSelectCompany = (company: Company | null) => {
    if (company) {
      setCompany(company);
      form?.setFieldsValue({ companyId: company.companyId });
    } else {
      setCompany(null);
      form?.setFieldsValue({ companyId: '' });
    }
  };

  const handleSelectEmployee = (employee: Employee | null) => {
    if (employee) {
      setEmployee(employee);
      form?.setFieldsValue({ employeeId: employee.employeeId });
    } else {
      setEmployee(null);
      form?.setFieldsValue({ employeeId: '' });
    }
  };

  return (
    <Form
      form={form}
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      style={{ maxWidth: 600 }}
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
                form?.setFieldsValue({ file: file.name });
              } else {
                setFile(null);
                form?.setFieldsValue({ file: '' });
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
            formatter={(value) => addCommasToNumber(value)}
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
            onClear={() => form?.setFieldsValue({ salaryType: '' })}
            onChange={(value) => form?.setFieldsValue({ salaryType: value })}
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
            formatter={(value) => addCommasToNumber(value)}
            addonAfter="VNĐ"
            min={0}
            max={1000000000}
            style={{ width: '100%' }}
          />
        </Form.Item>
        <Form.Item label="BHYT" name="bhyt" rules={[{ required: true, message: 'Please input price of BHYT!' }]}>
          <InputNumber
            formatter={(value) => addCommasToNumber(value)}
            addonAfter="VNĐ"
            min={0}
            max={1000000000}
            style={{ width: '100%' }}
          />
        </Form.Item>
        <Form.Item label="BHTN" name="bhtn" rules={[{ required: true, message: 'Please input price of BHTN!' }]}>
          <InputNumber
            formatter={(value) => addCommasToNumber(value)}
            addonAfter="VNĐ"
            min={0}
            max={1000000000}
            style={{ width: '100%' }}
          />
        </Form.Item>
        <Form.Item label="Tax" name="tax" rules={[{ required: true, message: 'Please input price of TAX!' }]}>
          <InputNumber
            formatter={(value) => addCommasToNumber(value)}
            addonAfter="VNĐ"
            min={0}
            max={1000000000}
            style={{ width: '100%' }}
          />
        </Form.Item>
        <Form.Item noStyle>
          <Form.Item label="Company" name="companyId" rules={[{ required: true, message: 'Please select a company!' }]}>
            <SelectCompanyModal setCompany={handleSelectCompany} companyName={company?.companyName || ''} />
          </Form.Item>
        </Form.Item>
        <Form.Item
          label="Company price"
          name="companyPrice"
          rules={[{ required: true, message: 'Please enter company price!' }]}
        >
          <InputNumber
            formatter={(value) => addCommasToNumber(value)}
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
          <SelectEmployeeModal setEmployee={handleSelectEmployee} employeeName={employee?.name || ''} />
        </Form.Item>
        <Form.Item label="Type" name="type" rules={[{ required: true, message: 'Please select contract type!' }]}>
          <Select
            showSearch={true}
            placeholder="Select contract type"
            allowClear={true}
            onClear={() => form?.setFieldsValue({ type: '' })}
            onChange={(value) => form?.setFieldsValue({ type: value })}
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
          <Button disabled={isSending} type="primary" htmlType="submit">
            {button}
          </Button>
          <Link style={{ marginLeft: '16px' }} href={`/${AppRoutes.contracts}`} passHref>
            <Button type="primary" danger>
              Cancel
            </Button>
          </Link>
        </Form.Item>
      </Space>
    </Form>
  );
}
