// routes.js
import React from "react";
import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";

import StudentTrangchu from "./pages/student/Trangchu";
import StudentLopDangKy from "./pages/student/LopDangKy";
import StudentChuongTrinh from "./pages/student/ChuongTrinh";
import StudentThongTin from "./pages/student/ThongTinHocSinh";

import StaffTrangchu from "./pages/staff/Trangchu";	
import StaffQuanlyLopHoc from "./pages/staff/QuanLyLopHoc";
import StaffQuanlyMonHoc from "./pages/staff/QuanLyMonHoc";
import StaffQuanlyChuongTrinh from "./pages/staff/QuanLyChuongTrinh";
import StaffSinhvien from "./pages/staff/Sinhvien";

import AdminTrangChu from "./pages/admin/TrangChu";
import AdminDanhSachTaiKhoan from "./pages/admin/DanhSachTaiKhoan";
import AdminDieuChinhHocPhan from "./pages/admin/DieuChinhHocPhan";

import AuthPage from "./pages/AuthPage";
import NotFoundPage from "./pages/NotFoundPage";

const AppRoutes = () => (
	<Routes>
		{/* Routes for students */}
		<Route
			path="/student/trangchu"
			element={
				<ProtectedRoute roleRequired="Student">
					<StudentTrangchu />
				</ProtectedRoute>
			}
		/>
		<Route
			path="/student/lopdangky"
			element={
				<ProtectedRoute roleRequired="Student">
					<StudentLopDangKy />
				</ProtectedRoute>
			}
		/>
		<Route
			path="/student/chuongtrinh"
			element={
				<ProtectedRoute roleRequired="Student">
					<StudentChuongTrinh />
				</ProtectedRoute>
			}
		/>
		<Route
			path="/student/thongtin"
			element={
				<ProtectedRoute roleRequired="Student">
					<StudentThongTin />
				</ProtectedRoute>
			}
		/>
		{/* Routes for staffs */}
		<Route
			path="/staff/trangchu"
			element={
				<ProtectedRoute roleRequired="Staff">
					<StaffTrangchu />
				</ProtectedRoute>
			}
		/>
		<Route
			path="/staff/quanly/danh-sach-lop-hoc"
			element={
				<ProtectedRoute roleRequired="Staff">
					<StaffQuanlyLopHoc />
				</ProtectedRoute>
			}
		/>
		<Route
			path="/staff/quanly/danh-sach-mon-hoc"
			element={
				<ProtectedRoute roleRequired="Staff">
					<StaffQuanlyMonHoc />
				</ProtectedRoute>
			}
		/>
		<Route
			path="/staff/quanly/chuong-trinh-dao-tao"
			element={
				<ProtectedRoute roleRequired="Staff">
					<StaffQuanlyChuongTrinh />
				</ProtectedRoute>
			}
		/>
		<Route
			path="/staff/sinhvien"
			element={
				<ProtectedRoute roleRequired="Staff">
					<StaffSinhvien />
				</ProtectedRoute>
			}
		/>

		{/* Routes for admins */}
		<Route
			path="/admin/trangchu"
			element={
				<ProtectedRoute roleRequired="Admin">
					<AdminTrangChu />
				</ProtectedRoute>
			}
		/>
		<Route
			path="/admin/danh-sach-tai-khoan"
			element={
				<ProtectedRoute roleRequired="Admin">
					<AdminDanhSachTaiKhoan />
				</ProtectedRoute>
			}
		/>
		<Route
			path="/admin/danh-sach-hoc-phan"
			element={
				<ProtectedRoute roleRequired="Admin">
					<AdminDieuChinhHocPhan />
				</ProtectedRoute>
			}
		/>

		{/* Public routes */}
		<Route path="/" element={<AuthPage />} />
		<Route path="/auth" element={<AuthPage />} />
		<Route path="*" element={<NotFoundPage />} />
	</Routes>
);

export default AppRoutes;
