import { SWRConfig } from 'swr/_internal';

import axiosClient from '~/api-clients/axios-client';
import { MainLayout } from '~/layouts';
import { AppPropsWithLayout } from '~/models/layouts';

import 'antd/dist/reset.css';
import '~/styles/globals.scss';

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const Layout = Component.Layout ?? MainLayout;

  return (
    <SWRConfig
      value={{
        fetcher: (url) => axiosClient.get(url),
        shouldRetryOnError: false,
      }}
    >
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </SWRConfig>
  );
}
