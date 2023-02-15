import { Seo } from '~/components';
import { NextPageWithLayout } from '~/models/layouts';

const ContractsListPage: NextPageWithLayout = () => {
  return (
    <>
      <Seo
        data={{
          title: 'Contracts | OT & Salary Management',
          description: 'List contracts page',
          url: `${process.env.HOST_URL}/contracts`,
        }}
      />

      <h1>This feature will be released soon. Please, comeback later.</h1>
    </>
  );
};

export default ContractsListPage;
