// src/app.tsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Products from "./components/Products";
import LandingPage from "./components/LandingPage";
import Navbar from "./components/Navbar";
import {Register} from "./components/Register";
import { Login } from "./components/Login";
import { AuthProvider } from "./contexts/AuthContext";
import { Profile } from "./components/Profile";

const App: React.FC = () => {
  return (
    <AuthProvider>
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/products" element={<Products />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
      </div>
      </AuthProvider>
  )
};

export default App;
