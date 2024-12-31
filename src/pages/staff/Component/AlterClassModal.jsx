import React, { useState, useEffect } from "react";
import "./StaffModal.css";

const AlterClassModal = ({ isOpen, onClose, data, editClass }) => {
  const [formData, setFormData] = useState({
    classId: "", // Mã lớp
    siso: 30, // Sĩ số (mặc định là 30)
    startDate: "", // Ngày bắt đầu
    endDate: "", // Ngày kết thúc
    tietBatDau: 1, // Tiết bắt đầu (mặc định là 1)
    thu: 0, // Thứ (0 - thứ 2, 1 - thứ 3, ...)
    flagTH: 0, // Loại lớp học (0 - lý thuyết, 1 - thực hành, 2 - lý thuyết + thực hành)
    note: "", // Ghi chú
    idLT: "", // Mã lớp lý thuyết
    sectionOfDay: 0, // Mã tiết trong ngày (0 - buổi sáng, 1 - buổi chiều, 2 - buổi tối)
    roomId: "", // Phòng học
    giangVienId: "", // Mã giảng viên
    subjectId: "", // Mã môn học
  });

  // Cập nhật formData nếu có dữ liệu từ prop `data`
  useEffect(() => {
    if (data) {
      setFormData({
        classId: data["Mã lớp"] || "",
        siso: data["Sĩ số"] || 30,
        startDate: data["Ngày bắt đầu"] || "",
        endDate: data["Ngày kết thúc"] || "",
        tietBatDau: data["Tiết"] || 1,
        thu: data["Thứ"] || 0,
        flagTH: data["Loại"] || 0,
        note: data["Ghi chú"] || "",
        idLT: data["Mã lớp lý thuyết"] || "",
        sectionOfDay: data["Mã tiết trong ngày"] || 0,
        roomId: data["Phòng"] || "",
        giangVienId: data["Giảng viên"] || "",
        subjectId: data["Mã môn học"] || "",
      });
    }
  }, [data]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    editClass(formData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="staff-modal__overlay">
      <div className="staff-modal__content">
        <i className="fa-solid fa-xmark close" onClick={onClose}></i>
        <h2 className="title">Sửa lớp học</h2>
        <form onSubmit={handleSubmit} className="staff-form">
          <div className="form-group">
            <div className="form-group__item">
              <label>
                Mã lớp<span className="required">*</span>
              </label>
              <input
                type="text"
                name="classId"
                value={formData.classId}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group__item">
              <label>Sĩ số</label>
              <input
                type="number"
                name="siso"
                value={formData.siso}
                onChange={handleInputChange}
                min={30}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <div className="form-group__item">
              <label>Hình thức</label>
              <select
                name="flagTH"
                value={formData.flagTH}
                onChange={handleInputChange}
              >
                <option value="0">LT</option>
                <option value="1">TH</option>
                <option value="2">LT + TH</option>
              </select>
            </div>
          </div>

          <div className="form-group">
            <div className="form-group__item">
              <label>
                Tiết<span className="required">*</span>
              </label>
              <input
                type="number"
                name="tietBatDau"
                value={formData.tietBatDau}
                onChange={handleInputChange}
                min={1}
                required
              />
            </div>
            <div className="form-group__item">
              <label>
                Thứ<span className="required">*</span>
              </label>
              <input
                type="number"
                name="thu"
                value={formData.thu}
                onChange={handleInputChange}
                min={0}
                max={6}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <div className="form-group__item">
              <label>
                Ngày bắt đầu<span className="required">*</span>
              </label>
              <input
                type="date"
                name="startDate"
                value={formData.startDate}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group__item">
              <label>
                Ngày kết thúc<span className="required">*</span>
              </label>
              <input
                type="date"
                name="endDate"
                value={formData.endDate}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <div className="form-group__item">
              <label>Giảng viên</label>
              <input
                type="text"
                name="giangVienId"
                value={formData.giangVienId}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group__item">
              <label>
                Phòng<span className="required">*</span>
              </label>
              <input
                type="text"
                name="roomId"
                value={formData.roomId}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>

          <div className="form-actions">
            <button type="submit">Xác nhận</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AlterClassModal;
