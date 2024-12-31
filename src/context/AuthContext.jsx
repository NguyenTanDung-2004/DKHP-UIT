import React, { createContext, useState, useContext, useEffect } from "react";
import Cookies from "js-cookie";
import { login } from "../services/authService";  // Import login từ authService

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [userId, setUserId] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Kiểm tra token trong cookie khi component được render lần đầu
    const token = Cookies.get("jwtToken");
    if (token) {
      setIsAuthenticated(true);
      // Thực hiện lấy thông tin người dùng từ token nếu cần thiết
      // Ví dụ: giải mã token hoặc gửi yêu cầu API để lấy thông tin người dùng
    }
  }, []);

  const handleLogin = async (email, password) => {
    try {
      const data = await login(email, password);  // Gọi hàm login từ authService
      setUserId(data.userId);  // Lưu thông tin người dùng
      setIsAuthenticated(true);  // Đánh dấu người dùng đã đăng nhập
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
