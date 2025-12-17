import { useState, useEffect } from "react";

const CART_KEY = "my-ecom-cart-v1";

export default function useCart() {
  const [cartItems, setCartItems] = useState(() => {
    try {
      const raw = localStorage.getItem(CART_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem(CART_KEY, JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (product) => {
    setCartItems((prev) => [...prev, product]);
  };

  const removeFromCart = (id) => {
    setCartItems((prev) => prev.filter((p) => p.id !== id));
  };

  const clearCart = () => setCartItems([]);

  const total = cartItems.reduce((s, p) => s + (p.price || 0), 0);

  const count = cartItems.length;

  return {
    cartItems,
    addToCart,
    removeFromCart,
    clearCart,
    total,
    count,
    setCartItems,
  };
}
