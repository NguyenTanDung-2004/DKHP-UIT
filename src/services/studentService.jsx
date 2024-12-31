import axiosClient from "./axiosClient";

const studentService = {

  // Register classes for the student
  dkhpStudent: async (studentData, token) => {
    try {
      // Gửi request POST với token trong query string
      const response = await axiosClient.post(
        `/student/dkhp?token=${token}`,  // Thêm token vào URL query string
        studentData  // Dữ liệu gửi trong body của request
      );
      return response.data;
    } catch (error) {
      console.error("Error registering student:", error);
      throw error;
    }
  },

  undkhpStudent: async (studentData, token) => {
    try {
      // Thêm token vào query string
      const response = await axiosClient.post(
        `/student/undkhp?token=${token}`,  // Thêm token vào URL
        studentData  // Dữ liệu gửi trong body của request
      );
      return response.data;
    } catch (error) {
      console.error("Error cancelling student registration:", error);
      throw error;
    }
  },

  getRegisteredClasses: async (studentData, token) => {
    try {
      // Gửi request POST với token trong query string
      const response = await axiosClient.post(
        `/student/getRegisteredClasses?token=${token}`,  // Thêm token vào URL query string
        studentData  // Dữ liệu gửi trong body của request (nếu cần)
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching registered classes:", error);
      throw error;
    }
  },

  getStudentDetails: async (mssv) => {
    try {
      const response = await axiosClient.post("/student/getDetailStudent", { mssv }); // Gửi mssv trong body
      return response.data;  // Trả về dữ liệu nhận được từ API
    } catch (error) {
      console.error("Error fetching student details:", error);
      throw error;
    }
  },

  //Tạo tài khoản với mật khẩu  
  createStudentAccounts: async (studentIds) => {
    try {
      const response = await axiosClient.post("/student/createStudentAccount", studentIds);
      return response.data; // Trả về dữ liệu từ API
    } catch (error) {
      console.error("Error creating student accounts:", error);
      throw error; // Ném lỗi để xử lý bên ngoài
    }
  },

  createStudentAccountsNoPw: async (students) => {
    try {
      const response = await axiosClient.post("/student/createStudentAccountt", students);
      return response.data; // Trả về dữ liệu từ API
    } catch (error) {
      console.error("Error creating student accounts:", error);
      throw error; // Ném lỗi để xử lý bên ngoài
    }
  },

  openDKHP: async () => {
    try {
      const response = await axiosClient.post("/student/openDKHP");
      return response.data; // Trả về phản hồi từ API
    } catch (error) {
      console.error("Error opening DKHP:", error);
      throw error;
    }
  },

  closeDKHP: async () => {
    try {
      const response = await axiosClient.post("/student/closeDKHP");
      return response.data; // Trả về phản hồi từ API
    } catch (error) {
      console.error("Error closing DKHP:", error);
      throw error;
    }
  }
};

export default studentService;
