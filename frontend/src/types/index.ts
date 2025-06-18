export type Category = 'HARDWARE' | 'GAMES' | 'SMARTPHONES' | 'FURNITURE' | 'SALE';

export interface User {
  id: string;
  name: string;
  email: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
}