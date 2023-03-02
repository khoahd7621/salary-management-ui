import { Button, DatePicker, Form, FormInstance, Input, Space } from 'antd';
import Link from 'next/link';

import { AppRoutes } from '~/models/constants/Routes';
import { Employee } from '~/models/modules/employees';
import { SelectEmployeeModal } from '../contracts';

export interface LeaveFormProps {
  form: FormInstance<any> | undefined;
  onFinish: (_values: any) => void;
  button: 'Create' | 'Update';
  isSending: boolean;
  employee: Employee | null;
  setEmployee: (_employee: Employee | null) => void;
}

export function LeaveForm({ form, onFinish, button, isSending, employee, setEmployee }: LeaveFormProps) {
  const { RangePicker } = DatePicker;
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
      onFinish={onFinish}
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
        <Form.Item label="Apply date" name="applyDate" rules={[{ required: true, message: 'Please input date!' }]}>
          <RangePicker format={'DD/MM/YYYY'} />
        </Form.Item>
        <Form.Item label="Reason" name="reason" rules={[{ required: true, message: 'Please input reason!' }]}>
          <Input />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button disabled={isSending} type="primary" htmlType="submit">
            {button}
          </Button>
          <Link style={{ marginLeft: '16px' }} href={`/${AppRoutes.leaves}`} passHref>
            <Button type="primary" danger>
              Cancel
            </Button>
          </Link>
        </Form.Item>
      </Space>
    </Form>
  );
}
