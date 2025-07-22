import { createApiInstance } from './api';
import { OrderResponse, CreateOrderRequest } from '../types';
import { AxiosResponse } from 'axios';

const api = createApiInstance('order');

export const getMyOrders = async (): Promise<OrderResponse[]> => {
  const resp: AxiosResponse<OrderResponse[]> = await api.get('/order/me/');
  return resp.data;
};

export const getOrderDetails = async (orderId: string): Promise<OrderResponse> => {
  const resp: AxiosResponse<OrderResponse> = await api.get(`/order/${orderId}/`);
  return resp.data;
};

export const createOrder = async (payload: CreateOrderRequest): Promise<OrderResponse> => {
  const resp: AxiosResponse<OrderResponse> = await api.post('/order/', payload);
  return resp.data;
};

export const updateOrderStatus = async (orderId: string, status: string): Promise<OrderResponse> => {
  const resp: AxiosResponse<OrderResponse> = await api.patch(`/order/${orderId}/status/`, { status });
  return resp.data;
};