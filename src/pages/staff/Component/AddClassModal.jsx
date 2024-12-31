import React, { useState } from "react";
import "./StaffModal.css";

const AddClassModal = ({ isOpen, onClose, addClassNonTH, addClassTH }) => {
  const [formData, setFormData] = useState({
    subjectId: "", // Mã môn học
    siso: 0, // Sĩ số, với min >= 30
    startDate: "", // Ngày bắt đầu
    endDate: "", // Ngày kết thúc
    tietBatDau: 0, // Tiết bắt đầu
    thu: 0, // Thứ (0 - thứ 2, 1 - thứ 3, ...), sẽ tính từ startDate
    giangVienId: "", // Mã giảng viên
    roomId: "", // Phòng học
    flagTH: 0, // Loại lớp học: 0 - lý thuyết, 1 - thực hành, 2 - lý thuyết + thực hành
    sectionOfDay: 0, // Mã tiết trong ngày (ví dụ: buổi sáng, chiều)
    classId: "", // Mã lớp
    note: "", // Ghi chú
    idLT: "", // Mã lớp lý thuyết (ví dụ)
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Kiểm tra giá trị flagTH và gọi hàm thích hợp
    if (formData.flagTH === 0) {
      // Lý thuyết (flagTH === 0)
      addClassNonTH(formData);
    } else {
      // Thực hành hoặc Lý thuyết + Thực hành (flagTH === 1 hoặc 2)
      addClassTH(formData);
    }

    // Đóng modal sau khi thêm lớp
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="staff-modal__overlay">
      <div className="staff-modal__content">
        <i className="fa-solid fa-xmark close" onClick={onClose}></i>
        <h2 className="title">Thêm lớp học</h2>
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
              />
            </div>
            <div className="form-group__item">
              <label>Sĩ số</label>
              <input
                type="number"
                name="siso"
                value={formData.siso}
                onChange={handleInputChange}
              />
            </div>
          </div>
          <div className="form-group">
            <div className="form-group__item">
              <label>Hình thức</label>
              <select
                name="flagTH"
                value={formData.flagTH || 0}
                onChange={handleInputChange}
              >
                <option value={0}>LT</option>
                <option value={1}>TH</option>
                <option value={2}>LT + TH</option>
              </select>
            </div>
          </div>
          <div className="form-group">
            <div className="form-group__item">
              <label>
                Tiết<span className="required">*</span>
              </label>
              <input
                type="text"
                name="tietBatDau"
                value={formData.tietBatDau}
                onChange={handleInputChange}
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

export default AddClassModal;
