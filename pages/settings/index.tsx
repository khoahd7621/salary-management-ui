import { Space, Typography } from 'antd';
import getConfig from 'next/config';

import { Seo } from '~/components';
import { FormChangePassword, Profile } from '~/components/modules/settings';
import { useAuth } from '~/hooks';
import { AppRoutes } from '~/models/constants/Routes';
import { NextPageWithLayout } from '~/models/layouts';

const { serverRuntimeConfig } = getConfig();

const SettingsPage: NextPageWithLayout = () => {
  const { profile } = useAuth();

  return (
    <>
      <Seo
        data={{
          title: 'Settings | OT & Salary Management',
          description: 'Settings page',
          url: `${serverRuntimeConfig.HOST_URL}/${AppRoutes.settings}`,
        }}
      />

      <Space style={{ width: '100%' }} direction="vertical" size="large">
        <Space style={{ width: '100%' }} direction="vertical" size="small">
          <Typography.Title level={3}>Your profile</Typography.Title>

          <Profile profile={profile} />
        </Space>

        <Space style={{ width: '100%' }} direction="vertical" size="middle">
          <Typography.Title level={3}>Change password</Typography.Title>

          <FormChangePassword />
        </Space>
      </Space>
    </>
  );
};

export default SettingsPage;
