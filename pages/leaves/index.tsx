import { AuthPage, Seo } from '~/components';
import { NextPageWithLayout } from '~/models/layouts';

const LogLeavesListPage: NextPageWithLayout = () => {
  return (
    <AuthPage>
      <Seo
        data={{
          title: 'Leaves | OT & Salary Management',
          description: 'List log leaves page',
          url: `${process.env.HOST_URL}/leaves`,
        }}
      />

      <h1>This feature will be released soon. Please, comeback later.</h1>
    </AuthPage>
  );
};

export default LogLeavesListPage;
