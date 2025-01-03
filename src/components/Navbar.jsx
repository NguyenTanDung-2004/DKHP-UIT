import React from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import "./Navbar.css";
import logo from "../images/logo.png";
import Cookies from "js-cookie";

function Navbar() {
  const navigate = useNavigate();
  const token = Cookies.get("jwtToken");
  // Get user info from local storage
  const roleUser = localStorage.getItem("roleUser");

  const handleLogoutAndRedirect = () => {
    localStorage.removeItem("roleUser"); // Remove role from local storage
    Cookies.remove("jwtToken");
    navigate("/");
  };

  if (!token) {
    return null; // Hide Navbar if not authenticated
  }

  const userNavbarItems = () => {
    switch (roleUser) {
      case "student":
        return (
          <>
            <NavLink to="/student/trangchu">Trang chủ</NavLink>
            <NavLink to="/student/lopdangky">Các lớp học đăng ký</NavLink>
            <NavLink to="/student/chuongtrinh">Chương trình đào tạo</NavLink>
          </>
        );
      case "admin":
        return (
          <>
            <NavLink to="/admin/trangchu">Trang chủ</NavLink>
            <NavLink to="/admin/danh-sach-tai-khoan">
              Danh sách tài khoản
            </NavLink>
            <NavLink to="/admin/danh-sach-hoc-phan">
              Điều chỉnh đăng ký học phần
            </NavLink>
          </>
        );
      case "staff":
        return (
          <>
            <NavLink to="/staff/trangchu">Trang chủ</NavLink>
            <div className="dropdown-container">
              <NavLink
                to="/staff/quanly/danh-sach-lop-hoc"
                className="dropdown-toggle"
              >
                Quản lý
                <i className="fa-solid fa-chevron-down fa-xs"></i>
              </NavLink>
              <ul className="dropdown-menu">
                <li>
                  <NavLink to="/staff/quanly/danh-sach-lop-hoc">
                    Danh sách lớp học mở
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/staff/quanly/danh-sach-mon-hoc">
                    Danh sách môn học
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/staff/quanly/chuong-trinh-dao-tao">
                    Chương trình đào tạo
                  </NavLink>
                </li>
              </ul>
            </div>
            <NavLink to="/staff/sinhvien">Sinh viên</NavLink>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <nav className="navbar">
      <>
        <ul className="navbar-link">
          <img src={logo} alt="Logo website" style={{ width: "40px" }} />
          {userNavbarItems()}
        </ul>
        <div className="navbar-user">
          <i className="fa-solid fa-bell"></i>
          <i className="fa-solid fa-envelope"></i>
          <div className="navbar-user__group dropdown-container">
            <div className="connector"></div>
            <i className="fa-solid fa-user"></i> {roleUser}
            <ul className="dropdown-menu right">
              <li>
                <Link to="/student/thongtin">Thông tin</Link>
              </li>
              <li onClick={handleLogoutAndRedirect}>Đăng xuất</li>
            </ul>
          </div>
        </div>
      </>
    </nav>
  );
}

export default Navbar;
