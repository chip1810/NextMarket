// src/app.tsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthForm } from "./components/AuthForm";
import Products from "./components/Products";
import LandingPage from "./components/LandingPage";
import Navbar from "./components/Navbar";

const App: React.FC = () => {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/auth" element={<AuthForm />} />
        <Route path="/products" element={<Products />} />
      </Routes>
      </div>
  )
};

export default App;
