import { AuthPage, Seo } from '~/components';
import { NextPageWithLayout } from '~/models/layouts';

const CompaniesListPage: NextPageWithLayout = () => {
  return (
    <AuthPage>
      <Seo
        data={{
          title: 'Companies | OT & Salary Management',
          description: 'List companies page',
          url: `${process.env.HOST_URL}/companies`,
        }}
      />

      <h1>This feature will be released soon. Please, comeback later.</h1>
    </AuthPage>
  );
};

export default CompaniesListPage;
