import Link from 'next/link';
import { useRouter } from 'next/router';

import { useCart } from '../../hooks/cart';
import styles from './BulldogCard.module.css';

type BulldogCardProps = {
  id?: string;
  name: string;
  img: string;
  description?: string;
};

const BulldogCard = ({ id, name, img, description }: BulldogCardProps) => {
  const router = useRouter();
  const [handleAddToCart, handleDeleteFromCart] = useCart();
  const isCartPage = router.pathname.includes('cart');

  return (
    <div className={styles.bulldogCard}>
      <p>{name}</p>
      <img className={styles.bulldogImg} src={img} />
      <p>{description}</p>
      {!isCartPage ? (
        <button
          className={styles.addToCartBtn}
          onClick={() => handleAddToCart(id as string)}
        >
          add to cart
        </button>
      ) : (
          <button onClick={() => handleDeleteFromCart(id as string)}>
            remove from cart
          </button>
        )}
      {!description && (
        <Link href={`/bulldog/${id}`}>
          <a>view details</a>
        </Link>
      )}
    </div>
  );
};

export default BulldogCard;
