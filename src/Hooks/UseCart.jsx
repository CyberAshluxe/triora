import React from "react";

import { createContext, useContext, useState } from "react";

const CartContext = createContext(undefined);

export function CartProvider({ children }) {
  const [itemCount, setItemCount] = useState(0);

  const addItem = () => {
    setItemCount((prev) => prev + 1);
  };

  const removeItem = () => {
    setItemCount((prev) => Math.max(0, prev - 1));
  };

  const clearCart = () => {
    setItemCount(0);
  };

  return (
    <CartContext.Provider value={{ itemCount, addItem, removeItem, clearCart }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
