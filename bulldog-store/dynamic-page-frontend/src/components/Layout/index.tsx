import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { AppBar, Toolbar } from '@material-ui/core';

import { useCartContext } from '../../context/cartContext';
import Footer from '../Footer';
import styles from './layout.module.css';

type LayoutProps = {
  children: React.ReactChild;
};

const classes = {
  logo: {
    height: 100,
  },
  logoHorizontallyCenter: {
    display: 'flex' as 'flex',
    justifyContent: 'center' as 'center',
    alignItems: 'center' as 'center',
    flexDirection: 'column' as 'column'
  }
};

const Layout = ({ children }: LayoutProps) => {
  const { cartState } = useCartContext();
  return (
    <div className={styles.container}>
      <Head>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
        <title>Bulldog Shop Home Page</title>
      </Head>

      <AppBar position="sticky" >
        <div style={classes.logoHorizontallyCenter}>
          <img src='/images/logo.png' style={classes.logo} alt="logo" />
          <h1> Rent a bulldog</h1>
        </div>
      </AppBar>
      {/*   <header className={styles.header}>
        <Link href='/'>
          <a>
            <h1>BULLDOG SHOP</h1>
          </a>
        </Link>
        <CartIndex items={(cartState as unknown) as string[]} />
      </header> */}
      <main>{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
