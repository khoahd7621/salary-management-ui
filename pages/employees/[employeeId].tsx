import { uuidv4 } from '@firebase/util';
import { Form, message, Space, Typography } from 'antd';
import dayjs from 'dayjs';
import { initializeApp } from 'firebase/app';
import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage';
import getConfig from 'next/config';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import { employeeApi } from '~/api-clients/modules/employee-api';
import { Seo } from '~/components';
import { EmployeeForm } from '~/components/modules/employees';
import { firebaseConfig } from '~/firebaseconfig';
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
    if (employeeId) fetchEmployee();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [employeeId]);

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
      setOldImageUrl(employee.image);
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
          <EmployeeForm
            button="Update"
            form={form}
            onFinish={onFinish}
            isSending={sending}
            image={image}
            setImage={setImage}
          />
        )}
      </Space>
    </>
  );
}
