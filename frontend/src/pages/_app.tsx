import * as React from 'react';
import Head from 'next/head';
import { AppProps } from 'next/app';
import { AppCacheProvider } from '@mui/material-nextjs/v14-pagesRouter';
import { ThemeContextProvider } from '@/context/ThemeContext';
import CssBaseline from '@mui/material/CssBaseline';
import Layout from '../components/Layout';
import { useRouter } from 'next/router';

export default function MyApp(props: AppProps) {
  const { Component, pageProps } = props;
  const router = useRouter();
  const noLayoutRoutes = ['/not-found'];

  React.useEffect(() => {
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles?.parentElement?.removeChild(jssStyles);
    }
  }, []);


  return (
    <ThemeContextProvider>
    <AppCacheProvider {...props}>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
        <title>ETTIS</title>
      </Head>
        <CssBaseline />
        {noLayoutRoutes.includes(router.pathname) ? (
          <Component {...pageProps} />
        ) : (
          <Layout>
            <Component {...pageProps} />
          </Layout>
        )}
    </AppCacheProvider>
    </ThemeContextProvider>
  );
}
