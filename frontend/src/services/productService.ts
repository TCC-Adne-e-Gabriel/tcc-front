import { createApiInstance } from './api';
import { Product } from '../types';
import { AxiosResponse } from 'axios';

const api = createApiInstance('catalog');

export const getProductById = async (id: string): Promise<Product> => {
  const response: AxiosResponse<Product> = await api.get(`/product/${id}`);
  return response.data;
};

export const getAllProducts = async (): Promise<Product[]> => {
  const response: AxiosResponse<Product[]> = await api.get('/product/');
  return response.data;
};

export const createProduct = async (
  data: Omit<Product, 'id' | 'categories' | 'created_at' | 'updated_at'> & { category_ids?: string[] }
): Promise<Product> => {
  const response = await api.post<Product>('/product/', data);
  return response.data;
};

export const updateProductQuantity = async (
  id: string,
  quantity: number
): Promise<Product> => {
  const response = await api.patch<Product>(`/product/${id}`, { quantity });
  return response.data;
};

export const buyProduct = async (
  id: string,
  quantity: number
): Promise<Product> => {
  const response = await api.patch<Product>(`/product/buy/${id}`, { quantity });
  return response.data;
};

export const associateCategory = async (
  productId: string,
  categoryId: string
): Promise<Product> => {
  const response = await api.post<Product>(`/product/associate-category`, { product_id: productId, category_id: categoryId });
  return response.data;
};

export const disassociateCategory = async (
  productId: string,
  categoryId: string
): Promise<Product> => {
  const response = await api.post<Product>(`/product/desassociate-category`, { product_id: productId, category_id: categoryId });
  return response.data;
};

export const deleteProduct = async (id: string): Promise<void> => {
  await api.delete(`/product/${id}/`);
};