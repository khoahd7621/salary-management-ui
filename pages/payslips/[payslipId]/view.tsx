import { PDFDownloadLink } from '@react-pdf/renderer';
import { Button, message, Space, Typography } from 'antd';
import dayjs from 'dayjs';
import getConfig from 'next/config';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import { payslipApi } from '~/api-clients/modules/payslip-api';
import { Seo } from '~/components';
import { Payslip, PayslipPdf } from '~/components/modules/payslips';
import { AppRoutes } from '~/models/constants/Routes';
import { Payslip as PayslipModel } from '~/models/modules/payslips';

const { serverRuntimeConfig } = getConfig();

export default function ViewPayslipPage() {
  const router = useRouter();
  const { payslipId } = router.query;

  const [loading, setLoading] = useState<boolean>(true);
  const [payslip, setPayslip] = useState<PayslipModel | null>(null);

  useEffect(() => {
    if (payslipId) {
      fetchData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [payslipId]);

  const fetchData = async () => {
    try {
      const response = await payslipApi.getById(payslipId as string);
      setPayslip(response);
    } catch (error) {
      await router.push(`/${AppRoutes.payslips}`);
      await message.error('Opps, something went wrong!', 3);
    }
    setLoading(false);
  };

  const fileName = `payslip_${payslip?.paidType.toLowerCase()}_${payslip?.contract.employee.name
    .toLowerCase()
    .replace(' ', '-')}_${payslip?.contract.partner.companyName.toLocaleLowerCase().replace(' ', '-')}_${dayjs(
    payslip?.paidDate
  )
    .format('MMMM YYYY')
    .toLocaleLowerCase()
    .replace(' ', '-')}.pdf`;

  return (
    <>
      <Seo
        data={{
          title: 'Payslip | OT & Salary Management',
          description: 'Payslip page',
          url: `${serverRuntimeConfig.HOST_URL}/${AppRoutes.payslips}/${payslipId}/view`,
        }}
      />

      {loading ? (
        <div>Loading ...</div>
      ) : (
        <Space style={{ width: '100%' }} direction="vertical" size="middle">
          <section style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Typography.Title level={3}>Payslip</Typography.Title>

            {payslip && (
              <PDFDownloadLink document={<PayslipPdf data={payslip} />} fileName={fileName}>
                {({ loading }) => (loading ? 'Loading export pdf...' : 'Export PDF file!')}
              </PDFDownloadLink>
            )}
          </section>

          <section>
            <Payslip data={payslip as PayslipModel} />
          </section>

          <section style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Link href={`/${AppRoutes.payslips}`} passHref>
              <Button type="primary">Back</Button>
            </Link>
          </section>
        </Space>
      )}
    </>
  );
}
