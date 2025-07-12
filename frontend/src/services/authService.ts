import { api } from './api';
import { User, LoginData, RegisterData, ProfileUpdateData, ChangePasswordData } from '../types';

export const login = async (data: LoginData): Promise<string> => {
  const params = new URLSearchParams();
  params.append('username', data.email);
  params.append('password', data.password);
  const response = await api.post('/customer/login/', params, {
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
  });
  return response.data.access_token;
};

export const register = async (data: RegisterData): Promise<void> => {
  await api.post('/customer/', {
    name: data.name,
    email: data.email,
    phone: data.phone,
    password: data.password,
    active: true,
  });
};

export const getCurrentUser = async (): Promise<User> => {
  const response = await api.get('/customer/read/me/');
  return response.data;
};

export const updateProfile = async (data: ProfileUpdateData): Promise<User> => {
  const response = await api.patch('/customer/me/', data);
  return response.data;
};

export const changePassword = async (data: ChangePasswordData): Promise<void> => {
  await api.patch('/customer/password/me/', {
    current_password: data.currentPassword,
    new_password: data.newPassword,
  });
};
