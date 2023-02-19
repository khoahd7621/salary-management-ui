import {
  DashboardOutlined,
  DownOutlined,
  FileDoneOutlined,
  GlobalOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  MoneyCollectOutlined,
  NodeExpandOutlined,
  ScheduleOutlined,
  SmileOutlined,
  TeamOutlined,
  CalendarOutlined,
} from '@ant-design/icons';
import { Button, Dropdown, Layout, Menu, MenuProps, message, Space, Typography } from 'antd';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

import { AuthPage } from '~/components';
import { useAuth } from '~/hooks';
import { LayoutProps } from '~/models/layouts';

import styles from '~/styles/layout/main.module.scss';

type MenuItem = Required<MenuProps>['items'][number];

type CurrentItem = {
  index: number;
  key: string;
};

export const MainLayout = ({ children }: LayoutProps): React.ReactElement => {
  const router = useRouter();
  const { Header, Content, Sider, Footer } = Layout;
  const { logout } = useAuth();

  const [isSending, setIsSending] = useState<boolean>(false);
  const [collapsed, setCollapsed] = useState<boolean>(false);
  const [currentMenuItem, setCurrentMenuItem] = useState<CurrentItem>({
    index: 0,
    key: '',
  });

  const getItem = (
    label: React.ReactNode,
    key: React.Key,
    icon?: React.ReactNode,
    children?: MenuItem[]
  ): MenuItem => ({
    key,
    icon,
    children,
    label,
  });

  const itemsMenu: MenuItem[] = [
    getItem(
      'Dashboard',
      '/dashboard',
      <Link href="/dashboard" passHref>
        <DashboardOutlined />
      </Link>
    ),
    getItem(
      'Manage Companies',
      '/companies',
      <Link href="/companies" passHref>
        <GlobalOutlined />
      </Link>
    ),
    getItem(
      'Manage Employees',
      '/employees',
      <Link href="/employees" passHref>
        <TeamOutlined />
      </Link>
    ),
    getItem(
      'Manage Holidays',
      '/holidays',
      <Link href="/holidays" passHref>
        <CalendarOutlined />
      </Link>
    ),
    getItem(
      'Manage Contracts',
      '/contracts',
      <Link href="/contracts" passHref>
        <FileDoneOutlined />
      </Link>
    ),
    getItem(
      'Log OT',
      '/overtimes',
      <Link href="/overtimes" passHref>
        <NodeExpandOutlined />
      </Link>
    ),
    getItem(
      'Log Leave',
      '/leaves',
      <Link href="/leaves" passHref>
        <ScheduleOutlined />
      </Link>
    ),
    getItem(
      'Create Salary',
      '/salaries',
      <Link href="/salaries" passHref>
        <MoneyCollectOutlined />
      </Link>
    ),
  ];

  const items: MenuProps['items'] = [
    {
      key: '1',
      label: (
        <Button
          disabled={isSending}
          onClick={() => {
            setIsSending(true);
            logout();
            message.success({
              content: 'Logout successfully',
              duration: 3,
            });
            setIsSending(false);
          }}
          style={{ width: '100%', border: 'none' }}
        >
          <SmileOutlined />
          Logout
        </Button>
      ),
    },
  ];

  useEffect(() => {
    if (window.innerWidth < 992) setCollapsed(true);
    else setCollapsed(false);
  }, []);

  useEffect(() => {
    for (let i = 0; i < itemsMenu.length; i++) {
      if (itemsMenu[i]?.key === router.asPath) {
        setCurrentMenuItem({
          index: i,
          key: `${itemsMenu[i]?.key}`,
        });
        return;
      }
    }
  }, [router.asPath]);

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
        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={[`${currentMenuItem.key}`]}
          defaultSelectedKeys={[`${currentMenuItem.key}`]}
          items={itemsMenu}
        />
      </Sider>
      <Layout>
        <Header
          style={{
            backgroundColor: '#fff',
            padding: '0 16px 0 0',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
            className: styles['menu-icon'],
            onClick: () => setCollapsed((collapsed) => !collapsed),
          })}

          <Dropdown menu={{ items }}>
            <a onClick={(e) => e.preventDefault()}>
              <Space>
                Welcome to system
                <DownOutlined />
              </Space>
            </a>
          </Dropdown>
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
            <AuthPage>{children}</AuthPage>
          </Content>
          <Footer style={{ textAlign: 'center' }}>
            Copyright &#169; {new Date().getFullYear()}. Powered by Secret Billionaire. All right reserved.
          </Footer>
        </Space>
      </Layout>
    </Layout>
  );
};
