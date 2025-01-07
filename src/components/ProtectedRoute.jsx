import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import Cookies from "js-cookie";

const ProtectedRoute = ({ allowedRoles, children }) => {
  const token = Cookies.get("jwtToken");
  const userRole = Cookies.get("roleUser"); // Assuming role is stored in a cookie named 'role'
  const location = useLocation();

  if (!token) {
    // Redirect to login page if there is no token
    return <Navigate to="/auth" state={{ from: location }} replace />;
  }

  if (allowedRoles && !allowedRoles.includes(userRole)) {
    // Redirect to not-found if role does not match
    return <Navigate to="/not-found" state={{ from: location }} replace />;
  }

  return children;
};

export default ProtectedRoute;
