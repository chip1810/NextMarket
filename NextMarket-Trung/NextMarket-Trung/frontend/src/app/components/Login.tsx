import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser } from "../services/authService";
import { LoginFormData } from './types';
import { useAuth } from "../contexts/AuthContext";

export const Login: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [loginData, setLoginData] = useState<LoginFormData>({ email: '', password: '' });
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await loginUser(loginData);
      login(response.user, response.access_token);
      setMessage(`Welcome ${response.user.username || response.user.email}!`);
      navigate("/");
    } catch (err: any) {
      setMessage(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: '400px' }}>
      <h2 className="mb-3">Login</h2>
      <form onSubmit={handleSubmit}>
        <input 
          className="form-control mb-2" 
          name="email" 
          type="email" 
          placeholder="Email" 
          value={loginData.email} 
          onChange={handleChange} 
          required 
          disabled={loading}
        />
        <input 
          className="form-control mb-2" 
          name="password" 
          type="password" 
          placeholder="Password" 
          value={loginData.password} 
          onChange={handleChange} 
          required 
          disabled={loading}
        />
        <button 
          type="submit" 
          className="btn btn-success w-100"
          disabled={loading}
        >
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>
      {message && <div className="alert alert-info mt-3">{message}</div>}
    </div>
  );
};