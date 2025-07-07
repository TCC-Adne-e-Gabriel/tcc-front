import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { CartProvider, useCart } from './contexts/CartContext';
import MainLayout from './components/Layout/MainLayout';
import HomePage from './pages/HomePage/HomePage';
import LoginPage from './pages/Auth/LoginPage';
import SignupPage from './pages/Auth/SignupPage';
import CartPage from './pages/Cart/CartPage';
import ProductsPage from './pages/Products/ProductsPage';
import OrderPage from './pages/Order/OrderPage';
import PaymentPage from './pages/Payment/PaymentPage';
import OrdersPage from './pages/Orders/OrdersPage';
import CartSidebar from './components/CartSidebar/CartSidebar';

const AppContent: React.FC = () => {
  const [cartOpen, setCartOpen] = useState(false);
  const { totalItems } = useCart();

  return (
    <>
      <MainLayout onCartClick={() => setCartOpen(true)} cartCount={totalItems}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/products/:category" element={<ProductsPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path='/order' element={<OrderPage />} />
          <Route path='/payment/:orderId' element={<PaymentPage />} />
          <Route path='/orders' element={<OrdersPage />} />
        </Routes>
      </MainLayout>
      <CartSidebar open={cartOpen} onClose={() => setCartOpen(false)} />
    </>
  );
};

const App: React.FC = () => {
  return (
    <Router>
      <AuthProvider>
        <CartProvider>
          <AppContent />
        </CartProvider>
      </AuthProvider>
    </Router>
  );
};

export default App;