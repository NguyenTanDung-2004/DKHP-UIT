// components/ProtectedRoute.js
import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";

function ProtectedRoute({ children, role }) {
	const { userInfo } = useContext(AuthContext);

	if (!userInfo || userInfo.role !== role) {
		return <Navigate to="/auth" replace />;
	}

	return children;
}

export default ProtectedRoute;
