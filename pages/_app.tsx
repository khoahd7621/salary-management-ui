import { StyleProvider } from '@ant-design/cssinjs';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';

import { MainLayout } from '~/layouts';
import { AppPropsWithLayout } from '~/models/layouts';
import { store } from '~/redux/store';

import 'antd/dist/reset.css';
import 'react-toastify/dist/ReactToastify.css';
import '~/styles/globals.css';

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const Layout = Component.Layout ?? MainLayout;

  return (
    <Provider store={store}>
      <StyleProvider hashPriority="high">
        <Layout>
          <Component {...pageProps} />

          <ToastContainer />
        </Layout>
      </StyleProvider>
    </Provider>
  );
}
