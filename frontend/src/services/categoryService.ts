import { createApiInstance } from './api';
import { CategoryResponse } from '../types';
import { AxiosResponse } from 'axios';

const api = createApiInstance('catalog');

export const getAllCategories = async (): Promise<CategoryResponse[]> => {
  const resp: AxiosResponse<CategoryResponse[]> = await api.get('/category/');
  return resp.data;
};
