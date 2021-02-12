import React from 'react';

import styles from '../styles/Home.module.css';
import Link from 'next/link'

const Home = () => {
  return (
    <div className={styles.homeContainer}>
      <div>
        <Link href='/bulldogs'>
          <p>
            Check our bulldogs
        </p>
        </Link>
      </div>
      <img className={styles.coverImg} src='/images/bulldog.jpg' />
    </div>
  );
};

export default Home;
