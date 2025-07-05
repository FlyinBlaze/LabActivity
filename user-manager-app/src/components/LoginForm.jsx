// src/components/LoginForm.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useUsers } from '../context/UserContext';

const DEFAULT_PASSWORD = "password123";

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();
  const { usersRef } = useUsers();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    // Always allow demo login
    if (email === 'george.bluth@reqres.in' && password === DEFAULT_PASSWORD) {
      login();
      navigate('/dashboard');
      return;
    }

    // If users are still loading, show a loading error
    if (!usersRef.current || usersRef.current.length === 0) {
      setError('User list is still loading. Please wait a moment and try again.');
      return;
    }

    // Otherwise, check the user list
    const userExists = usersRef.current.some(user => user.email === email);
    if (userExists && password === DEFAULT_PASSWORD) {
      login();
      navigate('/dashboard');
    } else {
      setError('Invalid email or password. Please try again.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="login-form">
      {error && <div className="error-message">{error}</div>}
      <div className="form-group">
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="e.g., george.bluth@reqres.in"
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <small>Hint: The password for all users is `{DEFAULT_PASSWORD}`</small>
      </div>
      <button type="submit">Login</button>
    </form>
  );
};

export default LoginForm;