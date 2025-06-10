import { api } from './api';
import { User, LoginData, RegisterData } from '../types';

export const login = async (data: LoginData): Promise<User> => {
  const response = await api.post('/auth/login', data);
  localStorage.setItem('token', response.data.token);
  return response.data.user;
};

export const register = async (data: RegisterData): Promise<User> => {
  const response = await api.post('/auth/register', data);
  localStorage.setItem('token', response.data.token);
  return response.data.user;
};

export const getCurrentUser = async (): Promise<User | null> => {
  try {
    const response = await api.get('/auth/me');
    return response.data;
  } catch (error) {
    return null;
  }
};