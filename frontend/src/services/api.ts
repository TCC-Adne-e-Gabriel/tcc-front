import axios, { AxiosInstance } from 'axios';

const SERVICE_CONFIG = {
  auth: {
    envVar: 'SERVICE_PORT_AUTH',
    defaultPort: 8001
  },
  catalog: {
    envVar: 'SERVICE_PORT_CATALOG',
    defaultPort: 8002
  },
  order: {
    envVar: 'SERVICE_PORT_ORDER',
    defaultPort: 8003
  }
};

const getBaseUrl = (serviceKey: keyof typeof SERVICE_CONFIG): string => {
  if (process.env.PROJECT_API_BASE_URL) {
    return process.env.PROJECT_API_BASE_URL;
  }

  const serviceConfig = SERVICE_CONFIG[serviceKey];
  const port = process.env[serviceConfig.envVar] || serviceConfig.defaultPort;

  return `http://localhost:${port}`;
};

export const createApiInstance = (serviceKey: keyof typeof SERVICE_CONFIG): AxiosInstance => {
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