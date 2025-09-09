// src/services/authService.ts
import axios from "axios";
import { RegisterFormData, LoginFormData } from "../components/types";

const API_URL = "http://localhost:3000/users";

export const registerUser = async (data: RegisterFormData) => {
  const res = await axios.post(`${API_URL}/register`, data);
  return res.data;
};

export const loginUser = async (data: LoginFormData) => {
  const res = await axios.post(`${API_URL}/login`, data);
  return res.data;
};
