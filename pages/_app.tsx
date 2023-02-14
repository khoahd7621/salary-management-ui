import { StyleProvider } from '@ant-design/cssinjs';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import { SWRConfig } from 'swr/_internal';

import axiosClient from '~/api-clients/axios-client';
import { MainLayout } from '~/layouts';
import { AppPropsWithLayout } from '~/models/layouts';
import { store } from '~/redux/store';

import 'antd/dist/reset.css';
import 'react-toastify/dist/ReactToastify.css';
import '~/styles/globals.scss';

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const Layout = Component.Layout ?? MainLayout;

  return (
    <Provider store={store}>
      <StyleProvider hashPriority="high">
        <Layout>
          <SWRConfig
            value={{
              fetcher: (url) => axiosClient.get(url),
              shouldRetryOnError: false,
            }}
          >
            <Component {...pageProps} />
          </SWRConfig>

          <ToastContainer />
        </Layout>
      </StyleProvider>
    </Provider>
  );
}
