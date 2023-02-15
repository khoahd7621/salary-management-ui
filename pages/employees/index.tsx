import { AuthPage, Seo } from '~/components';
import { NextPageWithLayout } from '~/models/layouts';

const EmployeesListPage: NextPageWithLayout = () => {
  return (
    <AuthPage>
      <Seo
        data={{
          title: 'Employees | OT & Salary Management',
          description: 'List employees page',
          url: `${process.env.HOST_URL}/employees`,
        }}
      />

      <h1>This feature will be released soon. Please, comeback later.</h1>
    </AuthPage>
  );
};

export default EmployeesListPage;
