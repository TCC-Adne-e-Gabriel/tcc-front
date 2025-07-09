import React, { createContext, useContext, useEffect, useState } from 'react';
import { getCurrentUser, login as apiLogin, register as apiRegister } from '../services/authService';
import { User, RegisterData, LoginData } from '../types';

interface AuthContextType {
  user: User | null;
  login: (data: LoginData) => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  logout: () => void;
  updateUser: (user: User) => void;
}

const AuthContext = createContext<AuthContextType>(null!);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await getCurrentUser();
        setUser(userData);
      } catch {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  const login = async (data: LoginData) => {
    const token = await apiLogin(data);
    localStorage.setItem('token', token);
    const user = await getCurrentUser();
    setUser(user);
  };

  const register = async (data: RegisterData) => {
    await apiRegister(data);
    await login({ email: data.email, password: data.password });
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  const updateUser = (u: User) => setUser(u);

  const value = { user, login, register, logout, updateUser };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
