import React, { useState, useContext } from "react";
import "./AuthPage.css";
import { login, resetPassword } from "../services/authService";
import DialogModal from "../components/DialogModal";
import LoginBg from "../images/loginBackground.png";
import Logo from "../images/logo.png";

const AuthPage = () => {
  const [userName, setUserName] = useState(""); // Use new state variable for userName
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showError, setShowError] = useState(false);
  const [isLoading, setLoading] = useState(false);

  // Part for handle form
  const toggleShowPassword = () => setShowPassword(!showPassword);
  const handleChangeUserName = (event) => setUserName(event.target.value); // Changed to handle userName
  const handleChangePass = (event) => setPassword(event.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isLoading) return;
    const body = { userName: userName, password }; // changed email to userName
    console.log("Body request:", body); // Log the body here
    setLoading(true);

    await login(body)
      .then((res) => {
        const { role } = res.data;
        setLoading(false);
        const normalizedRole = role.toLowerCase();
        window.location.href = `/${normalizedRole}/trangchu`;
      })
      .catch((err) => {
        setShowError(true);
      })
      .finally(() => setLoading(false));
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
      default:
        return null;
    }
  };

  const handleGetCode = async (account) => {
    try {
      const response = await resetPassword(account);
      if (response && response.status === 200) {
        alert("Get code success!!! Your new password is sending to your email");
        return true;
      } else {
        // Nếu có lỗi trong quá trình gọi API, có thể hiện thông báo lỗi
        console.error("Failed to get reset code.");
        return false;
      }
    } catch (error) {
      // Xử lý lỗi nếu API gọi thất bại
      console.error("Error during reset password API:", error);
      return false;
    }
  };

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
            <div className="blanket-space"></div>
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
                type="text"
                name="userName"
                value={userName}
                placeholder="Tài khoản"
                onChange={handleChangeUserName} // Changed to handle userName
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
