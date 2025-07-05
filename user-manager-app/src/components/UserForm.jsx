// src/components/UserForm.jsx
import React, { useState, useEffect } from 'react';

const UserForm = ({ currentUser, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    avatar: '',
  });

  useEffect(() => {
    // If we are editing an existing user, pre-fill the form
    if (currentUser) {
      setFormData(currentUser);
    } else {
      // Otherwise, ensure the form is blank for adding a new user
      setFormData({ first_name: '', last_name: '', email: '', avatar: '' });
    }
  }, [currentUser]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ ...currentUser, ...formData });
  };

  return (
    <div className="user-form-container">
      <form onSubmit={handleSubmit} className="user-form">
        <h2>{currentUser ? 'Edit User' : 'Add New User'}</h2>
        <div className="form-group">
          <label>First Name</label>
          <input type="text" name="first_name" value={formData.first_name} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Last Name</label>
          <input type="text" name="last_name" value={formData.last_name} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>Email</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Avatar URL (Optional)</label>
          <input type="text" name="avatar" value={formData.avatar} onChange={handleChange} />
        </div>
        <div className="form-actions">
          <button type="submit" className="btn-save">Save</button>
          <button type="button" onClick={onCancel} className="btn-cancel">Cancel</button>
        </div>
      </form>
    </div>
  );
};

export default UserForm;