import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../UserContext';

const Logout = () => {
  const { logout } = useContext(UserContext); // Get the logout function from UserContext
  const navigate = useNavigate();

  useEffect(() => {
    logout(); // Call the logout function to clear user context and token
    navigate('/'); // Redirect to landing page after logout
  }, [logout, navigate]);

  return (
    <div>
      <h2>Logging out...</h2>
    </div>
  );
};

export default Logout;
