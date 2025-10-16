import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  // Check if user is logged in (has token)
  const token = localStorage.getItem('token');

  if (!token) {
    // Redirect to sign in page if not logged in
    return <Navigate to="/signin" replace />;
  }

  return children;
};

export default ProtectedRoute;
