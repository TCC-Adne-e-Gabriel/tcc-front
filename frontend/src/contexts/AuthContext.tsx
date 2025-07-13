import React, { useState, useEffect, createContext, useContext } from 'react';
import * as jwtDecodeModule from 'jwt-decode';
const jwtDecode = (jwtDecodeModule as any).default as <T>(token: string) => T;


import { login as apiLogin, register as apiRegister, getCurrentUser } from '../services/authService';
import type { LoginData, RegisterData, User } from '../types';

interface TokenPayload {
  sub: string;
  role: string;
  exp: number;
}

interface AuthContextType {
  user: User | null;
  role: string | null;
  isAuthenticated: boolean;
  login: (data: LoginData) => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  logout: () => void;
  updateUser: (user: User) => void;
}

const AuthContext = createContext<AuthContextType>(null!);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [role, setRole] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      setIsAuthenticated(false);
      return;
    }
    try {
      const payload = jwtDecode<TokenPayload>(token);
      
      if (payload.exp * 1000 < Date.now()) {
        throw new Error('Token expired');
      }
      setRole(payload.role);
      setIsAuthenticated(true);

      getCurrentUser().then(setUser).catch(() => {
        localStorage.removeItem('token');
        setIsAuthenticated(false);
      });
    } catch {
      localStorage.removeItem('token');
      setIsAuthenticated(false);
    }
  }, []);

  const login = async (data: LoginData) => {
    const accessToken = await apiLogin(data);
    localStorage.setItem('token', accessToken);

    const { sub, role: r, exp } = jwtDecode<TokenPayload>(accessToken);
    setRole(r);
    setIsAuthenticated(true);

    const me = await getCurrentUser();
    setUser(me);

    const msUntilExpiry = exp * 1000 - Date.now();
    setTimeout(logout, msUntilExpiry);
  };

  const register = async (data: RegisterData) => {
    await apiRegister(data);
    await login({ email: data.email, password: data.password });
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
    setRole(null);
    setIsAuthenticated(false);
  };

  const updateUser = (u: User) => setUser(u)

  return (
    <AuthContext.Provider
      value={{ user, role, isAuthenticated, login, register, logout, updateUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
