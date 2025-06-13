import React, { createContext, useContext, useEffect, useState } from 'react';
import { 
  getCart as apiGetCart, 
  addToCart as apiAddToCart, 
  updateCartItem, 
  removeFromCart as apiRemoveFromCart,
  clearCart as apiClearCart
} from '../services/cartService';
import { CartItem } from '../types';

interface CartContextType {
  cart: CartItem[];
  addToCart: (item: Omit<CartItem, 'id'>) => Promise<void>;
  updateItemQuantity: (id: string, quantity: number) => Promise<void>;
  removeFromCart: (id: string) => Promise<void>;
  clearCart: () => Promise<void>;
}

const CartContext = createContext<CartContextType>(null!);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>([]);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const cartData = await apiGetCart();
        setCart(cartData);
      } catch (error) {
        console.error('Failed to fetch cart', error);
        setCart([]);
      }
    };
    
    fetchCart();
  }, []);

  const addToCart = async (item: Omit<CartItem, 'id'>) => {
    const newItem = await apiAddToCart(item);
    setCart(prev => [...prev, newItem]);
  };

  const updateItemQuantity = async (id: string, quantity: number) => {
    const updatedItem = await updateCartItem(id, quantity);
    setCart(prev => 
      prev.map(item => item.id === id ? updatedItem : item)
    );
  };

  const removeFromCart = async (id: string) => {
    await apiRemoveFromCart(id);
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const clearCart = async () => {
    await apiClearCart();
    setCart([]);
  };

  const value = { cart, addToCart, updateItemQuantity, removeFromCart, clearCart };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);