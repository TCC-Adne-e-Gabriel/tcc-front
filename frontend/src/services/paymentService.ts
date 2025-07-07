import { api } from './api';
import { CreatePaymentRequest, PaymentResponse } from '../types';

export const createPayment = async (payload: CreatePaymentRequest): Promise<PaymentResponse> => {
  const resp = await api.post<PaymentResponse>('/payment/', payload);
  return resp.data;
};

export const confirmPayment = async (paymentId: string): Promise<PaymentResponse> => {
  const resp = await api.patch<PaymentResponse>(`/payment/${paymentId}/confirm/`, {});
  return resp.data;
};