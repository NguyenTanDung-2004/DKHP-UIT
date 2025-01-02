import axiosClient from "./axiosClient";

const login = async (body) => {
  try {
    const response = await axiosClient.post("/user/login", body);
    // Lúc này token JWT đã được backend lưu trong cookie
    console.log("Login successful", response.data);
  } catch (error) {
    console.error("Login failed", error);
  }
};

const logout = async () => {
  try {
    const response = await axiosClient.post("/user/logout");
    console.log("Logout successful", response.data.status);
  } catch (error) {
    console.error("Login failed", error);
  }
};

const resetPassword = async (account) => {
  try {
    // Gửi yêu cầu GET với tham số `account`
    const response = await axiosClient.get(`/user/reset-password`, {
      params: { account: account }, // Gửi tham số qua query string
    });
    console.log("Password reset response:", response.data);
  } catch (error) {
    console.error("Error resetting password:", error);
  }
};

export { login, logout, resetPassword };
