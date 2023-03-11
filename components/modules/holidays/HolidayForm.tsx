import { Button, DatePicker, Form, Input, Select, Space } from 'antd';
import { FormInstance } from 'antd/lib/form/Form';
import Link from 'next/link';
import { AppRoutes } from '~/models/constants/Routes';

export interface HolidayFormProps {
  form: FormInstance<any> | undefined;
  onFinish: (_values: any) => void;
  button: 'Create' | 'Update';
  isSending: boolean;
}

export function HolidayForm({ form, onFinish, button, isSending }: HolidayFormProps) {
  const { RangePicker } = DatePicker;

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
        <Form.Item label="Name" name="name" rules={[{ required: true, message: 'Please input holiday name!' }]}>
          <Input />
        </Form.Item>
        <Form.Item
          label="Apply date"
          name="applyDate"
          rules={[{ required: true, message: 'Please input apply date!' }]}
        >
          <RangePicker format={'DD/MM/YYYY'} />
        </Form.Item>
        <Form.Item
          label="Paid"
          name="isPaid"
          rules={[{ required: true, message: 'Please select pay or unpay in this holiday!' }]}
        >
          <Select
            showSearch
            allowClear
            onClear={() => form?.setFieldsValue({ isPaid: '' })}
            onChange={(value) => form?.setFieldsValue({ isPaid: value })}
            filterOption={(input, option) => (option?.label ?? '').toLowerCase().includes(input.toLowerCase())}
            options={[
              {
                value: false,
                label: 'No',
              },
              {
                value: true,
                label: 'Yes',
              },
            ]}
          />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button disabled={isSending} type="primary" htmlType="submit">
            {button}
          </Button>
          <Link style={{ marginLeft: '16px' }} href={`/${AppRoutes.holidays}`} passHref>
            <Button type="primary" danger>
              Cancel
            </Button>
          </Link>
        </Form.Item>
      </Space>
    </Form>
  );
}
