import { AppProps } from 'next/app';
import { MainLayout } from '~/components/common';
import { Provider } from 'react-redux';

import { store } from '~/redux/store';

import 'antd/dist/reset.css';
import '~/styles/globals.css';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <MainLayout>
        <Component {...pageProps} />
      </MainLayout>
    </Provider>
  );
}
