import React, { createContext, useState, useContext, useEffect } from "react";
import Cookies from "js-cookie";
import { login } from "../services/authService";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [userId, setUserId] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [role, setRole] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Kiểm tra token trong cookie khi component được render lần đầu
    const token = Cookies.get("jwtToken");
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = async (userName, password) => {
    try {
      const response = await login({ userName, password });
      if (response) {
        if (response.success) {
          const { role } = response.data;
          setUserId(userId);
          setIsAuthenticated(true);
          setRole(role.toLowerCase());
          Cookies.set("jwtToken", "token");
          console.log("auth contexxt: " + role);
          navigate(`/${role.toLowerCase()}/trangchu`);
          return true;
        } else {
          console.log("Login Fail with message: " + response.error);
          return false;
        }
      } else {
        console.error("Response is null or undefined");
        return false;
      }
    } catch (error) {
      console.error("Login failed with error:", error);
      return false;
    }
  };
  const handleLogout = () => {
    setUserId(null);
    setIsAuthenticated(false);
    setRole(null);
    Cookies.remove("jwtToken");
  };

  return (
    <AuthContext.Provider
      value={{ userId, isAuthenticated, role, handleLogin, handleLogout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
