import { Layout, Space, Typography } from 'antd';

import { LayoutProps } from '~/models/components/layouts';

export const SubLayout = ({ children }: LayoutProps): React.ReactElement => {
  const { Header, Content, Footer } = Layout;

  return (
    <Space className="w-full" direction="vertical">
      <Layout className="min-h-screen">
        <Header className="flex items-center">
          <Typography.Title className="!text-white !m-0" level={3}>
            OT & Salary Management
          </Typography.Title>
        </Header>
        <Content className="flex-grow">{children}</Content>
        <Footer className="!bg-gray-900 !text-white text-center">
          Copyright &#169; {new Date().getFullYear()}. Powered by Secret Billionaire. All right reserved.
        </Footer>
      </Layout>
    </Space>
  );
};
