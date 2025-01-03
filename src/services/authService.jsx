import axiosClient from "./axiosClient";

const login = async (credentials) => {
  try {
    const response = await axiosClient.post("/user/login", {
      userName: credentials.userName,
      password: credentials.password,
    });

    if (response.data) {
      return {
        success: true,
        data: response.data,
      };
    }
  } catch (error) {
    const errorMessage = error.response?.data?.message || "Network Error";
    return {
      success: false,
      error: errorMessage,
    };
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
