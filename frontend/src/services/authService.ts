import { api } from './api';
import { User, LoginData, RegisterData } from '../types';

export const login = async (data: LoginData): Promise<string> => {
  const params = new URLSearchParams();
  params.append('username', data.email);
  params.append('password', data.password);

  const response = await api.post('/customer/login/', params, {
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
  });

  return response.data.access_token;
};

export const register = async (data: RegisterData): Promise<User> => {
  const payload = {
    name: data.name,
    email: data.email,
    phone: data.phone,
    password: data.password,
    active: true,
  };
  const response = await api.post('/customer/', payload);
  return response.data;
};

export const getCurrentUser = async (): Promise<User> => {
  const response = await api.get('/customer/read/me/');
  return response.data;
};
