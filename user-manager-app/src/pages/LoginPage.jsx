// src/pages/LoginPage.jsx
import React from 'react';
import LoginForm from '../components/LoginForm';

const LoginPage = () => {
    return (
        <div className="login-page">
            <h1>User Manager</h1>
            <p>Welcome! Please log in to continue.</p>
            <LoginForm />
        </div>
    );
};

export default LoginPage;