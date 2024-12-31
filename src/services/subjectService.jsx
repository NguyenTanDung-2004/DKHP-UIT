import axiosClient from './clientAxios';

//Xóa luôn
export const deleteOneSubject = async (maMonHoc, maKhoa) => {
  try {
    // Gửi yêu cầu POST với các tham số trong query string
    const response = await axiosClient.post(
      `/subject/delete1Subject?maMonHoc=${maMonHoc}&maKhoa=${maKhoa}`
    );
    return response.data; // Trả về dữ liệu nhận được từ API
  } catch (error) {
    console.error("Error deleting subject:", error);
    throw error; // Ném lỗi nếu có sự cố
  }
};

// Export các hàm dịch vụ
const subjectService = {
  deleteOneSubject,
};

export default subjectService;
