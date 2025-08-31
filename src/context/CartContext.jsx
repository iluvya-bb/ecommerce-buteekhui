import React, { createContext, useState, useEffect } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    try {
      const storedCartItems = localStorage.getItem('cartItems');
      return storedCartItems ? JSON.parse(storedCartItems) : [];
    } catch (error) {
      return [];
    }
  });
  const [itemAdded, setItemAdded] = useState(false);

  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (product, quantity) => {
    const existingItem = cartItems.find((item) => item.id === product.id);

    if (existingItem) {
      setCartItems(
        cartItems.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item
        )
      );
    } else {
      setCartItems([...cartItems, { ...product, quantity }]);
    }
    setItemAdded(true);
    setTimeout(() => setItemAdded(false), 500); // Reset after animation duration
  };

  const removeFromCart = (productId) => {
    setCartItems(cartItems.filter((item) => item.id !== productId));
  };

  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity > 0) {
      setCartItems(
        cartItems.map((item) =>
          item.id === productId ? { ...item, quantity: newQuantity } : item
        )
      );
    } else {
      removeFromCart(productId);
    }
  };

  const clearCart = () => {
    setCartItems([]);
  };

  return (
    <CartContext.Provider value={{ cartItems, itemAdded, addToCart, removeFromCart, updateQuantity, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};
