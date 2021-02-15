import React from 'react';

import styles from '../styles/Home.module.css';
import Link from 'next/link';
import { GetStaticProps, GetStaticPaths } from 'next';

import { BulldogFields } from '../types';
import { getBulldogById, getBulldogs } from '../api'

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const allBulldogs = await getBulldogs();
  
  return {
    props: {
      allBulldogs
    },
  };
};

type HomeProps = {
  allBulldogs: BulldogFields[];
};

const Home = ({ allBulldogs }: HomeProps) => {
  return (
    <div className={styles.homeContainer}>
      <div>
        <Link href='/bulldogs'>
          <p>
            Check our bulldogs
        </p>
        </Link>
        <div>
        {allBulldogs.map( (bd, i) =><Link key={i} href={`/bulldog/${bd.fields.id}`}>{bd.fields.name}</Link>)}
        </div>
      </div>
      <img className={styles.coverImg} src='/images/bulldog.jpg' />
    </div>
  );
};

export default Home;
