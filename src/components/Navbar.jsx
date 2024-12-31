import React, { useContext, useState } from "react";
import { NavLink, Link } from "react-router-dom"; // Import NavLink
import AuthContext from "../context/AuthContext";
import "./Navbar.css";
import logo from "../images/logo.png";

function Navbar() {
	const { userInfo, handleLogout } = useContext(AuthContext);

	if (!userInfo) {
		return null;
	}

	const userNavbarItems = () => {
		switch (userInfo?.role) {
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
						<NavLink to="/admin/danh-sach-tai-khoan">Danh sách tài khoản</NavLink>
						<NavLink to="/admin/danh-sach-hoc-phan">Điều chỉnh đăng ký học phần</NavLink>
					</>
				);
			case "staff":
				return (
					<>
						<NavLink to="/staff/trangchu">Trang chủ</NavLink>
						<div className="dropdown-container">
							{/* NavLink for "Quản lý" to stay highlighted when any child is active */}
							<NavLink to="/staff/quanly/danh-sach-lop-hoc" className="dropdown-toggle">
								Quản lý
								<i className="fa-solid fa-chevron-down fa-xs"></i>
							</NavLink>
							<ul className="dropdown-menu">
								{/* Các mục con của Quản lý */}
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
			{userInfo ? (
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
							<i className="fa-solid fa-user"></i> {userInfo?.name}
              <ul className="dropdown-menu right">
								{/* Các mục con của Quản lý */}
								<li>
                  <Link to="/student/thongtin">Thông tin</Link>
								</li>
								<li onClick={handleLogout}>
									Đăng xuất
								</li>
							</ul>
						</div>
					</div>
				</>
			) : null}
		</nav>
	);
}

export default Navbar;
