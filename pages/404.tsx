import Link from 'next/link';

import { EmptyLayout } from '~/layouts';
import { NextPageWithLayout } from '~/models/layouts';
import styles from '~/styles/404.module.scss';

const NotfoundPage: NextPageWithLayout = () => {
  return (
    <div className={styles['notfound']}>
      <p className={styles['p']}>
        HTTP: <span>404</span>
      </p>
      <code className={styles['code']}>
        <span>this_page</span>.<em>not_found</em> = true;
      </code>
      <code className={styles['code']}>
        <span>if</span> (<b>you_spelt_it_wrong</b>) &#123;<span>try_again()</span>;&#125;
      </code>
      <code className={styles['code']}>
        <span>
          else if (<b>we_screwed_up</b>)
        </span>{' '}
        &#123;<em>alert</em>(<i>&quot;We&apos;re really sorry about that.&quot;</i>); <span>window</span>.
        <em>location</em> = home;&#125;
      </code>
      <center>
        <Link className={styles['a']} href="/">
          HOME
        </Link>
      </center>
    </div>
  );
};

NotfoundPage.Layout = EmptyLayout;

export default NotfoundPage;
