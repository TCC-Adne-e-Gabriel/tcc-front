import { api } from './api';
import { User, LoginData, RegisterData } from '../types';

export const login = async (data: LoginData): Promise<{ user: User; token: string }> => {
  const response = await api.post('/auth/login', data);
  return response.data;
};

export const register = async (data: RegisterData): Promise<{ user: User; token: string }> => {
  const response = await api.post('/auth/register', data);
  return response.data;
};

export const getCurrentUser = async (): Promise<User | null> => {
  try {
    const response = await api.get('/auth/me');
    return response.data;
  } catch (error) {
    return null;
  }
};

export const logout = () => {
  localStorage.removeItem('token');
};