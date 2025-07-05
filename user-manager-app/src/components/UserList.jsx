// src/components/UserList.jsx
import React from 'react';
import { useUsers } from '../context/UserContext';
import UserCard from './UserCard';

const UserList = ({ onEditUser }) => {
  const { usersForRender, deleteUser, userFetchError } = useUsers();

  if (usersForRender.length === 0) {
    return <p className="loading-message">Loading users...</p>;
  }

  return (
    <div>
      {userFetchError && <div className="error-message">{userFetchError}</div>}
      <div className="user-list">
        {usersForRender.map(user => (
          <UserCard
            key={user.id}
            user={user}
            onEdit={() => onEditUser(user)}
            onDelete={() => deleteUser(user.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default UserList;