import { api } from './api';
import { CategoryResponse } from '../types';
import { AxiosResponse } from 'axios';

export const getAllCategories = async (): Promise<CategoryResponse[]> => {
  const resp: AxiosResponse<CategoryResponse[]> = await api.get('/category/');
  return resp.data;
};
