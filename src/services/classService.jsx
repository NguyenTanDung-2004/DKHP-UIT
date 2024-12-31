import axiosClient from "./axiosClient"; // Import axios client with interceptors

const classService = {
	getAllClasses: async () => {
		try {
			const response = await axiosClient.get("/class/getAllClass"); // Gửi GET request tới endpoint
			return response.data; // Trả về dữ liệu nhận được từ API
		} catch (error) {
			console.error("Error fetching classes:", error);
			throw error;
		}
	},

	// Thêm lớp học không có thực hành
	addClassNonTH: async (classData) => {
		try {
			const response = await axiosClient.post(
				"/class/addClassNonTH",
				classData
			);
			return response.data;
		} catch (error) {
			console.error("Error adding class without practice:", error);
			throw error;
		}
	},

	// Thêm lớp học có thực hành
	addClassWithInPractice: async (classData) => {
		try {
			const response = await axiosClient.post(
				"/class/addClassWithInPractice",
				classData
			);
			return response.data;
		} catch (error) {
			console.error("Error adding class with practice:", error);
			throw error;
		}
	},

  // Hàm gửi yêu cầu xóa lớp học
  deleteClass: async (classId) => {
    try {
      const response = await axiosClient.post(`/class/deleteClass?classId=${classId}`);
      return response.data;
    } catch (error) {
      console.error("Error deleting class:", error);
      throw error;
    }
  }
};

export default classService;
