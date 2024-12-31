import axios from "axios";

const axiosClient = axios.create({
  baseURL: "http://localhost:8080", // Đảm bảo rằng URL API chính xác
  withCredentials: true, // Hỗ trợ cookies
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosClient;
