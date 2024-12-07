// components/ProtectedRoute.js
import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";

function ProtectedRoute({ children, role }) {
	const { user } = useContext(AuthContext);

	if (!user || user.role !== role) {
		return <Navigate to="/auth" replace />;
	}

	return children;
}

export default ProtectedRoute;
