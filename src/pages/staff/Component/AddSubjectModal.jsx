import React, { useState } from "react";
import "./StaffModal.css";

const AddSubjectModal = ({ isOpen, onClose }) => {
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
								Mã môn học<span className="required">*</span>
							</label>
							<input
								type="text"
								name="subjectCode"
								value={formData.subjectCode}
								onChange={handleInputChange}
							/>
						</div>
					</div>
					<div className="form-group">
						<div className="form-group__item">
							<label>
								Tên môn học<span className="required">*</span>
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
							<label>Loại Môn Học</label>
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
								Mã Khoa<span className="required">*</span>
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
								Mã môn học trước<span className="required">*</span>
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
								Số tín chỉ lý thuyết<span className="required">*</span>
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
								Số tín chỉ thực hành<span className="required">*</span>
							</label>
							<input
								type="text"
								name="subjectName"
								value={formData.subjectName}
								onChange={handleInputChange}
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

export default AddSubjectModal;
