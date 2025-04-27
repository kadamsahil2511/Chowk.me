import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ children, adminOnly = false }) => {
  const { currentUser, loading } = useAuth();
  const location = useLocation();

  // Show nothing while auth state is loading
  if (loading) {
    return null;
  }

  if (!currentUser) {
    // Redirect to the login page if not authenticated, but save the current location
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Optional check for admin routes
  if (adminOnly && !currentUser.isAdmin) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;