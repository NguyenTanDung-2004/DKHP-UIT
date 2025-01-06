import React, { useEffect, useState } from "react";
import { NavLink, Link, useNavigate, useLocation } from "react-router-dom";
import Cookies from "js-cookie";
import logo from "../../images/logo.png";
import defaultAvatar from "../../images/default-avatar.png"; // Import ảnh avatar mặc định

function MenuItem({ to, children }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `px-3 py-2  hover:text-[#2F6BFF] rounded ${
          isActive
            ? "text-[#2F6BFF] underline decoration-[#2F6BFF] underline-offset-4 font-semibold"
            : "text-gray-700"
        }`
      }
    >
      {children}
    </NavLink>
  );
}

function Header() {
  const navigate = useNavigate();
  const location = useLocation(); // Get the current location
  const [role, setRole] = useState(Cookies.get("roleUser")); // Initialize and store role in state

  const menuItems = {
    student: [
      { to: "/student/trangchu", text: "Trang chủ" },
      { to: "/student/lopdangky", text: "Các lớp học đăng ký" },
      { to: "/student/chuongtrinh", text: "Chương trình đào tạo" },
    ],
    admin: [
      { to: "/admin/trangchu", text: "Trang chủ" },
      { to: "/admin/danhsachtaikhoan", text: "Quản lý tài khoản" },
      { to: "/admin/danhsachhocphan", text: "Điều chỉnh đăng ký học phần" },
    ],
    staff: [
      { to: "/staff/trangchu", text: "Trang chủ" },
      { to: "/staff/quanly/monhoc", text: "Quản lý môn học" },
      { to: "/staff/quanly/monhocmo", text: "Quản lý môn học mở" },
      { to: "/staff/quanly/lophoc", text: "Quản lý lớp học" },
      // { to: "/staff/quanly/ctdt", text: "Quản lý CTDT" },
      { to: "/staff/quanly/sinhvien", text: "Quản lý sinh viên" },
    ],
  };

  useEffect(() => {
    // Update role state when location changes (route navigation)
    setRole(Cookies.get("roleUser"));
  }, [location]);

  const handleLogoutAndRedirect = () => {
    Cookies.remove("roleUser");
    Cookies.remove("jwtToken");
    Cookies.remove("userInfo");
    navigate("/auth");
  };

  const userNavbarItems = () => {
    const items = menuItems[role] || [];
    return items.map((item, index) => (
      <MenuItem key={index} to={item.to}>
        {item.text}
      </MenuItem>
    ));
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-10 px-12">
      <div className="container mx-auto flex justify-between items-center p-4">
        <ul className="flex items-center space-x-4">
          <img src={logo} alt="Logo website" className="w-10 h-10 mr-4" />
          {userNavbarItems()}
        </ul>
        <div className="flex items-center space-x-4">
          <i className="fa-solid fa-bell text-gray-500"></i>
          <i className="fa-solid fa-envelope text-gray-500"></i>
          <div className="relative group">
            <div className="flex items-center cursor-pointer">
              <img
                src={defaultAvatar}
                alt="Avatar"
                className="w-8 h-8 rounded-full mr-2"
              />
              <span className="text-gray-700">{role}</span>
            </div>
            <ul className="w-[150px] absolute hidden group-hover:block bg-white border border-gray-300  rounded shadow-md right-0 z-10">
              <li>
                <Link
                  to="/student/thongtin"
                  className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                >
                  Thông tin
                </Link>
              </li>
              <li
                onClick={handleLogoutAndRedirect}
                className="block px-4 py-2 text-gray-700 hover:bg-gray-100 cursor-pointer"
              >
                Đăng xuất
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Header;
