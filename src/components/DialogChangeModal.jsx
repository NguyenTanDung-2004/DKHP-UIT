import React, { useState, useRef } from "react";
import "./DialogChangeModal.css";

const DialogChangeModal = ({ dialogFunction, closeDialog }) => {
	const newRef = useRef(null);
	const confirmRef = useRef(null);

	// State quản lý giá trị input
	const [newPassword, setNewPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");

	// State quản lý lỗi
	const [error, setError] = useState("");

	// Xử lý thay đổi input
	const getNewPassword = (event) => setNewPassword(event.target.value);
	const getConfirmPassword = (event) => setConfirmPassword(event.target.value);

	// Xử lý khi submit
	const handleSubmit = () => {
		// Kiểm tra mật khẩu mới
		if (newPassword.length < 5) {
			setError({
				errorType: "invalid",
				errorMessage: "Mật khẩu mới không khả dụng (ít nhất 5 ký tự).",
			});
      return
		}
		// Kiểm tra mật khẩu xác nhận
		if (newPassword !== confirmPassword) {
			setError({
				errorType: "mismatch",
				errorMessage: "Mật khẩu không trùng khớp!",
			});
      return
		}
		dialogFunction(newPassword);
    closeDialog();
	};

	return (
		<div className="modal-container">
			<div className="modal">
				<span className="modal-close" onClick={closeDialog}>
					<i className="fa-solid fa-xmark fa-lg"></i>
				</span>
				<span className="modal-title">Thay đổi mật khẩu</span>

				{/* Input mật khẩu mới */}
				<div className="input-group">
					<input
						ref={newRef}
						type="password"
						className="input-data"
						name="new-password"
						value={newPassword}
						placeholder="Nhập mật khẩu mới"
						onChange={getNewPassword}
					/>
					{error && error.errorType === "invalid" ? (
						<span className="error-text">{error.errorMessage}</span>
					) : null}
				</div>

				{/* Input xác nhận mật khẩu */}
				<div className="input-group">
					<input
						ref={confirmRef}
						type="password"
						className="input-data"
						name="confirm-password"
						value={confirmPassword}
						placeholder="Nhập lại mật khẩu mới"
						onChange={getConfirmPassword}
					/>
					{error && error.errorType === "mismatch" ? (
						<span className="error-text">{error.errorMessage}</span>
					) : null}
				</div>

				{/* Nút đổi mật khẩu */}
				<button onClick={handleSubmit} className="modal-submit">
					Đổi mật khẩu
				</button>
			</div>
		</div>
	);
};

export default DialogChangeModal;
