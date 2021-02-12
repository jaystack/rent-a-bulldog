import Link from 'next/link';

type CartIndexProps = {
  items: string[];
};

const CartIndex = ({ items }: CartIndexProps) => {
  const cartItems = items.length;
  return (
    <>
      <Link href='/cart'>
        <a>{`You have ${cartItems} items in you cart`}</a>
      </Link>
    </>
  );
};

export default CartIndex;
