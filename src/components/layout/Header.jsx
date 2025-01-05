// src/components/Header.js
import React from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import logo from "../../images/logo.png";
import defaultAvatar from "../../images/default-avatar.png"; // Import ảnh avatar mặc định

function DropdownMenu({ label, items }) {
  return (
    <div className="relative group">
      <div className="px-3 py-2 text-gray-700 hover:bg-gray-200 rounded flex items-center cursor-pointer">
        {label} <i className="fa-solid fa-chevron-down fa-xs ml-1"></i>
      </div>
      <ul className="w-[200px] absolute hidden group-hover:block bg-white border border-gray-300 rounded shadow-md z-10">
        {items.map((item, index) => (
          <li key={index}>
            <NavLink
              to={item.to}
              className={({ isActive }) =>
                `block px-4 py-2  hover:text-[#2F6BFF] ${
                  isActive
                    ? "text-[#2F6BFF] underline decoration-[#2F6BFF] underline-offset-4 font-semibold"
                    : "text-gray-700"
                }`
              }
            >
              {item.text}
            </NavLink>
          </li>
        ))}
      </ul>
    </div>
  );
}

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

function Header({ role }) {
  const navigate = useNavigate();
  const menuItems = {
    student: [
      { to: "/student/trangchu", text: "Trang chủ" },
      { to: "/student/lopdangky", text: "Các lớp học đăng ký" },
      { to: "/student/chuongtrinh", text: "Chương trình đào tạo" },
    ],
    admin: [
      { to: "/admin/trangchu", text: "Trang chủ" },
      { to: "/admin/danh-sach-tai-khoan", text: "Danh sách tài khoản" },
      { to: "/admin/danh-sach-hoc-phan", text: "Điều chỉnh đăng ký học phần" },
    ],
    staff: [
      { to: "/staff/trangchu", text: "Trang chủ" },
      {
        label: "Quản lý",
        items: [
          {
            to: "/staff/quanly/danh-sach-lop-hoc",
            text: "Danh sách lớp học mở",
          },
          { to: "/staff/quanly/danh-sach-mon-hoc", text: "Danh sách môn học" },
          {
            to: "/staff/quanly/chuong-trinh-dao-tao",
            text: "Chương trình đào tạo",
          },
        ],
      },

      { to: "/staff/sinhvien", text: "Sinh viên" },
    ],
  };

  const handleLogoutAndRedirect = () => {
    Cookies.remove("roleUser");
    Cookies.remove("jwtToken");
    Cookies.remove("userInfo");
    navigate("/auth");
  };

  const userNavbarItems = () => {
    const items = menuItems[role] || [];
    return items.map((item, index) => {
      if (item.items) {
        return (
          <DropdownMenu
            key={index}
            items={item.items}
            label={item.label}
          ></DropdownMenu>
        );
      }
      return (
        <MenuItem key={index} to={item.to}>
          {item.text}
        </MenuItem>
      );
    });
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
