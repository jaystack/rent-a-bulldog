import React from 'react';
import { AppProps } from 'next/app';

import '../styles/globals.css';
import Layout from '../src/components/Layout';
import { CartContextProvider } from '../src/context/cartContext';
import { ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import theme from '../src/theme';

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <ThemeProvider theme={theme}>
      <CartContextProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </CartContextProvider>
      <CssBaseline />
    </ThemeProvider>
  );
};

export default MyApp;
