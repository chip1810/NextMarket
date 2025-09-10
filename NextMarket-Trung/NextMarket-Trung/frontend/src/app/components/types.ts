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
  status?: string; // Add this
  created_at?: string; // Add this
  updated_at?: string; // Add this
  profile?: {
    full_name?: string;
    phone?: string;
    gender?: string;
    dob?: string; // Add this
    avatar_url?: string; // Add this
    bio?: string; // Add this
  };
  addresses?: UserAddress[]; // Add this
}
// Add UserAddress interface
export interface UserAddress {
  id: number;
  uuid: string;
  user_id: number;
  recipient_name?: string;
  phone?: string;
  street?: string;
  city?: string;
  province?: string;
  country?: string;
  postal_code?: string;
  is_default: boolean;
  created_at?: string;
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
