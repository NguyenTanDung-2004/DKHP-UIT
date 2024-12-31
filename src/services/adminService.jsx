import axiosClient from "./clientAxios";  // Import the axios client with interceptors

const adminService = {

  createStaffAccount: async (staffData) => {
    try {
      const response = await axiosClient.post("/admin/createStaffAccount", staffData);
      return response.data; // Trả về dữ liệu từ API
    } catch (error) {
      console.error("Error creating staff account:", error);
      throw error; // Ném lỗi để xử lý bên ngoài
    }
  }
};

export default adminService;
