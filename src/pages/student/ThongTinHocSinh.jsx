import React, { useState, useEffect } from "react";
import "./ThongTinHocSinh.css";
import { useAuth } from "../../context/AuthContext";
import studentService from './../../services/studentService';
import AddressForm from "./../../components/AddressForm";
import AddressForm1 from "./../../components/AddressForm2"; // Import AddressForm2

const ThongTinHocSinh = () => {

	const { userId } = useAuth();

	const [formData, setFormData] = useState({
    mssv: "",
    tenDayDu: "",
    tenKhoa: "",
    tenNganh: "",
    diaChiChiTiet: "",
    tinh_thanhPho: "",
    quan_huyen: "",
    xa_phuong: "",
    gioiTinh: "",
    noiSinh: "",
    diaChiChiTiet1: "",
    tinh_thanhPho1: "",
    quan_huyen1: "",
    xa_phuong1: "",
    ngaySinh: "",
    cmnd: "",
    emailCaNhan: "",
    password: "",
		code: ""
  });

	useEffect(() => {
    const fetchStudentInfo = async () => {
      if (userId) {
        try {
          const studentData = await studentService.getStudentDetails(userId);
          setFormData({
            mssv: studentData.mssv || "",
            tenDayDu: studentData.tenDayDu || "",
            tenKhoa: studentData.tenKhoa || "",
            tenNganh: studentData.tenNganh || "",
            diaChiChiTiet: studentData.diaChiChiTiet || "",
            tinh_thanhPho: studentData.tinh_thanhPho || "",
            quan_huyen: studentData.quan_huyen || "",
            xa_phuong: studentData.xa_phuong || "",
            gioiTinh: studentData.gioiTinh || "",
            noiSinh: studentData.noiSinh || "",
            diaChiChiTiet1: studentData.diaChiChiTiet1 || "",
            tinh_thanhPho1: studentData.tinh_thanhPho1 || "",
            quan_huyen1: studentData.quan_huyen1 || "",
            xa_phuong1: studentData.xa_phuong1 || "",
            ngaySinh: studentData.ngaySinh?.split("T")[0] || "",
            cmnd: studentData.cmnd || "",
            emailCaNhan: studentData.emailCaNhan || "",
            password: "",
          });
        } catch (error) {
          console.error("Failed to fetch student info:", error);
        }
      }
    };

    fetchStudentInfo();
  }, [userId]);

  const [address, setAddress] = useState({
    tinh_thanhPho: "",
    quan_huyen: "",
    xa_phuong: "",
  });

  const [address1, setAddress1] = useState({
    tinh_thanhPho1: "",
    quan_huyen1: "",
    xa_phuong1: "",
  });

  // Handle form input change
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleAddressChange = (addressData) => {
    setFormData((prevData) => ({
      ...prevData,
      tinh_thanhPho: addressData.tinh_thanhPho,
      quan_huyen: addressData.quan_huyen,
      xa_phuong: addressData.xa_phuong,
      // Concatenate to form diaChiChiTiet
      diaChiChiTiet: `${addressData.tinh_thanhPho}, ${addressData.quan_huyen}, ${addressData.xa_phuong}`,
    }));
  };

  // Handle AddressForm1 data change
  const handleAddressChange1 = (addressData) => {
    setFormData((prevData) => ({
      ...prevData,
      tinh_thanhPho1: addressData.tinh_thanhPho1,
      quan_huyen1: addressData.quan_huyen1,
      xa_phuong1: addressData.xa_phuong1,
      // Concatenate to form diaChiChiTiet1
      diaChiChiTiet1: `${addressData.tinh_thanhPho1}, ${addressData.quan_huyen1}, ${addressData.xa_phuong1}`,
    }));
  };

  // Handle edit student info
  const handleEditStudentInfo = async (event) => {
    event.preventDefault();
		try {
      const response = await studentService.getStudentDetails(formData);
      alert("Student details updated:", response);
      // Xử lý thêm nếu cần sau khi cập nhật thành công (ví dụ: hiển thị thông báo)
    } catch (error) {
      alert("Error updating student details:", error);
      // Xử lý lỗi (ví dụ: hiển thị thông báo lỗi)
    }
  };

  return (
    <div className="container info-form">
      <h2 className="form-title">Thông tin chi tiết</h2>
      <form className="form-container" onSubmit={handleEditStudentInfo}>
        {/* Group 1: Basic Information */}
        <div className="form-group">
          <div className="form-group__item">
            <label>
              Họ và tên <span className="required">*</span>
            </label>
            <input
              className="form-group__item-inp"
              type="text"
              placeholder="Nhập họ và tên"
              name="tenDayDu"
              value={formData.tenDayDu}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group__item">
            <label>
              Ngày sinh <span className="required">*</span>
            </label>
            <input
              className="form-group__item-inp"
              type="date"
              name="ngaySinh"
              value={formData.ngaySinh}
              onChange={handleInputChange}
              required
            />
          </div>
          <AddressForm onChange={handleAddressChange} />
        </div>

        {/* Group 2: Additional Information */}
        <div className="form-group">
          <div className="form-group__item">
            <label>
              CCCD <span className="required">*</span>
            </label>
            <input
              className="form-group__item-inp"
              type="text"
              placeholder="Nhập số CCCD"
              name="cmnd"
              value={formData.cmnd}
              onChange={handleInputChange}
              required
            />
          </div>
          <AddressForm1 onChange={handleAddressChange1} />
          <div className="form-group__item">
            <label>Khoa</label>
            <input
              className="form-group__item-inp"
              type="text"
              placeholder="Nhập khoa"
              name="tenKhoa"
              value={formData.tenKhoa}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group__item">
            <label>Ngành</label>
            <input
              className="form-group__item-inp"
              type="text"
              placeholder="Nhập ngành"
              name="tenNganh"
              value={formData.tenNganh}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group__item">
            <label>
              MSSV <span className="required">*</span>
            </label>
            <input
              className="form-group__item-inp"
              type="text"
              placeholder="Nhập MSSV"
              name="mssv"
              value={formData.mssv}
              onChange={handleInputChange}
              required
            />
          </div>
        </div>

        {/* Group 3: Image and Submit */}
        <div className="form-group">
          <button type="submit" className="btn-submit">
            Cập Nhật
          </button>
        </div>
      </form>
    </div>
  );
};

export default ThongTinHocSinh;
