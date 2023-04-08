import { Button, DatePicker, Form, InputNumber, message, Modal, Space } from 'antd';
import { Dayjs } from 'dayjs';
import { useState } from 'react';

import { overtimeApi } from '~/api-clients/modules/overtime-api';

export interface LogOTModelProps {
  employeeId: string;
  setEmployeeId: (_employeeId: string) => void;
  handleAfterSubmitSuccess?: () => Promise<void>;
}

export function LogOTModal({ employeeId, setEmployeeId, handleAfterSubmitSuccess }: LogOTModelProps) {
  const [form] = Form.useForm();
  const [isSending, setIsSending] = useState(false);

  const handleSubmitForm = async (values: { date: Dayjs; hours: number }) => {
    setIsSending(true);
    try {
      await overtimeApi.create({
        employeeId,
        overtimeDate: values.date.endOf('day').toISOString(),
        hours: values.hours,
      });
      form.resetFields();
      message.success('Log OT successfully!');
      setEmployeeId('');
      if (handleAfterSubmitSuccess) {
        await handleAfterSubmitSuccess();
      }
    } catch (error: any) {
      console.log(error);
      if (error?.response?.status === 400) {
        message.error("Can't log OT for future date!");
      } else {
        message.error('Something went wrong. Please try again later.');
      }
    }
    setIsSending(false);
  };

  return (
    <Modal
      title="Log OT"
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

          <Form.Item wrapperCol={{ offset: 6, span: 18 }}>
            <Space>
              <Button disabled={isSending} type="primary" htmlType="submit">
                Log OT
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
