import React from 'react';
import { AppProps } from 'next/app';

import '../styles/globals.css';
import Layout from '../src/components/Layout';
import { CartContextProvider } from '../src/context/cartContext';

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <CartContextProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </CartContextProvider>
  );
};

export default MyApp;
