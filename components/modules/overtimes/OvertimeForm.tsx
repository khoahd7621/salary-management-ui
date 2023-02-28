import { Button, DatePicker, Form, FormInstance, InputNumber, Space } from 'antd';
import Link from 'next/link';

import { AppRoutes } from '~/models/constants/Routes';
import { Employee } from '~/models/modules/employees';
import { SelectEmployeeModal } from '../contracts';

export interface OvertimeFormProps {
  form: FormInstance<any> | undefined;
  onFinish: (_values: any) => void;
  button: 'Create' | 'Update';
  isSending: boolean;
  employee: Employee | null;
  setEmployee: (_employee: Employee | null) => void;
}

export function OvertimeForm({ form, onFinish, button, isSending, employee, setEmployee }: OvertimeFormProps) {
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
          <SelectEmployeeModal setEmployee={handleSelectEmployee} employeeName={employee?.name || ''} />
        </Form.Item>
        <Form.Item label="Date" name="date" rules={[{ required: true, message: 'Please input date!' }]}>
          <DatePicker format={'DD/MM/YYYY'} />
        </Form.Item>
        <Form.Item label="Hours" name="hours" rules={[{ required: true, message: 'Please input hours!' }]}>
          <InputNumber min={1} max={8} style={{ width: '100%' }} />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button disabled={isSending} type="primary" htmlType="submit">
            {button}
          </Button>
          <Link style={{ marginLeft: '16px' }} href={`/${AppRoutes.overtimes}`} passHref>
            <Button type="primary" danger>
              Cancel
            </Button>
          </Link>
        </Form.Item>
      </Space>
    </Form>
  );
}
