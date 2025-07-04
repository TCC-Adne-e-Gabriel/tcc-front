export interface CategoryResponse {
  id: string;
  name: string;
  description: string;
  created_at: string;
  updated_at: string;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  sku: string;
  quantity: number;
  available: boolean;
  imageUrl?: string;
  categories: CategoryResponse[];
  created_at: string;
  updated_at: string;
}

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
  price: number;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface RegisterData extends LoginData {
  name: string;
  confirmPassword: string;
}

export type OrderStatus = 'PENDING' | 'SHIPPED' | 'DELIVERED' | 'CANCELLED';

export interface Order {
  id: string;
  userId: string;
  items: CartItem[];
  total: number;
  status: OrderStatus;
  createdAt: string;
  updatedAt: string;
}