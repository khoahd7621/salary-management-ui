import { uuidv4 } from '@firebase/util';
import { message, Space, Typography } from 'antd';
import { useForm } from 'antd/lib/form/Form';
import dayjs from 'dayjs';
import { initializeApp } from 'firebase/app';
import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage';
import getConfig from 'next/config';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import { contractApi } from '~/api-clients/modules/contract-api';
import { Seo } from '~/components';
import { ContractForm } from '~/components/modules/contracts';
import { firebaseConfig } from '~/firebaseconfig';
import { AppRoutes } from '~/models/constants/Routes';
import { Company } from '~/models/modules/companies';
import { FormData, SalaryType, Type, UpdatePayload } from '~/models/modules/contracts';
import { Employee } from '~/models/modules/employees';
import { formatFileName } from '~/utils/format';

const { serverRuntimeConfig } = getConfig();

export default function EditContractPage() {
  const router = useRouter();
  const { contractId } = router.query;
  const [form] = useForm();
  const [loading, setLoading] = useState<boolean>(true);
  const [sending, setSending] = useState<boolean>(false);
  const [file, setFile] = useState<any>(null);
  const [oldFileUrl, setOldFileUrl] = useState<string>('');
  const [company, setCompany] = useState<Company | null>(null);
  const [employee, setEmployee] = useState<Employee | null>(null);

  useEffect(() => {
    if (contractId) {
      fetchContract();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [contractId]);

  const fetchContract = async () => {
    try {
      const contract = await contractApi.getById(contractId as string);
      form.setFieldsValue({
        file: contract.file,
        applyDate: [dayjs(contract.startDate), dayjs(contract.endDate)],
        job: contract.job,
        basicSalary: contract.basicSalary,
        salaryType: contract.salaryType,
        bhxh: contract.bhxh,
        bhyt: contract.bhyt,
        bhtn: contract.bhtn,
        companyId: contract.partnerId,
        companyPrice: contract.partnerPrice,
        employeeId: contract.employeeId,
        type: contract.contractType,
      });
      setCompany(contract.partner);
      setEmployee(contract.employee);
      setFile({ name: formatFileName.splitFileName(contract.file) });
      setOldFileUrl(contract.file);
    } catch (error) {
      console.log(error);
      await router.push(`/${AppRoutes.contracts}`);
      message.error('Something went wrong! Please refresh the page and try again!');
    }
    setLoading(false);
  };

  const onFinish = async (data: FormData) => {
    setSending(true);
    try {
      let fileUrl = oldFileUrl;
      if (file && file.uid) {
        const app = initializeApp(firebaseConfig);

        const storage = getStorage(app);
        const fileRef = ref(storage, `files/${file.name + '-salt-' + uuidv4()}`);

        const uploadResult = await uploadBytes(fileRef, file);
        fileUrl = await getDownloadURL(uploadResult.ref);
      }

      const payload: UpdatePayload = {
        id: contractId as string,
        file: fileUrl,
        startDate: data.applyDate[0].toISOString(),
        endDate: data.applyDate[1].toISOString(),
        job: data.job,
        basicSalary: data.basicSalary,
        salaryType: SalaryType[Number(data.salaryType)],
        bhxh: data.bhxh,
        bhyt: data.bhyt,
        bhtn: data.bhtn,
        partnerId: data.companyId,
        partnerPrice: data.companyPrice,
        employeeId: data.employeeId,
        contractType: Type[Number(data.type)],
      };
      await contractApi.update(payload);
      await router.push(`/${AppRoutes.contracts}`);
      await message.success('Contract edited successfully!', 3);
    } catch (error) {
      message.error('Something went wrong! Please refresh the page and try again!');
    }
    setSending(false);
  };

  return (
    <>
      <Seo
        data={{
          title: 'Update contract | OT & Salary Management',
          description: 'Update contract page',
          url: `${serverRuntimeConfig.HOST_URL}/${AppRoutes.contracts}/${contractId}`,
        }}
      />
      <Space style={{ width: '100%' }} direction="vertical" size="middle">
        <section style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Typography.Title level={3}>Update contract</Typography.Title>
        </section>

        <section>
          {loading ? (
            <div>Loading...</div>
          ) : (
            <ContractForm
              form={form}
              button="Update"
              company={company}
              setCompany={setCompany}
              employee={employee}
              setEmployee={setEmployee}
              file={file}
              setFile={setFile}
              isSending={sending}
              onFinish={onFinish}
            />
          )}
        </section>
      </Space>
    </>
  );
}
