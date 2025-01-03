// import React from "react";
// import { Navigate } from "react-router-dom"; // For React Router v6
// import { useAuth } from "../context/AuthContext"; // Assuming you have AuthContext to manage user authentication

// const ProtectedRoute = ({ children, roleRequired }) => {
//   const { isAuthenticated, role } = useAuth();

//   if (!isAuthenticated) {
//     // Redirect to login page if not authenticated
//     return <Navigate to="/auth" replace />;
//   }

//   if (role !== roleRequired) {
//     // Redirect to Not Found page if the role does not match
//     return <Navigate to="/" replace />;
//   }

//   return children;
// };

// export default ProtectedRoute;
import React from "react";
import { Navigate } from "react-router-dom";
import Cookies from "js-cookie";

const ProtectedRoute = ({ children }) => {
  const token = Cookies.get("jwtToken");

  if (!token) {
    return <Navigate to="/auth" replace />;
  }
  return children;
};

export default ProtectedRoute;
