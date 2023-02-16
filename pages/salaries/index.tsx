import getConfig from 'next/config';

import { Seo } from '~/components';
import { NextPageWithLayout } from '~/models/layouts';

const { publicRuntimeConfig } = getConfig();

const SalariesListPage: NextPageWithLayout = () => {
  return (
    <>
      <Seo
        data={{
          title: 'Salaries | OT & Salary Management',
          description: 'List salaries page',
          url: `${publicRuntimeConfig.HOST_URL}/salaries`,
        }}
      />

      <h1>This feature will be released soon. Please, comeback later.</h1>
    </>
  );
};

export default SalariesListPage;
