import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ProductList from './components/ProductList';
import CartItemsList from './components/CartItems';
import Register from './components/Registeration';
import Login from './components/Login';
import NavBar from './components/NavBar';

import './App.css';

function App() {
  const [accessToken, setAccessToken] = useState(() => localStorage.getItem('accessToken') || '');
  useEffect(() => {
    if (accessToken) {
      localStorage.setItem('accessToken', accessToken);
    } else {
      localStorage.removeItem('accessToken');
    }
  }, [accessToken]);
  const handleLoginSuccess = (token) => {
    setAccessToken(token);
    
  };
  console.log('token : ',accessToken);
  return (
    
    <section>
      <NavBar/>
      <Router>
        <Routes>
          <Route
            path="/login"
            element={<Login onLoginSuccess={handleLoginSuccess} />}
          />
          <Route
            path="/"
            element={<ProductList accessToken={accessToken} />}
          />
          <Route path="/carts" element={<CartItemsList accessToken={accessToken} />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </Router>
    </section>

  );
}

export default App;