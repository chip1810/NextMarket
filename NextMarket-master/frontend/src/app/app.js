import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
// Make sure the path is correct; update if necessary
import RegisterForm from '../components/RegisterForm';
import LoginForm from '../components/LoginForm';

function App() {
  return (
    <Router>
      <nav>
        <Link to="/register">Register</Link>
        <Link to="/login">Login</Link>
      </nav>

      <Routes>
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/login" element={<LoginForm />} />
      </Routes>
    </Router>
  );
}

export default App;
