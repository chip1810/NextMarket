// src/contexts/AuthContext.tsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from '../components/types';
import { getCurrentUser, logout as logoutService, isAuthenticated, getStoredUser } from '../services/authService';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (userData: User, token: string) => void;
  logout: () => void;
  loading: boolean;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    initializeAuth();
  }, []);

  const initializeAuth = async () => {
    try {
      const token = localStorage.getItem('access_token');
      
      if (token) {
        // Try to get fresh user data from server if we have token
        try {
          const userData = await getCurrentUser();
          setUser(userData);
          console.log('✅ Got fresh user data from server');
        } catch (error) {
          console.warn('⚠️ Failed to get fresh user data, using stored data');
          // Fallback to stored user data
          const storedUser = getStoredUser();
          if (storedUser) {
            setUser(storedUser);
          }
        }
      } else {
        // No token, try stored user data
        const storedUser = getStoredUser();
        if (storedUser) {
          setUser(storedUser);
          console.log('📋 Using stored user data');
        }
      }
    } catch (error) {
      console.error('Error initializing auth:', error);
      // Clear invalid token/data
      logoutService();
    } finally {
      setLoading(false);
    }
  };

  const login = (userData: User, token: string) => {
    setUser(userData);
    if (token) {
      localStorage.setItem('access_token', token);
    }
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    logoutService();
  };

  const refreshUser = async () => {
    try {
      const token = localStorage.getItem('access_token');
      if (token) {
        const userData = await getCurrentUser();
        setUser(userData);
        localStorage.setItem('user', JSON.stringify(userData));
      }
    } catch (error) {
      console.error('Error refreshing user:', error);
      logout();
    }
  };

  const value = {
    user,
    isAuthenticated: !!user,
    login,
    logout,
    loading,
    refreshUser,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};