import React, { useEffect, useState } from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import Cookies from "js-cookie";
import logo from "../../images/logo.png";
import defaultAvatar from "../../images/default-avatar.png";
import { getName } from "../../services/staffServices";
import { getDetailStudent } from "../../services/studentServices";

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
  const location = useLocation();
  const [role, setRole] = useState(Cookies.get("roleUser"));
  const [userName, setUserName] = useState("");
  // Remove error state as we are not displaying errors

  const menuItems = {
    student: [
      { to: "/student/trangchu", text: "Trang chủ" },
      { to: "/student/lopdangky", text: "Các lớp học đăng ký" },
      { to: "/student/chuongtrinh", text: "Chương trình đào tạo" },
      { to: "/student/tkb", text: "Thời khóa biểu" },
    ],
    admin: [
      { to: "/admin/trangchu", text: "Trang chủ" },
      { to: "/admin/sinhvien", text: "Quản lý tài khoản sinh viên" },
      { to: "/admin/nhanvien", text: "Quản lý nhân viên" },
      { to: "/admin/dieuchinhdkhp", text: "Điều chỉnh đăng ký học phần" },
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

  useEffect(() => {
    const fetchUserName = async () => {
      try {
        if (role === "student") {
          const userInfo = Cookies.get("userInfo");
          if (userInfo) {
            const detail = await getDetailStudent(userInfo);
            setUserName(detail.tenDayDu);
          }
        } else if (role === "staff" || role === "admin") {
          const name = await getName();
          setUserName(name);
        }
      } catch (err) {
        console.error("Error fetching user name:", err);
        // If error, keep the role in header
      }
    };
    fetchUserName();
  }, [role]);

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
          <img src={logo} alt="Logo website" className="w-14  mr-4" />
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
              <span className="text-gray-700">{userName || role}</span>
            </div>
            <ul className="w-[150px] absolute hidden group-hover:block bg-white border border-gray-300  rounded shadow-md right-0 z-10">
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
