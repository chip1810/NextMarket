// src/types.ts
export interface RegisterFormData {
  username?: string;
  full_name?: string;
  dob?: string;
  phone?: string;
  gender?: string;
  email: string;
  password: string;
}

export interface LoginFormData {
  email: string;
  password: string;
}
// User interface for authenticated user
export interface User {
  id: number;
  uuid: string;
  email: string;
  username: string;
  profile?: {
    full_name?: string;
    phone?: string;
    gender?: string;
  };
}
// Login response interface
export interface LoginResponse {
  access_token: string;
  user: User;
}

// types/Product.ts
export interface Product {
  id: number;
  uuid: string;
  name: string | null;
  slug: string | null;
  short_description: string | null;
  description: string | null;
  base_price: number | null;
  status: string | null;
  created_at: string;
  updated_at: string;
}
