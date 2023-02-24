import { Button, DatePicker, Form, Input, Space } from 'antd';
import { FormInstance } from 'antd/lib/form/Form';
import Link from 'next/link';
import UploadImage from '~/components/UploadImage';
import { Regex } from '~/models/constants/Regex';

export interface EmployeeFormProps {
  form: FormInstance<any> | undefined;
  onFinish: (_values: any) => void;
  image: any;
  setImage: (_image: any) => void;
  isSending: boolean;
  button: 'Create' | 'Update';
}

export function EmployeeForm({ form, onFinish, image, setImage, isSending, button }: EmployeeFormProps) {
  const handleSetImageUrl = (image: any) => {
    setImage(image);
    form?.setFieldsValue({ image: image?.preview });
  };

  return (
    <Form
      form={form}
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      style={{ maxWidth: 600 }}
      initialValues={{ remember: true }}
      onFinish={onFinish}
      autoComplete="off"
    >
      <Form.Item label="Employee Id" name="employeeId" hidden />
      <Space style={{ width: '100%' }} direction="vertical">
        <Form.Item
          label="Name"
          name="employeeName"
          rules={[{ required: true, message: 'Please input employee name!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Date of birth"
          name="dateOfBirth"
          rules={[{ required: true, message: 'Please input date of birth' }]}
        >
          <DatePicker format={['DD/MM/YYYY']} />
        </Form.Item>
        <Form.Item label="Image" name="image" rules={[{ required: true, message: 'Please add an image' }]}>
          <UploadImage image={image} setImage={handleSetImageUrl} />
        </Form.Item>
        <Form.Item
          label="Address"
          name="address"
          rules={[
            { required: true, message: 'Please input an address' },
            { max: 255, message: 'Address is maximum 255 characters' },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Identify number"
          name="identifyNumber"
          rules={[
            { required: true, message: 'Please input identity number' },
            {
              pattern: new RegExp(Regex.VIETNAM_IDENTIFY_NUMBER),
              message: 'Identity number is not valid',
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Phone"
          name="phoneNumber"
          rules={[
            { required: true, message: 'Please input employee phone number' },
            {
              pattern: new RegExp(Regex.VIETNAM_PHONE_NUMBER),
              message: 'Phone number is not valid',
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button disabled={isSending} type="primary" htmlType="submit">
            {button}
          </Button>
          <Link style={{ marginLeft: '16px' }} href="/employees" passHref>
            <Button type="primary" danger>
              Cancel
            </Button>
          </Link>
        </Form.Item>
      </Space>
    </Form>
  );
}
