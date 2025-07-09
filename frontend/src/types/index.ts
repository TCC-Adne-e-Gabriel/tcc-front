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

export interface CartItem {
  id: string;
  product: Product;
  quantity: number;
  price: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  created_at: string;
  updated_at: string;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface RegisterData {
  name: string;
  email: string;
  phone: string;
  password: string;
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

export interface CreateOrderRequest {
  freight: number;
  products: { product_id: string; quantity: number }[];
}

export interface OrderResponse {
  id: string;
  created_at: string;
  updated_at: string;
  freight: number;
  status: string;
  products: {
    id: string;
    name: string;
    price: number;
    quantity: number;
    imageUrl?: string;
  }[];
}

export interface CreatePaymentRequest {
  payment_method: 'pix';
  order_id: string;
  total_amount: number;
}

export interface PaymentResponse {
  id: string;
  order_id: string;
}