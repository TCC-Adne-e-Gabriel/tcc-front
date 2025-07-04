import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { CartProvider } from './contexts/CartContext';
import MainLayout from './components/Layout/MainLayout';
import HomePage from './pages/HomePage/HomePage';
import LoginPage from './pages/Auth/LoginPage';
import SignupPage from './pages/Auth/SignupPage';
import CartPage from './pages/Cart/CartPage';
import ProductsPage from './pages/Products/ProductsPage';
import OrdersPage from './pages/Orders/OrdersPage';

const App: React.FC = () => {
  return (
    <Router>
      <AuthProvider>
        <CartProvider>
          <MainLayout>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/signup" element={<SignupPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/products/:category" element={<ProductsPage />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/orders" element={<OrdersPage />} />
            </Routes>
          </MainLayout>
        </CartProvider>
      </AuthProvider>
    </Router>
  );
};

export default App;