import axiosClient from './axiosClient'; // Axios client instance

const ctdtService = {
  addSubjectsToCTDT: async (subjects) => {
    try {
      const response = await axiosClient.post("/CTDT/addSubject", subjects);
      return response.data; // Trả về dữ liệu nhận được từ API
    } catch (error) {
      console.error("Error adding subjects to CTDT:", error);
      throw error; // Ném lỗi nếu có sự cố
    }
  },
  
  //Xóa tạm thời
  deleteSubjectsFromCTDT: async (subjectIds) => {
    try {
      const response = await axiosClient.post("/CTDT/deleteSubject", subjectIds);
      return response.data; // Trả về dữ liệu nhận được từ API
    } catch (error) {
      console.error("Error deleting subjects from CTDT:", error);
      throw error; // Ném lỗi nếu có sự cố
    }
  }
};

export default ctdtService;
