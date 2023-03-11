import { uuidv4 } from '@firebase/util';
import { message, Space, Typography } from 'antd';
import { useForm } from 'antd/lib/form/Form';
import { initializeApp } from 'firebase/app';
import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage';
import getConfig from 'next/config';
import { useRouter } from 'next/router';
import { useState } from 'react';

import { contractApi } from '~/api-clients/modules/contract-api';
import { Seo } from '~/components';
import { ContractForm } from '~/components/modules/contracts';
import { firebaseConfig } from '~/firebaseconfig';
import { AppRoutes } from '~/models/constants/Routes';
import { Company } from '~/models/modules/companies';
import { CreatePayload, FormData, SalaryType, Type } from '~/models/modules/contracts';
import { Employee } from '~/models/modules/employees';

const { serverRuntimeConfig } = getConfig();

export default function CreateContractPage() {
  const router = useRouter();
  const [form] = useForm();
  const [loading, setLoading] = useState<boolean>(false);
  const [file, setFile] = useState<any>(null);
  const [company, setCompany] = useState<Company | null>(null);
  const [employee, setEmployee] = useState<Employee | null>(null);

  const onFinish = async (data: FormData) => {
    setLoading(true);
    try {
      const app = initializeApp(firebaseConfig);

      const storage = getStorage(app);
      const fileRef = ref(storage, `files/${file.name + '-salt-' + uuidv4()}`);

      const uploadResult = await uploadBytes(fileRef, file);
      const fileUrl = await getDownloadURL(uploadResult.ref);

      const payload: CreatePayload = {
        file: fileUrl,
        startDate: data.applyDate[0].endOf('day').toISOString(),
        endDate: data.applyDate[1].endOf('day').toISOString(),
        job: data.job,
        basicSalary: data.basicSalary,
        salaryType: SalaryType[Number(data.salaryType)],
        bhxh: data.bhxh,
        bhyt: data.bhyt,
        bhtn: data.bhtn,
        tax: data.tax,
        partnerId: data.companyId,
        partnerPrice: data.companyPrice,
        employeeId: data.employeeId,
        contractType: Type[Number(data.type)],
      };
      await contractApi.create(payload);
      await router.push(`/${AppRoutes.contracts}`);
      await message.success('Contract created successfully!', 3);
    } catch (error) {
      message.error('Something went wrong! Please refresh the page and try again!');
    }
    setLoading(false);
  };

  return (
    <>
      <Seo
        data={{
          title: 'Create contract | OT & Salary Management',
          description: 'Create contract page',
          url: `${serverRuntimeConfig.HOST_URL}/${AppRoutes.contracts}/create`,
        }}
      />
      <Space style={{ width: '100%' }} direction="vertical" size="middle">
        <section style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Typography.Title level={3}>Create new contract</Typography.Title>
        </section>

        <section>
          <ContractForm
            form={form}
            button="Create"
            company={company}
            setCompany={setCompany}
            employee={employee}
            setEmployee={setEmployee}
            file={file}
            setFile={setFile}
            isSending={loading}
            onFinish={onFinish}
          />
        </section>
      </Space>
    </>
  );
}
