import getConfig from 'next/config';

import { Seo } from '~/components';
import { NextPageWithLayout } from '~/models/layouts';

const { publicRuntimeConfig } = getConfig();

const DashboardPage: NextPageWithLayout = () => {
  return (
    <>
      <Seo
        data={{
          title: 'Dashboard | OT & Salary Management',
          description: 'Dashboard page',
          url: `${publicRuntimeConfig.HOST_URL}/dashboard`,
        }}
      />

      <h1>This feature will be released soon. Please, comeback later.</h1>
    </>
  );
};

export default DashboardPage;
