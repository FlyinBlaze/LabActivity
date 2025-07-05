// src/components/UserCard.jsx
import React from 'react';

const UserCard = ({ user, onEdit, onDelete }) => {
  const fullName = `${user.first_name || ''} ${user.last_name || ''}`.trim();

  return (
    <div className="user-card">
      <img src={user.avatar} alt={`${fullName}'s avatar`} className="user-avatar" />
      <div className="user-info">
        <h3>{fullName || 'User Name'}</h3>
        <p>{user.email}</p>
      </div>
      <div className="user-actions">
        <button onClick={onEdit} className="btn-edit">Edit</button>
        <button onClick={onDelete} className="btn-delete">Delete</button>
      </div>
    </div>
  );
};

export default UserCard;