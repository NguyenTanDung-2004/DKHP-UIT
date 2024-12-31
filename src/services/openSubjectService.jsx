import axiosClient from './axiosClient';

const getAllOpenSubjects = async () => {
  try {
    const response = await axiosClient.get("/openSubject/getAllOpenSubject"); // Gọi API GET
    return response.data;  // Trả về dữ liệu nhận được từ API
  } catch (error) {
    console.error("Error fetching open subjects:", error);
    throw error;
  }
};

// Hàm gửi danh sách các môn học tới backend
const addListOpenSubject = async (listSubjectId) => {
  try {
    const response = await axiosClient.post("/openSubject/addListOpenSubject", {
      listSubjectId: listSubjectId
    });
    return response.data;
  } catch (error) {
    console.error("Error adding list of open subjects:", error);
    throw error;
  }
};

// Hàm gửi yêu cầu xóa các môn học mở
const deleteOpenSubjects = async (listSubjectId) => {
  try {
    // Gửi yêu cầu POST với tham số listSubjectId
    const response = await axiosClient.post("/openSubject/deleteOpenSubject", {
      listSubjectId: listSubjectId
    });
    return response.data; // Trả về dữ liệu nhận được từ API
  } catch (error) {
    console.error("Error deleting open subjects:", error);
    throw error; // Ném lỗi nếu có sự cố
  }
};

// Export các hàm dịch vụ
const openSubjectService = {
  getAllOpenSubjects,
  addListOpenSubject,
  deleteOpenSubjects,
};

export default openSubjectService;
