import type { AppProps } from 'next/app';
import '../styles/globals.css';
import GlobalScrollbar from '../components/Trading/GlobalScrollbar';
import type { ReactElement, ReactNode } from 'react';
import type { NextPage } from 'next';

export type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export default function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <>
      <GlobalScrollbar />
      {getLayout(<Component {...pageProps} />)}
    </>
  );
}
