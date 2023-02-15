import { Seo } from '~/components';
import { NextPageWithLayout } from '~/models/layouts';

const EmployeesListPage: NextPageWithLayout = () => {
  return (
    <>
      <Seo
        data={{
          title: 'Employees | OT & Salary Management',
          description: 'List employees page',
          url: `${process.env.HOST_URL}/employees`,
        }}
      />

      <h1>This feature will be released soon. Please, comeback later.</h1>
    </>
  );
};

export default EmployeesListPage;
