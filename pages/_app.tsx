import { Provider } from 'react-redux';
import { StyleProvider } from '@ant-design/cssinjs';

import { MainLayout } from '~/components/layouts';
import { AppPropsWithLayout } from '~/models/components/layouts';
import { store } from '~/redux/store';

import 'antd/dist/reset.css';
import '~/styles/globals.css';

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const Layout = Component.Layout ?? MainLayout;

  return (
    <Provider store={store}>
      <StyleProvider hashPriority="high">
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </StyleProvider>
    </Provider>
  );
}
