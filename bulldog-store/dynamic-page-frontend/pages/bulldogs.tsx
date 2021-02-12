import React from 'react';
import Link from 'next/link';
import { GetStaticProps } from 'next';

import BulldogCard from '../src/components/BulldogCard';
import styles from '../styles/bulldogs.module.css';
import { BulldogFields } from '../types';
import CartIndex from '../src/components/CartIndex';
import { useCartContext } from '../src/context/cartContext';
import { getBulldogs } from '../api';

export const getStaticProps: GetStaticProps = async () => {
  const allBulldog = await getBulldogs();
  return {
    props: {
      allBulldog,
    },
    revalidate: 15,
  };
};

type AllBulldogProps = {
  allBulldog: BulldogFields[];
};

const bulldogList = ({ allBulldog }: AllBulldogProps) => {

  const { cartState } = useCartContext();

  return (
    <div className={styles.bulldogListContainer}>
      <h3>Our bulldog offers for 2021</h3>
      <CartIndex items={(cartState as unknown) as string[]} />
      <div className={styles.bulldogList}>
        {allBulldog?.map((bulldog) => (
          <BulldogCard
            key={bulldog?.fields?.id}
            id={bulldog?.fields?.id}
            img={bulldog?.fields?.image?.fields?.file?.url}
            name={bulldog?.fields?.name}
          />
        ))}
      </div>
      <Link href='/'>
        <a>Back to home page</a>
      </Link>
    </div>
  );
};

export default bulldogList;
