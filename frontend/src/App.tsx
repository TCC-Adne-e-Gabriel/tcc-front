import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { CartProvider, useCart } from './contexts/CartContext';
import MainLayout from './components/Layout/MainLayout';
import CartSidebar from './components/CartSidebar/CartSidebar';
import RequireAuth from './components/RequireAuth/RequireAuth';

import HomePage from './pages/HomePage/HomePage';
import ProductsPage from './pages/Products/ProductsPage';
import ProductDetailPage from './pages/ProductDetailPage/ProductDetailPage';
import LoginPage from './pages/Auth/LoginPage';
import SignupPage from './pages/Auth/SignupPage';

import OrdersPage from './pages/Orders/OrdersPage';
import OrderPage from './pages/Order/OrderPage';
import PaymentPage from './pages/Payment/PaymentPage';
import ProfilePage from './pages/Profile/ProfilePage';
import EditProfilePage from './pages/Profile/EditProfilePage';
import ChangePasswordPage from './pages/Auth/ChangePasswordPage';

import NotFoundPage from './pages/NotFoundPage/NotFoundPage';

const AppContent: React.FC = () => {
  const [cartOpen, setCartOpen] = useState(false);
  const { totalItems } = useCart();

  return (
    <>
      <Routes>
        <Route
          element={
            <MainLayout
              onCartClick={() => setCartOpen(true)}
              cartCount={totalItems}
            />
          }
        >
          {/* Public routes */}
          <Route index element={<HomePage />} />
          <Route path="products" element={<ProductsPage />} />
          <Route path="product/:productId" element={<ProductDetailPage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="signup" element={<SignupPage />} />

          {/* Protected routes */}
          <Route element={<RequireAuth><Outlet/></RequireAuth>}>
            <Route path="orders" element={<OrdersPage />} />
            <Route path="order" element={<OrderPage />} />
            <Route path="payment/:orderId" element={<PaymentPage />} />
            <Route path="profile" element={<ProfilePage />} />
            <Route path="profile/edit" element={<EditProfilePage />} />
            <Route path="profile/change-password" element={<ChangePasswordPage />} />
          </Route>

          {/* Catch‑all */}
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>

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
