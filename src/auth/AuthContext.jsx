import React, { createContext, useContext, useState, useEffect } from 'react';
import API from '../api';
import { toast } from 'react-toastify';
import { User, Tier } from '../types';

interface AuthCtx {
  user: User | null;
  token: string | null;
  signup(data: any): Promise<void>;
  verify(data: any): Promise<void>;
  login(data: any): Promise<void>;
  logout(): void;
  upgradeTier(tier: Tier): Promise<void>;
}

const AuthContext = createContext<AuthCtx>({} as any);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User|null>(null);
  const [token, setToken] = useState<string|null>(null);

  useEffect(() => {
    if (token) API.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  }, [token]);

  async function signup(data: any) {
    await API.post('/api/auth/signup', data);
    toast.success('Signed up! Check your email for the code.');
  }

  async function verify(data: any) {
    await API.post('/api/auth/verify', data);
    toast.success('Account verified!');
  }

  async function login(data: any) {
    const res = await API.post('/api/auth/login', data);
    setToken(res.data.token);
    setUser(res.data.user);
    toast.success(`Welcome back, ${res.data.user.name}!`);
  }

  function logout() {
    setToken(null);
    setUser(null);
  }

  async function upgradeTier(tier: Tier) {
    await API.post('/api/auth/upgrade', { tier });
    setUser(prev => prev ? { ...prev, tier } : prev);
    toast.success(`Upgraded to ${tier}!`);
  }

  return (
    <AuthContext.Provider value={{ user, token, signup, verify, login, logout, upgradeTier }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);