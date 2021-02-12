import React from 'react';
import { useCallback } from 'react';
import { useCartContext, CartItemType } from '../context/cartContext';

export const useCart = () => {
  const { cartState, setCartState } = useCartContext();

  const handleAddToCart = useCallback(
    (id: string) => {
      const newState = [...(cartState || []), { id }];
      setCartState?.(newState);
    },
    [cartState]
  );

  const handleDeleteFromCart = useCallback(
    (selectedId) => {
      const newState = (cartState || []).filter(
        (item: CartItemType) => item.id !== selectedId
      );
      setCartState?.(newState);
    },
    [cartState]
  );

  return [handleAddToCart, handleDeleteFromCart];
};
