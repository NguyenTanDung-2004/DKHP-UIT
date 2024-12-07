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

import AdminDashboardPage from "./pages/admin/DashboardPage";
import AdminManageUsersPage from "./pages/admin/ManageUsersPage";
import AdminTimetablePage from "./pages/admin/TimetablePage";

import AuthPage from "./pages/AuthPage";
import NotFoundPage from "./pages/NotFoundPage";

const AppRoutes = () => (
	<Routes>
		{/* Routes for students */}
		<Route
			path="/student/trangchu"
			element={
				<ProtectedRoute role="student">
					<StudentTrangchu />
				</ProtectedRoute>
			}
		/>
		<Route
			path="/student/lopdangky"
			element={
				<ProtectedRoute role="student">
					<StudentLopDangKy />
				</ProtectedRoute>
			}
		/>
		<Route
			path="/student/chuongtrinh"
			element={
				<ProtectedRoute role="student">
					<StudentChuongTrinh />
				</ProtectedRoute>
			}
		/>
		<Route
			path="/student/thongtin"
			element={
				<ProtectedRoute role="student">
					<StudentThongTin />
				</ProtectedRoute>
			}
		/>
		{/* Routes for staffs */}
		<Route
			path="/staff/trangchu"
			element={
				<ProtectedRoute role="staff">
					<StaffTrangchu />
				</ProtectedRoute>
			}
		/>
		<Route
			path="/staff/quanly/danh-sach-lop-hoc"
			element={
				<ProtectedRoute role="staff">
					<StaffQuanlyLopHoc />
				</ProtectedRoute>
			}
		/>
		<Route
			path="/staff/quanly/danh-sach-mon-hoc"
			element={
				<ProtectedRoute role="staff">
					<StaffQuanlyMonHoc />
				</ProtectedRoute>
			}
		/>
		<Route
			path="/staff/quanly/chuong-trinh-dao-tao"
			element={
				<ProtectedRoute role="staff">
					<StaffQuanlyChuongTrinh />
				</ProtectedRoute>
			}
		/>
		<Route
			path="/staff/sinhvien"
			element={
				<ProtectedRoute role="staff">
					<StaffSinhvien />
				</ProtectedRoute>
			}
		/>

		{/* Routes for admins */}
		<Route
			path="/admin"
			element={
				<ProtectedRoute role="admin">
					<AdminDashboardPage />
				</ProtectedRoute>
			}
		/>
		<Route
			path="/admin/manage-users"
			element={
				<ProtectedRoute role="admin">
					<AdminManageUsersPage />
				</ProtectedRoute>
			}
		/>
		<Route
			path="/admin/reports"
			element={
				<ProtectedRoute role="admin">
					<AdminTimetablePage />
				</ProtectedRoute>
			}
		/>

		{/* Public routes */}
		<Route path="/auth" element={<AuthPage />} />
		<Route path="*" element={<NotFoundPage />} />
	</Routes>
);

export default AppRoutes;
