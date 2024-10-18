import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate()
  const login = async () => {
    try {
      const response = await fetch('http://localhost:8080/user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem('jwtToken', data.token);
        localStorage.setItem('user_role', data.role);
        localStorage.setItem('user_id', data.user_id);
        console.log('Login successful! Token:', data.token);
        console.log('role:', data.role);
        navigate('/')
        
      } else {
        setError('Login failed: Invalid credentials or server error.');
      }
    } catch (error) {
      console.error('An error occurred during login:', error);
      setError('An error occurred. Please try again later.');
    }
  };

  return (
    <div className="login-form">
      <h2>Login</h2>
      <input
        type="text"
        placeholder="Username"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={login}>Login</button>
      {error && <p className="error">{error}</p>}
    </div>
  );
};

export default LoginPage;


