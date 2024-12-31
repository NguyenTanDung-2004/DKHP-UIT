import React, { createContext, useState, useContext, useEffect } from "react";
import Cookies from "js-cookie";
import { login } from "../services/authService";  // Import login từ authService
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [userId, setUserId] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [role, setRole] = useState(null); // Store user role

  useEffect(() => {
    // Kiểm tra token trong cookie khi component được render lần đầu
    const token = Cookies.get("jwtToken");
    if (token) {
      setIsAuthenticated(true);
      try {
        const decodedToken = jwtDecode(token); // Giải mã token tại đây
        setRole(decodedToken.role); // Lấy vai trò người dùng từ token
      } catch (error) {
        console.error("Error decoding token", error);
      }
    }
  }, []);
  

  const handleLogin = async (email, password) => {
    try {
      const data = await login(email, password); // Gọi hàm login
      const decodedToken = jwtDecode(data.token); // Giải mã token sau khi đăng nhập thành công
      setUserId(data.userId); // Lưu thông tin người dùng
      setIsAuthenticated(true); // Đánh dấu người dùng đã đăng nhập
      setRole(decodedToken.role); // Lấy vai trò người dùng từ token
      Cookies.set("jwtToken", data.token); // Lưu token vào cookie
    } catch (error) {
      console.error("Login failed:", error);
    }
  };
  

  const handleLogout = () => {
    setUserId(null);
    setIsAuthenticated(false);
    Cookies.remove("jwtToken");  // Xóa token khỏi cookie
  };

  return (
    <AuthContext.Provider value={{ userId, isAuthenticated, handleLogin, handleLogout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook để dễ dàng truy cập AuthContext
export const useAuth = () => useContext(AuthContext);
