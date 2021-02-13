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
  navbarFixedTop: {
    position: 'sticky' as 'sticky',
    top: 0,
    background: 'blue',
  },
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

      <header className="navbar-fixed-top" style={classes.navbarFixedTop}>
        <nav>
          <div style={classes.logoHorizontallyCenter}>
            <img src='/images/logo.png' style={classes.logo} alt="logo" />
            <h1> Rent a bulldog</h1>
          </div>
        </nav>
      </header>
      <main>{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
