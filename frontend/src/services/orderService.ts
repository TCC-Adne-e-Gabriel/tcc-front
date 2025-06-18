import { api } from './api';
import { Order } from '../types';

export const getOrders = async (userId: string): Promise<Order[]> => {
  const response = await api.get(`/orders?userId=${userId}`);
  return response.data;
};

export const getOrderDetails = async (orderId: string): Promise<Order> => {
  const response = await api.get(`/orders/${orderId}`);
  return response.data;
};