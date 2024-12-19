import React, { useState } from "react";
import "./StaffModal.css";

const AddClassModal = ({ isOpen, onClose, data }) => {
	const [formData, setFormData] = useState({
		"Mã lớp": data?.["Mã lớp"] || "",
		"Sĩ số": data?.["Sĩ số"] || "",
		"Ngày bắt đầu": data?.["Ngày bắt đầu"] || "",
		"Ngày kết thúc": data?.["Ngày kết thúc"] || "",
		"Thứ": data?.["Thứ"] || "",
		"Tiết": data?.["Tiết"] || "",
		"Phòng": data?.["Phòng"] || "",
		"Giảng viên": data?.["Giảng viên"] || "",
		"Loại": data?.["Loại"] || "LT",
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
				<h2 className="title">Sửa lớp học</h2>
				<form onSubmit={handleSubmit} className="staff-form">
					<div className="form-group">
						<div className="form-group__item">
							<label>
								Mã lớp<span className="required">*</span>
							</label>
							<input
								type="text"
								name="Mã lớp"
								value={formData["Mã lớp"]}
								onChange={handleInputChange}
							/>
						</div>
						<div className="form-group__item">
							<label>Sĩ số</label>
							<input
								type="number"
								name="Sĩ số"
								value={formData["Sĩ số"]}
								onChange={handleInputChange}
							/>
						</div>
					</div>
					<div className="form-group">
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
								Tiết<span className="required">*</span>
							</label>
							<input
								type="text"
								name="Tiết"
								value={formData["Tiết"]}
								onChange={handleInputChange}
								required
							/>
						</div>
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
					</div>
					<div className="form-group">
						<div className="form-group__item">
							<label>
								Ngày bắt đầu<span className="required">*</span>
							</label>
							<input
								type="date"
								name="Ngày bắt đầu"
								value={formData["Ngày bắt đầu"]}
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
								name="Ngày kết thúc"
								value={formData["Ngày kết thúc"]}
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
								name="Giảng viên"
								value={formData["Giảng viên"]}
								onChange={handleInputChange}
							/>
						</div>
						<div className="form-group__item">
							<label>
								Phòng<span className="required">*</span>
							</label>
							<input
								type="text"
								name="Phòng"
								value={formData["Phòng"]}
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
