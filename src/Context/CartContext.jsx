import React, { createContext, useContext, useReducer, useEffect } from "react";

const CartContext = createContext();

const cartReducer = (state = { items: [] }, action) => {
  switch (action.type) {
    case "ADD_TO_CART": {
      const existing = state.items.find(
        (item) => item.id === action.payload.id
      );
      if (existing) {
        return {
          ...state,
          items: state.items.map((item) =>
            item.id === action.payload.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        };
      }
      return {
        ...state,
        items: [...state.items, { ...action.payload, quantity: 1 }],
      };
    }
    case "REMOVE_FROM_CART":
      return {
        ...state,
        items: state.items.filter((item) => item.id !== action.payload),
      };
    case "UPDATE_QUANTITY":
      return {
        ...state,
        items: state.items.map((item) =>
          item.id === action.payload.id
            ? { ...item, quantity: action.payload.quantity }
            : item
        ),
      };
    case "CLEAR_CART":
      return { ...state, items: [] };
    default:
      return state;
  }
};

const getInitialCart = () => {
  try {
    const stored = localStorage.getItem("cart");
    if (stored) {
      const parsed = JSON.parse(stored);
      return { items: parsed.items || [] };
    }
  } catch {}
  return { items: [] };
};

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, getInitialCart());

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(state));
  }, [state]);

  const addToCart = (product) => {
    // Ensure price is a number
    const price = typeof product.price === "string"
      ? parseFloat(product.price.replace(/[^\d.]/g, ""))
      : parseFloat(product.price) || 0;
    dispatch({ type: "ADD_TO_CART", payload: { ...product, price } });
  };
  const removeFromCart = (id) =>
    dispatch({ type: "REMOVE_FROM_CART", payload: id });
  const updateQuantity = (id, quantity) =>
    dispatch({ type: "UPDATE_QUANTITY", payload: { id, quantity } });
  const clearCart = () => dispatch({ type: "CLEAR_CART" });
  const getCartTotal = () =>
    state.items.reduce(
      (total, item) => total + parseFloat(item.price) * item.quantity,
      0
    );
  const getCartItemsCount = () =>
    state.items.reduce((total, item) => total + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cart: state,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getCartTotal,
        getCartItemsCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within a CartProvider");
  return context;
};
