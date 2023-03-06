import { uuidv4 } from '@firebase/util';
import { Form, message, Space, Typography } from 'antd';
import { initializeApp } from 'firebase/app';
import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage';
import getConfig from 'next/config';
import { useRouter } from 'next/router';
import { useState } from 'react';

import { employeeApi } from '~/api-clients/modules/employee-api';
import { Seo } from '~/components';
import { EmployeeForm } from '~/components/modules/employees';
import { firebaseConfig } from '~/firebaseconfig';
import { CreateForm } from '~/models/modules/employees';

const { serverRuntimeConfig } = getConfig();

export default function CreateEmployeePage() {
  const router = useRouter();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState<boolean>(false);
  const [image, setImage] = useState<any>(null);

  const onFinish = async (data: CreateForm) => {
    setLoading(true);
    try {
      const app = initializeApp(firebaseConfig);

      const storage = getStorage(app);
      const imageRef = ref(storage, `images/${image.name + '-' + uuidv4()}`);

      const uploadResult = await uploadBytes(imageRef, image.originFileObj);
      const imageUrl = await getDownloadURL(uploadResult.ref);

      await employeeApi.create({ ...data, image: imageUrl, dateOfBirth: data.dateOfBirth.endOf('day').toISOString() });
      await router.push('/employees');
      await message.success('Create employee successfully!');
    } catch (error) {
      console.log(error);
      message.error('Something went wrong! Please refresh the page and try again!');
    }
    setLoading(false);
  };

  return (
    <>
      <Seo
        data={{
          title: 'Create Employee | OT & Salary Management',
          description: 'Create employee page',
          url: `${serverRuntimeConfig.HOST_URL}/employees/create`,
        }}
      />
      <Space style={{ width: '100%' }} direction="vertical" size="middle">
        <section style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Typography.Title level={3}>Create new employee</Typography.Title>
        </section>

        <section>
          <EmployeeForm
            button="Create"
            form={form}
            onFinish={onFinish}
            isSending={loading}
            image={image}
            setImage={setImage}
          />
        </section>
      </Space>
    </>
  );
}
