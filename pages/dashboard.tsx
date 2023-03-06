import { Col, Progress, Row, Space, Typography } from 'antd';
import getConfig from 'next/config';
import { useEffect, useState } from 'react';
import { dashboardApi } from '~/api-clients/modules/dashboard-api';

import { Seo } from '~/components';
import { ContractChart, CountCard, RevenueChart } from '~/components/modules/dashboard';
import { AppRoutes } from '~/models/constants/Routes';
import { NextPageWithLayout } from '~/models/layouts';
import { Data, Revenue, TotalData } from '~/models/modules/dashboard';

const { serverRuntimeConfig } = getConfig();

const DashboardPage: NextPageWithLayout = () => {
  const [totalData, setTotalData] = useState<TotalData | null>();
  const [revenueData, setRevenueData] = useState<Revenue[]>([]);
  const [payslipPercent, setPayslipPercent] = useState({
    staff: 0,
    partner: 0,
  });
  const [contractData, setContractData] = useState<Data[]>([]);

  useEffect(() => {
    fetchTotalData();
    fetchRevenueData();
    fetchPayslipPercent();
    fetchContractData();
  }, []);

  const fetchTotalData = async () => {
    try {
      const response = await dashboardApi.getTotalData();
      setTotalData(response);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchRevenueData = async () => {
    try {
      const response = await dashboardApi.getRevenueAndCost();
      const reversed = response.slice().reverse();
      setRevenueData(reversed);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchPayslipPercent = async () => {
    try {
      const response = await dashboardApi.getPayslipByType();
      const total = response.reduce((acc, cur) => acc + cur.value, 0);
      setPayslipPercent({
        staff: Math.round(((total - response[1].value) / total) * 100),
        partner: Math.round(((total - response[0].value) / total) * 100),
      });
    } catch (error) {
      console.log(error);
    }
  };

  const fetchContractData = async () => {
    try {
      const response = await dashboardApi.getContractData();
      setContractData(response);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Seo
        data={{
          title: 'Dashboard | OT & Salary Management',
          description: 'Dashboard page',
          url: `${serverRuntimeConfig.HOST_URL}/${AppRoutes.dashboard}`,
        }}
      />

      <Space style={{ width: '100%' }} direction="vertical" size="large">
        <section style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Typography.Title level={3}>Dashboard</Typography.Title>
        </section>

        <section>
          <Row gutter={[16, 16]}>
            <Col span={16}>
              <Row wrap gutter={[8, 16]}>
                {/* Statistic section */}
                <Col span={6}>
                  <CountCard title="Employee" value={totalData?.totalEmps.toString() || '0'} />
                </Col>
                <Col span={6}>
                  <CountCard title="Company" value={totalData?.totalCompanies.toString() || '0'} dotColor="red" />
                </Col>
                <Col span={6}>
                  <CountCard title="Contract" value={totalData?.totalContracts.toString() || '0'} dotColor="blue" />
                </Col>
                <Col span={6}>
                  <CountCard title="Payslip" value={totalData?.totalPayslips.toString() || '0'} dotColor="#f4862f" />
                </Col>

                {/* Revenue Chart */}
                <Col span={24}>
                  <div className="dashboard-section">
                    <Typography.Title level={4} style={{ marginBottom: '24px' }}>
                      Revenue/Cost
                    </Typography.Title>
                    <RevenueChart data={revenueData} />
                  </div>
                </Col>
              </Row>
            </Col>
            <Col span={8}>
              <Space style={{ width: '100%' }} direction="vertical" size="middle">
                {/* Payslip percent */}
                <div className="dashboard-section">
                  <Typography.Title level={4} style={{ marginBottom: '24px' }}>
                    Payslip by Type
                  </Typography.Title>
                  <div>
                    <h4 style={{ margin: '8px 0 2px' }}>Employee</h4>
                    <Progress
                      strokeColor={{ from: '#108ee9', to: '#87d068' }}
                      percent={payslipPercent.staff}
                      format={(percent) => `${percent}%`}
                    />
                  </div>
                  <div>
                    <h4 style={{ margin: '8px 0 2px' }}>Partner</h4>
                    <Progress
                      strokeColor={{ from: '#CC3636', to: '#FFEE63' }}
                      percent={payslipPercent.partner}
                      format={(percent) => `${percent}%`}
                    />
                  </div>
                </div>

                {/* Contract chart */}
                <div className="dashboard-section">
                  <Typography.Title level={4} style={{ marginBottom: '24px' }}>
                    Contract
                  </Typography.Title>
                  <ContractChart data={contractData} />
                </div>
              </Space>
            </Col>
          </Row>
        </section>
      </Space>
    </>
  );
};

export default DashboardPage;
