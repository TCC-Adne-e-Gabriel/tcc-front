import axios, { AxiosInstance } from 'axios';

const SERVICE_PORTS: Record<string, number> = {
  auth: 8001,
  catalog: 8002,
  order: 8003,
};

const getBaseUrl = (serviceKey: string): string => {
  if (process.env.PROJECT_API_BASE_URL) {
    return process.env.PROJECT_API_BASE_URL;
  }
  return `http://localhost:${SERVICE_PORTS[serviceKey]}`;
};

export const createApiInstance = (serviceKey: string): AxiosInstance => {
  const instance = axios.create({
    baseURL: getBaseUrl(serviceKey),
    headers: { 'Content-Type': 'application/json' }
  });

  instance.interceptors.request.use(config => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });

  instance.interceptors.response.use(
    response => response,
    error => {
      if (error.response?.status === 401) {
        localStorage.removeItem('token');
        window.location.href = '/login';
      }
      return Promise.reject(error);
    }
  );

  return instance;
};