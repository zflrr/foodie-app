import React, { useState, useEffect } from 'react';
import CartContext from '../store/CartContext';

export const CartProvider = ({ children }) => {
  
  const [items, setItems] = useState(() => {
    const savedItems = localStorage.getItem('cartItems');
    return savedItems ? JSON.parse(savedItems) : [];
  });

  const [totalAmount, setTotalAmount] = useState(() => {
    const savedTotal = localStorage.getItem('cartTotal');
    return savedTotal ? parseFloat(savedTotal) : 0;
  });

  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(items));
    localStorage.setItem('cartTotal', totalAmount.toString());
  }, [items, totalAmount]);

  const addItem = (item) => {
    setItems((prevItems) => {
      const existingItemIndex = prevItems.findIndex(i => i.id === item.id);
      if (existingItemIndex >= 0) {
        const updatedItems = [...prevItems];
        updatedItems[existingItemIndex].amount += item.amount;
        return updatedItems;
      }
      return [...prevItems, { ...item, amount: item.amount }];
    });
    setTotalAmount((prevTotal) => prevTotal + item.price * item.amount);
  };

  const removeItem = (id) => {
    setItems((prevItems) => {
      const existingItem = prevItems.find(item => item.id === id);
      if (existingItem.amount === 1) {
        return prevItems.filter(item => item.id !== id);
      } else {
        return prevItems.map(item =>
          item.id === id ? { ...item, amount: item.amount - 1 } : item
        );
      }
    });
    setTotalAmount((prevTotal) => {
      const itemToRemove = items.find(item => item.id === id);
      return prevTotal - itemToRemove.price;
    });
  };

  const clearCart = () => {
    setItems([]);
    setTotalAmount(0);
  };

  const cartContext = {
    items: items,
    totalAmount: totalAmount,
    addItem: addItem,
    removeItem: removeItem,
    clearCart: clearCart,
  };

  return (
    <CartContext.Provider value={cartContext}>
      {children}
    </CartContext.Provider>
  );
};