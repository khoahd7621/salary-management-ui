import { DashboardOutlined, MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import { Layout, Menu, MenuProps, Space, Typography } from 'antd';
import React, { useEffect, useState } from 'react';

import { LayoutProps } from '~/models/components/layouts';

type MenuItem = Required<MenuProps>['items'][number];

const getItem = (label: React.ReactNode, key: React.Key, icon?: React.ReactNode, children?: MenuItem[]): MenuItem => ({
  key,
  icon,
  children,
  label,
});

const items: MenuItem[] = [
  getItem('Dashboard', '1', <DashboardOutlined />),
  getItem('Option', '2', <DashboardOutlined />, [getItem('Inner option 1', '3'), getItem('Inner option 2', '4')]),
];

export const MainLayout = ({ children }: LayoutProps): React.ReactElement => {
  const { Header, Content, Sider, Footer } = Layout;

  const [collapsed, setCollapsed] = useState<boolean>(false);

  useEffect(() => {
    if (window.innerWidth < 992) setCollapsed(true);
    else setCollapsed(false);
  }, []);

  return (
    <Layout className="h-screen">
      <Sider
        className="overflow-auto h-screen fixed left-0 top-0 bottom-0"
        trigger={null}
        collapsible
        collapsed={collapsed}
        breakpoint="lg"
        onBreakpoint={(broken: boolean): void => {
          if (broken) setCollapsed(true);
          else setCollapsed(false);
        }}
      >
        <Typography.Title
          level={5}
          className="h-8 m-4 bg-[#ffffff4d] !text-white !text-sm text-center !leading-8 text-ellipsis overflow-hidden"
        >
          OT & Salary
        </Typography.Title>
        <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']} items={items} />
      </Sider>
      <Layout>
        <Header className="!bg-white !p-0">
          {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
            className:
              'py-0 px-6 text-xl leading-[64px] cursor-pointer transition-colors duration-300 hover:text-[#1890ff]',
            onClick: () => setCollapsed((collapsed) => !collapsed),
          })}
        </Header>
        <Space className="overflow-auto" direction="vertical">
          <Content className="bg-white mt-6 mx-4 p-6">{children}</Content>
          <Footer className="text-center">
            Copyright &#169; {new Date().getFullYear()}. Powered by Secret Billionaire. All right reserved.
          </Footer>
        </Space>
      </Layout>
    </Layout>
  );
};
