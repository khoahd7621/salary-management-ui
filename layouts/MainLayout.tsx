import { DashboardOutlined, MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import { Layout, Menu, MenuProps, Space, Typography } from 'antd';
import React, { useEffect, useState } from 'react';

import { LayoutProps } from '~/models/layouts';
import styles from '~/styles/layout/main.module.scss';

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
    <Layout style={{ height: '100vh' }}>
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        breakpoint="lg"
        onBreakpoint={(broken: boolean): void => {
          if (broken) setCollapsed(true);
          else setCollapsed(false);
        }}
        style={{
          overflow: 'auto',
          height: '100vh',
        }}
      >
        <Typography.Title
          level={5}
          style={{
            height: '32px',
            margin: '16px',
            backgroundColor: 'rgba(255, 255, 255, 0.3)',
            color: '#fff',
            fontSize: '14px',
            textAlign: 'center',
            lineHeight: '32px',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}
        >
          OT & Salary
        </Typography.Title>
        <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']} items={items} />
      </Sider>
      <Layout>
        <Header style={{ backgroundColor: '#fff', padding: 0 }}>
          {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
            className: styles['menu-icon'],
            onClick: () => setCollapsed((collapsed) => !collapsed),
          })}
        </Header>
        <Space style={{ overflow: 'auto' }} direction="vertical">
          <Content
            style={{
              backgroundColor: '#fff',
              margin: '0 16px',
              marginTop: '24px',
              padding: '24px',
            }}
          >
            {children}
          </Content>
          <Footer style={{ textAlign: 'center' }}>
            Copyright &#169; {new Date().getFullYear()}. Powered by Secret Billionaire. All right reserved.
          </Footer>
        </Space>
      </Layout>
    </Layout>
  );
};
