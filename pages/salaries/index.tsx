import { AuthPage, Seo } from '~/components';
import { NextPageWithLayout } from '~/models/layouts';

const SalariesListPage: NextPageWithLayout = () => {
  return (
    <AuthPage>
      <Seo
        data={{
          title: 'Salaries | OT & Salary Management',
          description: 'List salaries page',
          url: `${process.env.HOST_URL}/salaries`,
        }}
      />

      <h1>This feature will be released soon. Please, comeback later.</h1>
    </AuthPage>
  );
};

export default SalariesListPage;
