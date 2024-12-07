import React, { useState } from "react";
import "./ThongTinHocSinh.css";
import AddressForm from "./../../components/AddressForm";

const ThongTinHocSinh = () => {
	const [studentImage, setStudentImage] = useState(
		"https://placehold.in/200x300"
	);

	// Hàm xử lý khi chọn ảnh mới
	const handleImageChange = (event) => {
		const file = event.target.files[0];
		if (file) {
			const reader = new FileReader();
			reader.onload = () => {
				setStudentImage(reader.result); // Hiển thị ảnh đã chọn
			};
			reader.readAsDataURL(file); // Đọc file ảnh
		}
	};

	return (
		<div className="container info-form">
			<h2 className="form-title">Thông tin chi tiết</h2>
			<form className="form-container">
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
							required
						/>
					</div>
					<div className="form-group__item">
						<label>
							Ngày sinh <span className="required">*</span>
						</label>
						<input className="form-group__item-inp" type="date" required />
					</div>
					<AddressForm />
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
							required
						/>
					</div>
					<div className="form-group__item">
						<label>Nơi ở hiện tại</label>
						<input
							className="form-group__item-inp"
							type="text"
							placeholder="Nhập địa chỉ hiện tại"
						/>
					</div>
					<div className="form-group__item">
						<label>Khoa</label>
						<input
							className="form-group__item-inp"
							type="text"
							placeholder="Nhập khoa"
						/>
					</div>
					<div className="form-group__item">
						<label>Ngành</label>
						<input
							className="form-group__item-inp"
							type="text"
							placeholder="Nhập ngành"
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
							required
						/>
					</div>
				</div>

				{/* Group 3: Image and Submit */}
				<div className="form-group">
					{/* Hình ảnh sinh viên */}
					<img
						src={studentImage}
						alt="Student Avatar"
						className="student-avatar"
						onClick={() => document.getElementById("fileInput").click()}
					/>
					{/* Input file ẩn */}
					<input
						id="fileInput"
						type="file"
						accept="image/*"
						style={{ display: "none" }}
						onChange={handleImageChange}
					/>
					<button type="submit" className="btn-submit">
						Cập Nhật
					</button>
				</div>
			</form>
		</div>
	);
};

export default ThongTinHocSinh;
