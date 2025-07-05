// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { UserProvider } from './context/UserContext';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import ProtectedRoute from './components/ProtectedRoute';
import './App.css'; // We will create this file later for styling

function App() {
  return (
    <AuthProvider>
      <UserProvider>
        <Router>
          <div className="App">
            <Routes>
              <Route path="/login" element={<LoginPage />} />
              <Route
                path="/dashboard"
                element={
                  <ProtectedRoute>
                    <DashboardPage />
                  </ProtectedRoute>
                }
              />
              {/* Redirect root path to the dashboard */}
              <Route path="*" element={<Navigate to="/dashboard" />} />
            </Routes>
          </div>
        </Router>
      </UserProvider>
    </AuthProvider>
  );
}

export default App;