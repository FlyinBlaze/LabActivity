// src/pages/DashboardPage.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useUsers } from '../context/UserContext';
import UserList from '../components/UserList';
import UserForm from '../components/UserForm';

const DashboardPage = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const { addUser, editUser } = useUsers();

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleOpenFormForAdd = () => {
    setEditingUser(null);
    setIsFormOpen(true);
  };

  const handleOpenFormForEdit = (user) => {
    setEditingUser(user);
    setIsFormOpen(true);
  };

  const handleSaveUser = (user) => {
    if (editingUser) {
      editUser(user);
    } else {
      addUser(user);
    }
    setIsFormOpen(false);
  };

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <h2>Users Dashboard</h2>
        <div>
          <button onClick={handleOpenFormForAdd} className="btn-add">Add New User</button>
          <button onClick={handleLogout} className="btn-logout">Logout</button>
        </div>
      </header>

      {isFormOpen && (
        <div className="modal-overlay">
          <UserForm
            currentUser={editingUser}
            onSave={handleSaveUser}
            onCancel={() => setIsFormOpen(false)}
          />
        </div>
      )}

      <UserList onEditUser={handleOpenFormForEdit} />
    </div>
  );
};

export default DashboardPage;