import Link from 'next/link';

import { EmptyLayout } from '~/layouts';
import { NextPageWithLayout } from '~/models/layouts';

const NotfoundPage: NextPageWithLayout = () => {
  return (
    <div>
      <h1>404 - Page Not Found</h1>
      <Link href="/">Go back home</Link>
    </div>
  );
};

NotfoundPage.Layout = EmptyLayout;

export default NotfoundPage;
