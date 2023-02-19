import { uuidv4 } from '@firebase/util';
import { Button, DatePicker, Form, Input, message, Space, Typography } from 'antd';
import dayjs from 'dayjs';
import { initializeApp } from 'firebase/app';
import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage';
import getConfig from 'next/config';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import { employeeApi } from '~/api-clients/modules/employee-api';
import { Seo } from '~/components';
import UploadImage from '~/components/UploadImage';
import { firebaseConfig } from '~/firebaseconfig';
import { Regex } from '~/models/constants/Regex';
import { UpdateForm } from '~/models/modules/employees/UpdateForm';

const { serverRuntimeConfig } = getConfig();

export default function EditEmployeePage() {
  const router = useRouter();
  const { employeeId } = router.query;
  const [form] = Form.useForm();
  const [sending, setSending] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [oldImageUrl, setOldImageUrl] = useState<string>('');
  const [image, setImage] = useState<any>(null);

  useEffect(() => {
    fetchEmployee();
  }, []);

  const fetchEmployee = async () => {
    try {
      const employee = await employeeApi.getById(employeeId as string);
      form.setFieldsValue({
        employeeId: employee.employeeId,
        employeeName: employee.name,
        dateOfBirth: dayjs(employee.dateOfBirth),
        image: employee.image,
        address: employee.address,
        identifyNumber: employee.identifyNumber,
        phoneNumber: employee.phoneNumber,
      });
      setImage({ preview: employee.image });
      setOldImageUrl(employee.image as string);
    } catch (error) {
      console.log(error);
      await router.push('/employees');
      message.error('Something went wrong! Please refresh the page and try again!');
    }
    setLoading(false);
  };

  const onFinish = async (data: UpdateForm) => {
    setSending(true);
    try {
      if (image && image.preview !== oldImageUrl) {
        const app = initializeApp(firebaseConfig);

        const storage = getStorage(app);
        const imageRef = ref(storage, `images/${image.name + '-' + uuidv4()}`);

        const uploadResult = await uploadBytes(imageRef, image.originFileObj);
        const imageUrl = await getDownloadURL(uploadResult.ref);

        await employeeApi.update({ ...data, image: imageUrl, dateOfBirth: data.dateOfBirth.toISOString() });
      } else {
        await employeeApi.update({ ...data, image: oldImageUrl, dateOfBirth: data.dateOfBirth.toISOString() });
      }
      await router.push('/employees');
      await message.success('Update employee successfully!');
    } catch (error) {
      console.log(error);
      message.error('Something went wrong! Please refresh the page and try again!');
    }
    setSending(false);
  };

  const handleSetImageUrl = (image: any) => {
    setImage(image);
    form.setFieldsValue({ image: image?.preview });
  };

  return (
    <>
      <Seo
        data={{
          title: 'Edit Employee | OT & Salary Management',
          description: 'Edit employee page',
          url: `${serverRuntimeConfig.HOST_URL}/employees/${employeeId}`,
        }}
      />
      <Space style={{ width: '100%' }} direction="vertical" size="middle">
        <section style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Typography.Title level={3}>Create new employee</Typography.Title>
        </section>

        {loading ? (
          <div>Loading ...</div>
        ) : (
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
                <Button disabled={sending} type="primary" htmlType="submit">
                  Edit
                </Button>
                <Link style={{ marginLeft: '16px' }} href="/employees" passHref>
                  <Button type="primary" danger>
                    Cancel
                  </Button>
                </Link>
              </Form.Item>
            </Space>
          </Form>
        )}
      </Space>
    </>
  );
}
