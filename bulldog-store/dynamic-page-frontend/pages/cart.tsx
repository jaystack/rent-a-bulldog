import React from 'react';
import { GetStaticProps } from 'next';

import BulldogCard from '../src/components/BulldogCard';
import { useCartContext } from '../src/context/cartContext';
import { BulldogFields } from '../types';
import { getBulldogs } from '../api';
export const getStaticProps: GetStaticProps = async () => {
  const allBulldogData = await getBulldogs();
  return {
    props: {
      allBulldogData,
    },
    revalidate: 15,
  };
};

type CartPageProps = {
  allBulldogData: BulldogFields[];
};

const CartPage = ({ allBulldogData }: CartPageProps) => {
  const { cartState } = useCartContext();
  const cartData = allBulldogData.map((_, index) => {
    return allBulldogData.filter((data) => {
      return data.fields.id === cartState?.[index]?.id;
    });
  });

  const cartContent = cartData[0].length > 0 ? cartData.flat() : [];
  return (
    <>
      <div>CART PAGE</div>
      <div>
        {cartContent.map((item, index) => (
          <BulldogCard
            key={index}
            id={item.fields.id}
            img={item.fields.image.fields.file?.url}
            name={item.fields.name}
          />
        ))}
      </div>
    </>
  );
};

export default CartPage;
