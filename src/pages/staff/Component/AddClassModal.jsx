import React, { useState } from "react";
import "./StaffModal.css";

const AddClassModal = ({ isOpen, onClose }) => {
	const [formData, setFormData] = useState({
		subjectCode: "",
		subjectName: "",
		classCode: "",
		type: "",
		day: "",
		capacity: "",
		startDate: "",
		endDate: "",
		startPeriod: "",
		endPeriod: "",
		teacher: "",
		room: "",
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
		console.log("Form Submitted:", formData);
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
								Mã môn<span className="required">*</span>
							</label>
							<input
								type="text"
								name="subjectCode"
								value={formData.subjectCode}
								onChange={handleInputChange}
							/>
						</div>
						<div className="form-group__item">
							<label>
								Tên môn<span className="required">*</span>
							</label>
							<input
								type="text"
								name="subjectName"
								value={formData.subjectName}
								onChange={handleInputChange}
							/>
						</div>
					</div>
					<div className="form-group">
						<div className="form-group__item">
							<label>
								Mã lớp<span className="required">*</span>
							</label>
							<input
								type="text"
								name="classCode"
								value={formData.classCode}
								onChange={handleInputChange}
							/>
						</div>
						<div className="form-group__item">
							<label>Hình thức</label>
							<select
								name="type"
								value={formData.type || "LT"}
								onChange={handleInputChange}
							>
								<option value="LT">LT</option>
								<option value="TH">TH</option>
							</select>
						</div>
					</div>
					<div className="form-group">
						<div className="form-group__item">
							<label>
								Thứ<span className="required">*</span>
							</label>
							<input
								type="text"
								name="day"
								value={formData.day}
								onChange={handleInputChange}
								required
							/>
						</div>
						<div className="form-group__item">
							<label>Sĩ số</label>
							<input
								type="number"
								name="capacity"
								value={formData.capacity}
								onChange={handleInputChange}
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
							<label>
								Tiết bắt đầu<span className="required">*</span>
							</label>
							<input
								type="text"
								name="startPeriod"
								value={formData.startPeriod}
								onChange={handleInputChange}
								required
							/>
						</div>
						<div className="form-group__item">
							<label>
								Tiết kết thúc<span className="required">*</span>
							</label>
							<input
								type="text"
								name="endPeriod"
								value={formData.endPeriod}
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
								name="teacher"
								value={formData.teacher}
								onChange={handleInputChange}
							/>
						</div>
						<div className="form-group__item">
							<label>
								Phòng<span className="required">*</span>
							</label>
							<input
								type="text"
								name="room"
								value={formData.room}
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
