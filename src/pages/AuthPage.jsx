import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { login } from "../services/authServices";
import LoginBg from "../images/background-login.png";
import Logo from "../images/logo.png";
import { ClipLoader } from "react-spinners";
import ForgetPasswordModal from "../components/auth/ForgetPasswordModal";

const AuthPage = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showError, setShowError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isForgetModalOpen, setIsForgetModalOpen] = useState(false);

  const navigate = useNavigate();

  // Part for handle form
  const toggleShowPassword = () => setShowPassword(!showPassword);
  const handleChangeUserName = (event) => setUserName(event.target.value);
  const handleChangePass = (event) => setPassword(event.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setIsLoading(true);
    try {
      const response = await login({ userName: userName, password: password });
      if (response && response.code === 1000) {
        const { role, flagDKHP } = response;
        const normalizedRole = role.toLowerCase();
        Cookies.set("roleUser", normalizedRole);

        if (normalizedRole === "student" && flagDKHP !== undefined) {
          localStorage.setItem("flagDKHP", Number(flagDKHP));
        } else {
          localStorage.removeItem("flagDKHP");
        }

        navigate(`/${normalizedRole}/trangchu`);
      } else {
        setShowError(true);
      }
    } catch (error) {
      setShowError(true);
    } finally {
      setIsLoading(false);
      setLoading(false);
    }
  };
  const handleOpenForgetModal = () => {
    setIsForgetModalOpen(true);
  };
  const handleCloseForgetModal = () => {
    setIsForgetModalOpen(false);
  };

  return (
    <div className="flex h-screen bg-[#f2f2f2] ">
      {/* Phần giới thiệu */}
      <div className="w-1/2 p-10 flex flex-col justify-center items-center">
        <div className="text-center mb-10">
          <img src={Logo} alt="Logo UIT" className="w-24 mx-auto mb-4" />
          <p className="text-gray-700 font-semibold text-lg">
            Trường Đại Học Công Nghệ Thông Tin - <br />
            Đại Học Quốc Gia Thành Phố Hồ Chí Minh
          </p>
          <h2 className="text-3xl font-bold text-[#2F6BFF] mt-3">
            WEBSITE QUẢN LÝ ĐĂNG KÝ HỌC PHẦN
          </h2>
        </div>
        {/* <div className="mt-10">
          <div className="flex flex-col">
            <span className="text-black font-semibold">
              Phương pháp phát triển phần mềm hướng đối tượng - SE100
            </span>
            <span className="text-gray-600 font-semibold">
              GVHD: Ths. Lê Thanh Trọng
            </span>
            <span className="text-gray-600 font-semibold">
              Nhóm: 9 - Lớp: SE100.P12
            </span>
          </div>

          <ul className="text-gray-700 text-right mt-2">
            <li className="mb-1">Nguyễn Tấn Dũng - 22520001</li>
            <li className="mb-1">Ngô Hoàng Khang - 22520616</li>
            <li className="mb-1">Trần Bảo Phú - 22521104</li>
            <li className="mb-1">Phan Nguyễn Trà Giang - 22520360</li>
            <li className="mb-1">Phạm Đức Duy - 22520338 (không đóng góp)</li>
          </ul>
        </div> */}
      </div>

      {/* Phần form đăng nhập */}
      <div className="w-1/2 flex justify-center items-center relative">
        <img
          src={LoginBg}
          alt="background"
          className="absolute center right-20 max-w-[600px] z-0"
        />
        <form
          className="bg-white  shadow-md p-8  w-96 z-10 relative rounded-md flex flex-col"
          onSubmit={handleSubmit}
        >
          <h2 className="text-2xl  w-full text-center font-bold mb-6 text-black relative">
            ĐĂNG NHẬP
          </h2>
          {showError && (
            <div
              className="  text-base font-semibold text-red-500 bg-[#F4D6D2] rounded p-2 cursor-pointer mb-4 text-center"
              onClick={() => setShowError(false)}
            >
              Đăng nhập lỗi, vui lòng thử lại
            </div>
          )}
          <div className="mb-4 flex flex-col">
            <div className="mb-2">
              <input
                type="text"
                name="userName"
                value={userName}
                placeholder="Tài khoản"
                onChange={handleChangeUserName}
                className="border rounded p-2 w-full outline-none"
              />
            </div>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={password}
                placeholder="Mật khẩu"
                onChange={handleChangePass}
                className="border rounded p-2 w-full outline-none"
              />
              <div
                onClick={toggleShowPassword}
                className="absolute right-3 top-2 cursor-pointer"
              >
                <i
                  className={`fa-solid fa-${
                    showPassword ? "eye" : "eye-slash"
                  } fa-lg text-gray-500`}
                ></i>
              </div>
            </div>
          </div>
          <div className="mt-8 flex items-center justify-between">
            <button
              onClick={handleOpenForgetModal}
              className="text-[#2F6BFF] text-sm"
            >
              Quên mật khẩu?
            </button>
            <button
              type="submit"
              className=" bg-[#2F6BFF] text-white font-bold py-2 px-4 rounded hover:bg-[#5284ff] transition-colors relative"
            >
              {loading ? (
                <ClipLoader color={"white"} loading={loading} size={20} />
              ) : (
                "Đăng nhập"
              )}
            </button>
          </div>
        </form>
      </div>
      <ForgetPasswordModal
        isOpen={isForgetModalOpen}
        onClose={handleCloseForgetModal}
      />
    </div>
  );
};

export default AuthPage;
