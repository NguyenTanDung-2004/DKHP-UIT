import React, { useState, useContext } from "react";
import "./AuthPage.css";
import AuthContext from "../context/AuthContext";
import DialogModal from "../components/DialogModal";
import LoginBg from "../images/loginBackground.png";
import Logo from "../images/logo.png";
import DialogChangeModal from "./../components/DialogChangeModal";

const AuthPage = () => {
	const { login } = useContext(AuthContext);
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [showPassword, setShowPassword] = useState(false);
	const [showError, setShowError] = useState(false);

	// Part for handle form
	const toggleShowPassword = () => setShowPassword(!showPassword);
	const handleChangeEmail = (event) => setEmail(event.target.value);
	const handleChangePass = (event) => setPassword(event.target.value);
	const handleSubmit = (e) => {
		e.preventDefault();
		if (password !== "123") {
			setShowError(true);
			return;
		}
		const userData = {
			email,
			password,
			role: email.split("@")[0]
		};
		login(userData);
	};

	// Part for dialog modal
	const [activeDialog, setActiveDialog] = useState(null);
	const setOpenDialog = (type) => setActiveDialog(type);
	const handleCloseDialog = () => setActiveDialog(null);

	const renderDialog = () => {
		switch (activeDialog) {
			case "getCode":
				return (
					<DialogModal
						typeDialog="getCode"
						dialogFunction={handleGetCode}
						closeDialog={handleCloseDialog}
					/>
				);
			case "submitCode":
				return (
					<DialogModal
						typeDialog="submitCode"
						dialogFunction={handleSubmitCode}
						closeDialog={handleCloseDialog}
					/>
				);
			case "changePassword":
				return <DialogChangeModal closeDialog={handleCloseDialog} dialogFunction={handleChangePassword} />;
			default:
				return null;
		}
	};

	const handleGetCode = (mssv) => {
		if (mssv === "123") {
			setOpenDialog("submitCode");
			console.log("Get code success!!!");
			return true;
		} else return false;
	};

	const handleSubmitCode = (otp) => {
		if (otp === "123") {
			setOpenDialog("changePassword")
			console.log("Submit code success!!!");
			return true;
		} else {
			setOpenDialog("getCode");
			return false;
		}
	};

	const handleChangePassword = (pw) => {
		if(pw === '123'){
			return true;
		}
	}

	return (
			<div className="auth-page">
				{/* Phần dialog modal */}
				{renderDialog()}

				{/* Phần giới thiệu */}
				<div className="auth-introduce">
					<div className="auth-website">
						<img src={Logo} alt="Logo UIT" />
						<p className="auth-website__school">
							Trường Đại Học Công Nghệ Thông Tin - <br />
							Đại Học Quốc Gia Thành Phố Hồ Chí Minh
						</p>
						<h2 className="auth-website__name">
							WEBSITE QUẢN LÝ ĐĂNG KÝ HỌC PHẦN
						</h2>
					</div>
					<div className="auth-authors">
						<span className="auth-authors__title">Thành viên nhóm 9:</span>
						<ul className="auth-authors__list">
							<li className="auth-authors__item">Nguyễn Tấn Dũng - 22520001</li>
							<li className="auth-authors__item">Ngô Hoàng Khang - 22520002</li>
							<li className="auth-authors__item">Trần Bảo Phú - 22520003</li>
							<li className="auth-authors__item">
								Phan Nguyễn Trà Giang - 22520004
							</li>
							<li className="auth-authors__item">Phạm Đức Duy - 22520005</li>
						</ul>
					</div>
				</div>

				{/* Phần form đăng nhập */}
				<div className="auth-forms">
					<form className="auth-form" onSubmit={handleSubmit}>
						<h2 className="form-title">
							Đăng nhập
							<div className="blanket-space">
							</div>
							{showError && (
								<div
									className="error-notification"
									onClick={() => setShowError(false)}
								>
									Đăng nhập lỗi
								</div>
							)}
						</h2>
						<div className="form-group">
							<div className="form-group__item">
								<input
									type="email"
									name="username"
									value={email}
									placeholder="Tài khoản"
									onChange={handleChangeEmail}
									className="input-data"
								/>
							</div>
							<div className="form-group__item">
								<input
									type={showPassword ? "text" : "password"}
									name="password"
									value={password}
									placeholder="Mật khẩu"
									onChange={handleChangePass}
									className="input-data"
								/>
								<div onClick={toggleShowPassword} className="input-icon">
									<i
										className={`fa-solid fa-${
											showPassword ? "eye" : "eye-slash"
										} fa-lg`}
									></i>
								</div>
							</div>
						</div>
						<div className="form-actions">
							<span
								onClick={() => setOpenDialog("getCode")}
								className="action-forgetpw"
							>
								Quên mật khẩu?
							</span>
							<button type="submit" className="action-login">
								Đăng nhập
							</button>
						</div>
					</form>
					<img src={LoginBg} alt="background" className="form-background" />
				</div>
			</div>
	);
};

export default AuthPage;
