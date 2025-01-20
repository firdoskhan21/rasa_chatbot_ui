import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoute = ({ isAuthenticated, isAdmin }) => {
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  if (isAdmin) {
    return <Outlet />;
  }

  return <Navigate to="/user/welcome" />;
};

export default PrivateRoute;
