import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Login from '../pages/Login';
import Register from '../pages/Register';

const LandingPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      navigate('/myworkouts');
    }
  }, [navigate]);

  return (
    <div>
      <h1>Fitness Tracker App</h1>
      <div>
        <button onClick={() => setIsLogin(true)}>Login</button>
        <button onClick={() => setIsLogin(false)}>Register</button>
      </div>
      <div>
        {isLogin ? <Login /> : <Register />}
      </div>
    </div>
  );
};

export default LandingPage;
