import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { CartProvider, useCart } from './contexts/CartContext';
import MainLayout from './components/Layout/MainLayout';
import HomePage from './pages/HomePage/HomePage';
import ProductsPage from './pages/Products/ProductsPage';
import ProductDetailPage from './pages/ProductDetailPage/ProductDetailPage';
import OrderPage from './pages/Order/OrderPage';
import PaymentPage from './pages/Payment/PaymentPage';
import OrdersPage from './pages/Orders/OrdersPage';
import LoginPage from './pages/Auth/LoginPage';
import SignupPage from './pages/Auth/SignupPage';
import CartSidebar from './components/CartSidebar/CartSidebar';

const AppContent: React.FC = () => {
  const [cartOpen, setCartOpen] = useState(false);
  const { totalItems } = useCart();

  return (
    <>
      <MainLayout onCartClick={() => setCartOpen(true)} cartCount={totalItems}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/product/:productId" element={<ProductDetailPage />} />
          <Route path="/orders" element={<OrdersPage />} />
          <Route path="/order" element={<OrderPage />} />
          <Route path="/payment/:orderId" element={<PaymentPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </MainLayout>
      <CartSidebar open={cartOpen} onClose={() => setCartOpen(false)} />
    </>
  );
};

const App: React.FC = () => (
  <Router>
    <AuthProvider>
      <CartProvider>
        <AppContent />
      </CartProvider>
    </AuthProvider>
  </Router>
);

export default App;
