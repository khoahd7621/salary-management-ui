import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from '@ant-design/icons';
import { Layout, LayoutProps, Menu } from 'antd';
import { createElement, ReactElement, useState } from 'react';

export const MainLayout = ({ children }: LayoutProps): ReactElement => {
  const { Header, Sider, Content } = Layout;

  const [collapsed, setCollapsed] = useState<boolean>(false);

  return (
    <Layout className="h-screen">
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="h-8 m-4 bg-[#ffffff4d]" />
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={['1']}
          items={[
            {
              key: '1',
              icon: <UserOutlined />,
              label: 'nav 1',
            },
            {
              key: '2',
              icon: <VideoCameraOutlined />,
              label: 'nav 2',
            },
            {
              key: '3',
              icon: <UploadOutlined />,
              label: 'nav 3',
            },
          ]}
        />
      </Sider>
      <Layout>
        <Header className="!bg-white p-0">
          {createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
            className:
              'py-0 px-0 text-xl leading-[64px] cursor-pointer transition-colors duration-300 hover:text-[#1890ff]',
            onClick: () => setCollapsed((collapsed) => !collapsed),
          })}
        </Header>
        <Content className="bg-white my-6 mx-4 p-6">{children}</Content>
      </Layout>
    </Layout>
  );
};
