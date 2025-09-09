// src/services/authService.ts
import axios from "axios";
import { RegisterFormData, LoginFormData } from "../components/types";

const API_URL = "http://localhost:3000/users";

export const registerUser = async (data: RegisterFormData) => {
  console.log('📤 Sending registration request');
  const res = await axios.post(`${API_URL}/register`, data);
  return res.data;
};

export const loginUser = async (data: LoginFormData) => {
  console.log('📤 Sending login request to:', `${API_URL}/login`);
  console.log('📤 Login data:', data);
  
  const res = await axios.post(`${API_URL}/login`, data);
  
  console.log('📥 Login response:', res.data);
  
  // Save token if exists
  if (res.data.access_token) {
    localStorage.setItem('access_token', res.data.access_token);
    if (res.data.user) {
      localStorage.setItem('user', JSON.stringify(res.data.user));
    }
  } else {
    // If no JWT, just save user data
    localStorage.setItem('user', JSON.stringify(res.data));
  }
  
  return res.data;
};

export const getCurrentUser = async () => {
  const token = localStorage.getItem('access_token');
  
  if (!token) {
    throw new Error('No token available');
  }

  console.log('📤 Getting current user with token:', token);
  
  const res = await axios.get(`${API_URL}/me`, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
  
  return res.data;
};

export const logout = () => {
  localStorage.removeItem('access_token');
  localStorage.removeItem('user');
};

export const isAuthenticated = (): boolean => {
  const token = localStorage.getItem('access_token');
  const user = localStorage.getItem('user');
  return !!(token || user);
};

export const getStoredUser = () => {
  const userStr = localStorage.getItem('user');
  if (userStr) {
    try {
      return JSON.parse(userStr);
    } catch {
      return null;
    }
  }
  return null;
};