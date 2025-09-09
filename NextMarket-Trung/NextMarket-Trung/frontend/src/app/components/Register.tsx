import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerUser } from "../services/authService";
import { RegisterFormData } from './types';

export const Register: React.FC = () => {
  const navigate = useNavigate();
  const [registerData, setRegisterData] = useState<RegisterFormData>({
    username: '',
    full_name: '',
    dob: '',
    phone: '',
    gender: '',
    email: '',
    password: '',
  });
  const [message, setMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setRegisterData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await registerUser(registerData);
      setMessage("Registration successful!");
      navigate("/login"); // Redirect sau khi đăng ký thành công
    } catch (err: any) {
      setMessage(err.response?.data?.message || "Error during registration");
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: '400px' }}>
      <h2 className="mb-3">Register</h2>
      <form onSubmit={handleSubmit}>
        <input className="form-control mb-2" name="username" placeholder="Username" value={registerData.username} onChange={handleChange} />
        <input className="form-control mb-2" name="full_name" placeholder="Full Name" value={registerData.full_name} onChange={handleChange} />
        <input className="form-control mb-2" name="dob" type="date" placeholder="Date of Birth" value={registerData.dob} onChange={handleChange} />
        <input className="form-control mb-2" name="phone" placeholder="Phone" value={registerData.phone} onChange={handleChange} />
        <input className="form-control mb-2" name="gender" placeholder="Gender" value={registerData.gender} onChange={handleChange} />
        <input className="form-control mb-2" name="email" type="email" placeholder="Email" value={registerData.email} onChange={handleChange} required />
        <input className="form-control mb-2" name="password" type="password" placeholder="Password" value={registerData.password} onChange={handleChange} required />
        <button type="submit" className="btn btn-success w-100">Register</button>
      </form>
      {message && <div className="alert alert-info mt-3">{message}</div>}
    </div>
  );
};
