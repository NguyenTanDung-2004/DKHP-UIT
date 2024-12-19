import React, { useState } from "react";
import "./StaffModal.css";

const AddSubjectCTDTModal = ({ isOpen, onClose }) => {
	const [formData, setFormData] = useState({
		"Học kỳ": "",
		"Mã môn học": "",
		"Tên môn học": "",
		"Loại môn học": "",
		"Mã khoa": "",
		"Mã môn trước": "",
		TCLT: "",
		TCTH: "",
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
				<h2 className="title">Thêm môn học vào chương trình đào tạo</h2>
				<form onSubmit={handleSubmit} className="staff-form">
					<div className="form-group">
						<div className="form-group__item">
							<label>
								Học kỳ <span className="required">*</span>
							</label>
							<input
								type="text"
								name="Học kỳ"
								value={formData["Học kỳ"]}
								onChange={handleInputChange}
							/>
						</div>
					</div>
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
							<label>
								Số TCLT<span className="required">*</span>
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
								Số TCTH<span className="required">*</span>
							</label>
							<input
								type="text"
								name="TCTH"
								value={formData["TCTH"]}
								onChange={handleInputChange}
							/>
						</div>
					</div>
					<div className="form-group"></div>
					<div className="form-actions">
						<button type="submit">Xác nhận</button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default AddSubjectCTDTModal;
