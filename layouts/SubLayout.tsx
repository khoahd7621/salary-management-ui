import { Layout, Space, Typography } from 'antd';

import { LayoutProps } from '~/models/layouts';

export const SubLayout = ({ children }: LayoutProps): React.ReactElement => {
  const { Header, Content, Footer } = Layout;

  return (
    <Space style={{ width: '100%' }} direction="vertical">
      <Layout style={{ minHeight: '100vh' }}>
        <Header style={{ display: 'flex', alignItems: 'center' }}>
          <Typography.Title style={{ color: '#fff', margin: 0 }} level={3}>
            OT & Salary Management
          </Typography.Title>
        </Header>
        <Content style={{ flexGrow: 1 }}>{children}</Content>
        <Footer style={{ backgroundColor: '#001529', textAlign: 'center', color: '#fff' }}>
          Copyright &#169; {new Date().getFullYear()}. Powered by Secret Billionaire. All right reserved.
        </Footer>
      </Layout>
    </Space>
  );
};
