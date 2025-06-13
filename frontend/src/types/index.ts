export interface Product {
  id: string;
  name: string;
  price: number;
  category: Category;
  description: string;
  imageUrl?: string;
  brand: string;
  specs: Record<string, string>;
}

export type Category = 'HARDWARE' | 'GAMES' | 'SMARTPHONES' | 'FURNITURE' | 'SALE';

export interface User {
  id: string;
  name: string;
  email: string;
  createdAt: string;
}

export interface CartItem {
  id: string;
  product: Product;
  quantity: number;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface RegisterData extends LoginData {
  name: string;
  confirmPassword: string;
}

export interface Order {
  id: string;
  userId: string;
  items: CartItem[];
  total: number;
  status: 'PENDING' | 'SHIPPED' | 'DELIVERED' | 'CANCELLED';
  createdAt: string;
}