import React, { useState } from 'react';
import '../css/Authentification.css';


const Login = ({ onLoginSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [accessToken, setAccessToken] = useState('');

  const handleAuthorizedRequest = async () => {
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`,
      };
      console.log(accessToken);

      console.log('Request Headers:', headers);
      try {
        const response = await fetch('http://localhost:3000', {
          method: 'GET',
          headers: headers,
        });

      // Handle the response accordingly
    } catch (error) {
      console.error('Error during authorized request:', error);
      // Handle errors
    }
  };
  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('https://localhost:7166/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        setAccessToken(data.accessToken); 
        onLoginSuccess(data.accessToken);
        await handleAuthorizedRequest();
        console.log('Login successful');
        window.location.href = '/';
      } else {
        console.error('Login failed');
        setLoginError('Login failed. Please check your email and password.');
      }
    } catch (error) {
      console.error('Error during login:', error);
      setLoginError('An error occurred during login. Please try again later.');
    }
  };
  

  return (
    <div class="Authentification">
      <h2>Login</h2>
      <form onSubmit={handleLogin} class="formAuth">
        <label>Email:</label>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />

        <label>Password:</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />

        <button type="submit">Login</button>
      </form>
      {loginError && <p style={{ color: 'red' }}>{loginError}</p>}
    </div>
  );
};

export default Login;
