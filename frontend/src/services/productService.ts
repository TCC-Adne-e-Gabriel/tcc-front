import { api } from './api';
import { Product, Category } from '../types';

export const getProductsByCategory = async (category: Category): Promise<Product[]> => {
  const response = await api.get(`/products/category/${category}`);
  return response.data;
};

export const getAllProducts = async (): Promise<Product[]> => {
  const response = await api.get('/products');
  return response.data;
};

export const searchProducts = async (query: string): Promise<Product[]> => {
  const response = await api.get('/products/search', { params: { q: query } });
  return response.data;
};