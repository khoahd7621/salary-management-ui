import { AuthPage } from '~/components';
import { NextPageWithLayout } from '~/models/layouts';

const DashboardPage: NextPageWithLayout = () => {
  return (
    <AuthPage>
      <div>Dashboard</div>
    </AuthPage>
  );
};

export default DashboardPage;
