import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ element }) => {
 const accessToken = localStorage.getItem("accessToken");

 console.log(accessToken)

  if (!accessToken) {
    return <Navigate to="/login" />;
  }

  return element;
};

export default ProtectedRoute;
