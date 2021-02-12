import { createContext, useContext, useState } from 'react';
import React from 'react';

export type CartItemType = {
  id: string;
};

export type CartStateType = {
  cartState?: CartItemType[];
  setCartState?: (newState: CartItemType[]) => void;
};

export const CartContext = createContext<CartStateType>({});

export type CartContextProviderProps = {
  children: React.ReactChild;
};

const CartContextProvider = ({ children }: CartContextProviderProps) => {
  const [cartState, setCartState] = useState<CartItemType[]>([]);

  return (
    <CartContext.Provider value={{ cartState, setCartState }}>
      {children}
    </CartContext.Provider>
  );
};

const useCartContext = () => useContext(CartContext);

export { CartContextProvider, useCartContext };
