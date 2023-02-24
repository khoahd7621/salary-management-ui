import { uuidv4 } from '@firebase/util';
import { Button, DatePicker, Form, Input, InputNumber, message, Select, Space, Typography } from 'antd';
import { useForm } from 'antd/lib/form/Form';
import dayjs from 'dayjs';
import { initializeApp } from 'firebase/app';
import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage';
import getConfig from 'next/config';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import { contractApi } from '~/api-clients/modules/contract-api';
import { Seo, UploadFiles } from '~/components';
import { SelectCompanyModal, SelectEmployeeModal } from '~/components/modules/contracts';
import { firebaseConfig } from '~/firebaseconfig';
import { Regex } from '~/models/constants/Regex';
import { AppRoutes } from '~/models/constants/Routes';
import { Company } from '~/models/modules/companies';
import { SalaryType, Type, UpdateForm, UpdatePayload } from '~/models/modules/contracts';
import { Employee } from '~/models/modules/employees';
import { formatFileName } from '~/utils/format';

const { serverRuntimeConfig } = getConfig();

export default function EditContractPage() {
  const router = useRouter();
  const { contractId } = router.query;
  const { RangePicker } = DatePicker;
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
        id: contract.contractId,
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

  const onFinish = async (data: UpdateForm) => {
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
        id: data.id,
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

  const handleSelectCompany = (company: Company | null) => {
    if (company) {
      setCompany(company);
      form.setFieldsValue({ companyId: company.companyId });
    } else {
      setCompany(null);
      form.setFieldsValue({ companyId: '' });
    }
  };

  const handleSelectEmployee = (employee: Employee | null) => {
    if (employee) {
      setEmployee(employee);
      form.setFieldsValue({ employeeId: employee.employeeId });
    } else {
      setCompany(null);
      form.setFieldsValue({ employeeId: '' });
    }
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
            <Form
              form={form}
              labelCol={{ span: 8 }}
              wrapperCol={{ span: 16 }}
              style={{ maxWidth: 600 }}
              initialValues={{ remember: true }}
              onFinish={onFinish}
              autoComplete="off"
            >
              <Space style={{ width: '100%' }} direction="vertical">
                <Form.Item name="id" hidden>
                  <Input />
                </Form.Item>
                <Form.Item label="File" name="file" rules={[{ required: true, message: 'Please add contract file!' }]}>
                  <UploadFiles
                    file={file}
                    setFile={(file) => {
                      if (file) {
                        setFile(file);
                        form.setFieldsValue({ file: file.name });
                      } else {
                        setFile(null);
                        form.setFieldsValue({ file: '' });
                      }
                    }}
                  />
                </Form.Item>
                <Form.Item
                  label="Apply date"
                  name="applyDate"
                  rules={[{ required: true, message: 'Please input apply date!' }]}
                >
                  <RangePicker format={'DD/MM/YYYY'} />
                </Form.Item>
                <Form.Item
                  label="Job title"
                  name="job"
                  rules={[{ required: true, message: 'Please input job title!' }]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  label="Basic salary"
                  name="basicSalary"
                  rules={[{ required: true, message: 'Please input basic salary!' }]}
                >
                  <InputNumber
                    formatter={(value) => `${value}`.replace(Regex.COMMAS_SEPARATED_NUMBER, ',')}
                    addonAfter="VNĐ"
                    min={0}
                    max={1000000000}
                    style={{ width: '100%' }}
                  />
                </Form.Item>
                <Form.Item
                  label="Salary type"
                  name="salaryType"
                  rules={[{ required: true, message: 'Please select salary type!' }]}
                >
                  <Select
                    showSearch
                    placeholder="Select salary type"
                    allowClear
                    onClear={() => form.setFieldsValue({ salaryType: '' })}
                    onChange={(value) => form.setFieldsValue({ salaryType: value })}
                    filterOption={(input, option) => (option?.label ?? '').toLowerCase().includes(input.toLowerCase())}
                    options={[
                      {
                        value: SalaryType.Gross,
                        label: 'Gross',
                      },
                      {
                        value: SalaryType.Net,
                        label: 'Net',
                      },
                    ]}
                  />
                </Form.Item>
                <Form.Item
                  label="BHXH"
                  name="bhxh"
                  rules={[{ required: true, message: 'Please input price of BHXH!' }]}
                >
                  <InputNumber
                    formatter={(value) => `${value}`.replace(Regex.COMMAS_SEPARATED_NUMBER, ',')}
                    addonAfter="VNĐ"
                    min={0}
                    max={1000000000}
                    style={{ width: '100%' }}
                  />
                </Form.Item>
                <Form.Item
                  label="BHYT"
                  name="bhyt"
                  rules={[{ required: true, message: 'Please input price of BHYT!' }]}
                >
                  <InputNumber
                    formatter={(value) => `${value}`.replace(Regex.COMMAS_SEPARATED_NUMBER, ',')}
                    addonAfter="VNĐ"
                    min={0}
                    max={1000000000}
                    style={{ width: '100%' }}
                  />
                </Form.Item>
                <Form.Item
                  label="BHTN"
                  name="bhtn"
                  rules={[{ required: true, message: 'Please input price of BHTN!' }]}
                >
                  <InputNumber
                    formatter={(value) => `${value}`.replace(Regex.COMMAS_SEPARATED_NUMBER, ',')}
                    addonAfter="VNĐ"
                    min={0}
                    max={1000000000}
                    style={{ width: '100%' }}
                  />
                </Form.Item>
                <Form.Item noStyle>
                  <Form.Item
                    label="Company"
                    name="companyId"
                    rules={[{ required: true, message: 'Please select a company!' }]}
                  >
                    <SelectCompanyModal setCompany={handleSelectCompany} companyName={company?.companyName || ''} />
                  </Form.Item>
                </Form.Item>
                <Form.Item
                  label="Company price"
                  name="companyPrice"
                  rules={[{ required: true, message: 'Please enter company price!' }]}
                >
                  <InputNumber
                    formatter={(value) => `${value}`.replace(Regex.COMMAS_SEPARATED_NUMBER, ',')}
                    addonAfter="VNĐ"
                    min={0}
                    max={1000000000}
                    style={{ width: '100%' }}
                  />
                </Form.Item>
                <Form.Item
                  label="Employee"
                  name="employeeId"
                  rules={[{ required: true, message: 'Please select an employee!' }]}
                >
                  <SelectEmployeeModal setEmployee={handleSelectEmployee} employeeName={employee?.name || ''} />
                </Form.Item>
                <Form.Item
                  label="Type"
                  name="type"
                  rules={[{ required: true, message: 'Please select contract type!' }]}
                >
                  <Select
                    showSearch={true}
                    placeholder="Select contract type"
                    allowClear={true}
                    onClear={() => form.setFieldsValue({ type: '' })}
                    onChange={(value) => form.setFieldsValue({ type: value })}
                    filterOption={(input, option) => (option?.label ?? '').toLowerCase().includes(input.toLowerCase())}
                    options={[
                      {
                        value: Type.FullTime,
                        label: 'Full-time',
                      },
                      {
                        value: Type.Internship,
                        label: 'Internship',
                      },
                      {
                        value: Type.PartTime,
                        label: 'Part-time',
                      },
                      {
                        value: Type.Temporary,
                        label: 'Temporary',
                      },
                    ]}
                  />
                </Form.Item>

                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                  <Button disabled={sending} type="primary" htmlType="submit">
                    Edit
                  </Button>
                  <Link style={{ marginLeft: '16px' }} href={`/${AppRoutes.contracts}`} passHref>
                    <Button type="primary" danger>
                      Cancel
                    </Button>
                  </Link>
                </Form.Item>
              </Space>
            </Form>
          )}
        </section>
      </Space>
    </>
  );
}
