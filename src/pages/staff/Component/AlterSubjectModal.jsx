import React, { useState } from "react";
import "./StaffModal.css";

const AddSubjectModal = ({ isOpen, onClose, data = {} }) => {
	const [formData, setFormData] = useState({
		"Mã môn học": data?.["Mã môn học"] || "",
		"Tên môn học": data?.["Tên môn học"] || "",
		"Loại môn học": data?.["Loại môn học"] || "Bắt buộc",
		"Mã khoa": data?.["Mã khoa"] || "",
		"Mã môn trước": data?.["Mã môn trước"] || "",
		"TCLT": data?.["TCLT"] || 0,
		"TCTH": data?.["TCTH"] || 0,
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
				<h2 className="title">Sửa môn học</h2>
				<form onSubmit={handleSubmit} className="staff-form">
					<div className="form-group">
						<div className="form-group__item">
							<label>
								Mã môn học<span className="required">*</span>
							</label>
							<input
								type="text"
								name="Mã môn học"
								value={formData["Mã môn học"]}
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
								name="Tên môn học"
								value={formData["Tên môn học"]}
								onChange={handleInputChange}
							/>
						</div>
					</div>
					<div className="form-group">
						<div className="form-group__item">
							<label>Loại Môn Học</label>
							<select
								name="Loại môn học"
								value={formData["Loại môn học"] || "LT"}
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
								name="Mã khoa"
								value={formData["Mã khoa"]}
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
								name="Mã môn trước"
								value={formData["Mã môn trước"]}
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
								name="TCLT"
								value={formData["TCLT"]}
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
								name="TCTH"
								value={formData["TCTH"]}
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
