import { AuthPage, Seo } from '~/components';
import { NextPageWithLayout } from '~/models/layouts';

const LogOvertimesListPage: NextPageWithLayout = () => {
  return (
    <AuthPage>
      <Seo
        data={{
          title: 'Overtimes | OT & Salary Management',
          description: 'List log overtimes page',
          url: `${process.env.HOST_URL}/overtimes`,
        }}
      />

      <h1>This feature will be released soon. Please, comeback later.</h1>
    </AuthPage>
  );
};

export default LogOvertimesListPage;