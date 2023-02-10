import { AppProps } from 'next/app';
import { MainLayout } from '~/components/common/Layout';

import 'antd/dist/reset.css';
import '~/styles/globals.css';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <MainLayout>
      <Component {...pageProps} />
    </MainLayout>
  );
}
