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
        <ProtectedRoute>
          <StudentTrangchu />
        </ProtectedRoute>
      }
    />
    <Route
      path="/student/lopdangky"
      element={
        <ProtectedRoute>
          <StudentLopDangKy />
        </ProtectedRoute>
      }
    />
    <Route
      path="/student/chuongtrinh"
      element={
        <ProtectedRoute>
          <StudentChuongTrinh />
        </ProtectedRoute>
      }
    />
    <Route
      path="/student/thongtin"
      element={
        <ProtectedRoute>
          <StudentThongTin />
        </ProtectedRoute>
      }
    />
    {/* Routes for staffs */}
    <Route
      path="/staff/trangchu"
      element={
        <ProtectedRoute>
          <StaffTrangchu />
        </ProtectedRoute>
      }
    />
    <Route
      path="/staff/quanly/danh-sach-lop-hoc"
      element={
        <ProtectedRoute>
          <StaffQuanlyLopHoc />
        </ProtectedRoute>
      }
    />
    <Route
      path="/staff/quanly/danh-sach-mon-hoc"
      element={
        <ProtectedRoute>
          <StaffQuanlyMonHoc />
        </ProtectedRoute>
      }
    />
    <Route
      path="/staff/quanly/chuong-trinh-dao-tao"
      element={
        <ProtectedRoute>
          <StaffQuanlyChuongTrinh />
        </ProtectedRoute>
      }
    />
    <Route
      path="/staff/sinhvien"
      element={
        <ProtectedRoute>
          <StaffSinhvien />
        </ProtectedRoute>
      }
    />

    {/* Routes for admins */}
    <Route
      path="/admin/trangchu"
      element={
        <ProtectedRoute>
          <AdminTrangChu />
        </ProtectedRoute>
      }
    />
    <Route
      path="/admin/danh-sach-tai-khoan"
      element={
        <ProtectedRoute>
          <AdminDanhSachTaiKhoan />
        </ProtectedRoute>
      }
    />
    <Route
      path="/admin/danh-sach-hoc-phan"
      element={
        <ProtectedRoute>
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
