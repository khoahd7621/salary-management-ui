import { Button, Form, Select, Space } from 'antd';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { AppRoutes } from '~/models/constants/Routes';

import { Employee } from '~/models/modules/employees';
import { SelectEmployeeModal } from '../contracts';

export function CalculateForm() {
  const route = useRouter();
  const [form] = Form.useForm();
  const [employee, setEmployee] = useState<Employee | null>(null);
  const [isSending, setIsSending] = useState(false);

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
      initialValues={{ hours: 1 }}
      onFinish={async (values) => {
        setIsSending(true);
        await route.push(`/${AppRoutes.salaries}/${values.employeeId}/${values.for}`);
        setIsSending(false);
      }}
      autoComplete="off"
    >
      <Space style={{ width: '100%' }} direction="vertical">
        <Form.Item
          label="Employee"
          name="employeeId"
          rules={[{ required: true, message: 'Please select an employee!' }]}
        >
          <SelectEmployeeModal
            setEmployee={handleSelectEmployee}
            employeeName={employee?.name || ''}
            employee={employee}
          />
        </Form.Item>
        <Form.Item
          label="For"
          name="for"
          rules={[{ required: true, message: 'Please choose who will receive this payroll!' }]}
        >
          <Select
            showSearch
            placeholder="Select the payroll recipient"
            allowClear
            onClear={() => form?.setFieldsValue({ salaryType: '' })}
            onChange={(value) => form?.setFieldsValue({ salaryType: value })}
            filterOption={(input, option) => (option?.label ?? '').toLowerCase().includes(input.toLowerCase())}
            options={[
              {
                value: 'staff-salary',
                label: 'Staff',
              },
              {
                value: 'partner-salary',
                label: 'Partner',
              },
            ]}
          />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button disabled={isSending} type="primary" htmlType="submit">
            Create
          </Button>
        </Form.Item>
      </Space>
    </Form>
  );
}
