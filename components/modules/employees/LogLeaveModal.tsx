import { Button, DatePicker, Form, Input, InputNumber, message, Modal, Space } from 'antd';
import { Dayjs } from 'dayjs';
import { useState } from 'react';
import { leaveApi } from '~/api-clients/modules/leave-api';

export interface LogLeaveModelProps {
  employeeId: string;
  setEmployeeId: (_employeeId: string) => void;
}

export function LogLeaveModal({ employeeId, setEmployeeId }: LogLeaveModelProps) {
  const [form] = Form.useForm();
  const [isSending, setIsSending] = useState(false);

  const handleSubmitForm = async (values: { date: Dayjs; hours: number; reason: string }) => {
    setIsSending(true);
    try {
      await leaveApi.create({
        employeeId,
        startDate: values.date.endOf('day').toISOString(),
        endDate: values.date.endOf('day').toISOString(),
        reason: values.reason,
      });
      form.resetFields();
      message.success('Log leave successfully!');
      setEmployeeId('');
    } catch (error: any) {
      console.log(error);
      if (error?.response?.status === 400) {
        message.error(error.response.data);
      } else {
        message.error('Something went wrong. Please try again later.');
      }
    }
    setIsSending(false);
  };

  return (
    <Modal
      title="Log Leave"
      open={Boolean(employeeId)}
      onCancel={() => {
        setEmployeeId('');
        form.resetFields();
      }}
      footer={null}
    >
      <Form
        form={form}
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 18 }}
        style={{ maxWidth: 600 }}
        onFinish={handleSubmitForm}
        autoComplete="off"
      >
        <Space style={{ width: '100%' }} direction="vertical">
          <Form.Item label="Date" name="date" rules={[{ required: true, message: 'Please input date!' }]}>
            <DatePicker format={'DD/MM/YYYY'} />
          </Form.Item>
          <Form.Item label="Hours" name="hours" rules={[{ required: true, message: 'Please input hours!' }]}>
            <InputNumber min={1} max={8} style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item label="Reason" name="reason" rules={[{ required: true, message: 'Please input reason!' }]}>
            <Input />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 6, span: 18 }}>
            <Space>
              <Button disabled={isSending} type="primary" htmlType="submit">
                Log Leave
              </Button>
              <Button
                type="primary"
                danger
                onClick={() => {
                  setEmployeeId('');
                  form.resetFields();
                }}
              >
                Cancel
              </Button>
            </Space>
          </Form.Item>
        </Space>
      </Form>
    </Modal>
  );
}
