import type { AppProps } from 'next/app';
import '../styles/globals.css';
import GlobalScrollbar from '../components/Trading/GlobalScrollbar';

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <GlobalScrollbar />
      <Component {...pageProps} />
    </>
  );
}
