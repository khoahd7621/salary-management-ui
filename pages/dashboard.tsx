import { Col, Progress, Row, Space, Typography } from 'antd';
import getConfig from 'next/config';

import { Seo } from '~/components';
import { ContractChart, CountCard, RevenueChart } from '~/components/modules/dashboard';
import { AppRoutes } from '~/models/constants/Routes';
import { NextPageWithLayout } from '~/models/layouts';

const { serverRuntimeConfig } = getConfig();

const DashboardPage: NextPageWithLayout = () => {
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
                  <CountCard title="Employee" value={'200'} />
                </Col>
                <Col span={6}>
                  <CountCard title="Company" value={'200'} dotColor="red" />
                </Col>
                <Col span={6}>
                  <CountCard title="Contract" value={'200'} dotColor="blue" />
                </Col>
                <Col span={6}>
                  <CountCard title="Payslip" value={'200'} dotColor="#f4862f" />
                </Col>

                {/* Revenue Chart */}
                <Col span={24}>
                  <div
                    style={{
                      borderRadius: '6px',
                      padding: '16px 16px 32px',
                      boxShadow: 'rgba(0, 0, 0, 0.1) 0px 0px 5px 0px, rgba(0, 0, 0, 0.1) 0px 0px 1px 0px',
                    }}
                  >
                    <Typography.Title level={4} style={{ marginBottom: '24px' }}>
                      Revenue/Cost
                    </Typography.Title>
                    <RevenueChart />
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
                    <Progress strokeColor={{ from: '#108ee9', to: '#87d068' }} percent={30} />
                  </div>
                  <div>
                    <h4 style={{ margin: '8px 0 2px' }}>Partner</h4>
                    <Progress strokeColor={{ from: '#CC3636', to: '#FFEE63' }} percent={70} />
                  </div>
                </div>

                {/* Contract chart */}
                <div className="dashboard-section">
                  <Typography.Title level={4} style={{ marginBottom: '24px' }}>
                    Contract
                  </Typography.Title>
                  <ContractChart />
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
