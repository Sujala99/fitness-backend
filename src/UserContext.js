import React, { createContext, useState, useEffect } from 'react';

// Create the context
export const UserContext = createContext();

// Create the provider component
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null); // To hold user info like token, id, etc.
  
  useEffect(() => {
    // Check if user token is stored in localStorage when app starts
    const token = localStorage.getItem('token');
    if (token) {
      // Ideally, you would decode the token to get the user's info
      setUser({ token });
    }
  }, []);

  // Function to log in the user and store token in localStorage
  const login = (token) => {
    localStorage.setItem('token', token);
    setUser({ token });
  };

  // Function to log out the user
  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};
