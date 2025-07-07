import { api } from './api';
import { Order, OrderResponse, CreateOrderRequest } from '../types';

export const getMyOrders = async (): Promise<OrderResponse[]> => {
  const resp = await api.get<OrderResponse[]>('/order/me/');
  return resp.data;
};

export const getOrderDetails = async (orderId: string): Promise<OrderResponse> => {
  const resp = await api.get<OrderResponse>(`/order/${orderId}/`);
  return resp.data;
};

export const createOrder = async (payload: CreateOrderRequest): Promise<OrderResponse> => {
  const resp = await api.post<OrderResponse>('/order/', payload);
  return resp.data;
};

export const updateOrderStatus = async (orderId: string, status: string): Promise<OrderResponse> => {
  const resp = await api.patch<OrderResponse>(`/order/${orderId}/status/`, { status });
  return resp.data;
};