import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { UserContext } from '../UserContext'; // Correct import path for UserContext

const ProtectedRoute = ({ children }) => {
  const { user } = useContext(UserContext); // Get the user from context

  if (!user || !user.token) {
    return <Navigate to="/" />; // If no user is logged in, redirect to login
  }

  return children;
};

export default ProtectedRoute;
