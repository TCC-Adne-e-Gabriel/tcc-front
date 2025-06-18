import { api } from './api';
import { CartItem } from '../types';

export const getCart = async (): Promise<CartItem[]> => {
  const response = await api.get('/cart');
  return response.data;
};

export const addToCart = async (item: Omit<CartItem, 'id'>): Promise<CartItem> => {
  const response = await api.post('/cart', item);
  return response.data;
};

export const updateCartItem = async (id: string, quantity: number): Promise<CartItem> => {
  const response = await api.patch(`/cart/${id}`, { quantity });
  return response.data;
};

export const removeFromCart = async (id: string): Promise<void> => {
  await api.delete(`/cart/${id}`);
};

export const clearCart = async (): Promise<void> => {
  await api.delete('/cart');
};