// src/Components/ProtectedRoute.js
import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import { useAuth } from '../auth/auth'; // Make sure to create and use an Auth context

const ProtectedRoute = ({ element, ...rest }) => {
  const { user } = useAuth(); // Get the current user from your auth context

  return (
    <Route 
      {...rest} 
      element={user ? element : <Navigate to="/login" />} 
    />
  );
};

export default ProtectedRoute;
