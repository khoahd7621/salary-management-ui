import getConfig from 'next/config';

import { Seo } from '~/components';
import { NextPageWithLayout } from '~/models/layouts';

const { serverRuntimeConfig } = getConfig();

const LogOvertimesListPage: NextPageWithLayout = () => {
  return (
    <>
      <Seo
        data={{
          title: 'Overtimes | OT & Salary Management',
          description: 'List log overtimes page',
          url: `${serverRuntimeConfig.HOST_URL}/overtimes`,
        }}
      />

      <h1>This feature will be released soon. Please, comeback later.</h1>
    </>
  );
};

export default LogOvertimesListPage;
