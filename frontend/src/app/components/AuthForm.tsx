// src/components/AuthForm.tsx
import React, { useState } from 'react';
import { RegisterFormData, LoginFormData } from './types';
import 'bootstrap/dist/css/bootstrap.min.css';

export const AuthForm: React.FC = () => {
  const [isRegister, setIsRegister] = useState(true);
  const [registerData, setRegisterData] = useState<RegisterFormData>({
    username: '',
    full_name: '',
    dob: '',
    phone: '',
    gender: '',
    email: '',
    password: '',
  });
  const [loginData, setLoginData] = useState<LoginFormData>({ email: '', password: '' });
  const [message, setMessage] = useState('');

  // Chuyển tab
  const toggleForm = () => {
    setMessage('');
    setIsRegister(!isRegister);
  };

  // Handle change cho register
  const handleRegisterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setRegisterData(prev => ({ ...prev, [name]: value }));
  };

  // Handle change cho login
  const handleLoginChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginData(prev => ({ ...prev, [name]: value }));
  };

  // Submit register
  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:3000/users/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(registerData),
      });
      const data = await res.json();
      if (res.ok) setMessage('Registration successful!');
      else setMessage(data.message || 'Error during registration');
    } catch (err) {
      setMessage('Network error');
    }
  };

  // Submit login
  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:3000/users/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(loginData),
      });
      const data = await res.json();
      if (res.ok) setMessage(`Welcome ${data.username || data.email}!`);
      else setMessage(data.message || 'Login failed');
    } catch (err) {
      setMessage('Network error');
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: '400px' }}>
      <div className="d-flex justify-content-center mb-3">
        <button className={`btn ${isRegister ? 'btn-primary' : 'btn-outline-primary'} me-2`} onClick={() => setIsRegister(true)}>Register</button>
        <button className={`btn ${!isRegister ? 'btn-primary' : 'btn-outline-primary'}`} onClick={() => setIsRegister(false)}>Login</button>
      </div>

      {isRegister ? (
        <form onSubmit={handleRegisterSubmit}>
          <input className="form-control mb-2" name="username" placeholder="Username" value={registerData.username} onChange={handleRegisterChange} />
          <input className="form-control mb-2" name="full_name" placeholder="Full Name" value={registerData.full_name} onChange={handleRegisterChange} />
          <input className="form-control mb-2" name="dob" type="date" placeholder="Date of Birth" value={registerData.dob} onChange={handleRegisterChange} />
          <input className="form-control mb-2" name="phone" placeholder="Phone" value={registerData.phone} onChange={handleRegisterChange} />
          <input className="form-control mb-2" name="gender" placeholder="Gender" value={registerData.gender} onChange={handleRegisterChange} />
          <input className="form-control mb-2" name="email" type="email" placeholder="Email" value={registerData.email} onChange={handleRegisterChange} required />
          <input className="form-control mb-2" name="password" type="password" placeholder="Password" value={registerData.password} onChange={handleRegisterChange} required />
          <button type="submit" className="btn btn-success w-100">Register</button>
        </form>
      ) : (
        <form onSubmit={handleLoginSubmit}>
          <input className="form-control mb-2" name="email" type="email" placeholder="Email" value={loginData.email} onChange={handleLoginChange} required />
          <input className="form-control mb-2" name="password" type="password" placeholder="Password" value={loginData.password} onChange={handleLoginChange} required />
          <button type="submit" className="btn btn-success w-100">Login</button>
        </form>
      )}

      {message && <div className="alert alert-info mt-3">{message}</div>}
    </div>
  );
};
