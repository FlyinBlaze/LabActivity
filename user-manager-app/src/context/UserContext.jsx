// src/context/UserContext.jsx
import React, { createContext, useContext, useEffect, useRef, useState } from 'react';

const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
  // useRef to store the canonical list of users without causing re-renders on its own.
  const usersRef = useRef([]);
  // A separate state is used to trigger re-renders when the ref's data changes.
  const [usersForRender, setUsersForRender] = useState([]);
  const [userFetchError, setUserFetchError] = useState('');

  // useEffect to fetch initial users only once when the app loads.
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('https://reqres.in/api/users');
        const json = await response.json();
        usersRef.current = json.data;
        setUsersForRender([...usersRef.current]); // Update state to trigger render
      } catch (error) {
        setUserFetchError('Failed to load users from the server. Showing demo users.');
        // Demo users fallback
        usersRef.current = [
          {
            id: 1,
            email: 'george.bluth@reqres.in',
            first_name: 'George',
            last_name: 'Bluth',
            avatar: 'https://reqres.in/img/faces/1-image.jpg',
          },
          {
            id: 2,
            email: 'janet.weaver@reqres.in',
            first_name: 'Janet',
            last_name: 'Weaver',
            avatar: 'https://reqres.in/img/faces/2-image.jpg',
          },
        ];
        setUsersForRender([...usersRef.current]);
      }
    };

    fetchUsers();
  }, []); // Empty dependency array ensures this runs only once.

  // --- CRUD Operations ---
  // All operations modify the ref directly, then update state to re-render.

  const addUser = (user) => {
    const newUser = {
      ...user,
      id: Date.now(), // Generate a simple unique ID for new users
      avatar: user.avatar || `https://i.pravatar.cc/150?u=${Date.now()}` // Default avatar
    };
    usersRef.current.push(newUser);
    setUsersForRender([...usersRef.current]);
  };

  const editUser = (updatedUser) => {
    const index = usersRef.current.findIndex(u => u.id === updatedUser.id);
    if (index !== -1) {
      usersRef.current[index] = updatedUser;
      setUsersForRender([...usersRef.current]);
    }
  };

  const deleteUser = (userId) => {
    usersRef.current = usersRef.current.filter(u => u.id !== userId);
    setUsersForRender([...usersRef.current]);
  };

  const value = { usersRef, usersForRender, addUser, editUser, deleteUser, userFetchError };

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
};

export const useUsers = () => useContext(UserContext);