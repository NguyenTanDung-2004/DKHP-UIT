import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/admin/HomePage";
import StaffPage from "./pages/staff/HomePage";
import StudentPage from "./pages/student/HomePage";
import LopDangKyPage from "./pages/student/LopDangKyPage";
import TKBPage from "./pages/student/TKBPage";
import AuthPage from "./pages/AuthPage";
import NotFoundPage from "./pages/NotFoundPage";
import CTDTPage from "./pages/student/CTDTPage";
import SubjectPage from "./pages/staff/SubjectPage";
import ObjectSubjectPage from "./pages/staff/ObjectSubject";
import ClassPage from "./pages/staff/ClassPage";
import StudentManagementPage from "./pages/staff/StudentPage";
import StudentAccountPage from "./pages/admin/StudentPage";
import StaffManagementPage from "./pages/admin/StaffPage";
import DKHPPage from "./pages/admin/DKHPPage";
import ProtectedRoute from "./components/ProtectedRoute"; // Import the protected route

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/" element={<AuthPage />} />
        <Route path="/not-found" element={<NotFoundPage />} />

        <Route
          path="/student/trangchu"
          element={
            <ProtectedRoute allowedRoles={["student"]}>
              <StudentPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/student/lopdangky"
          element={
            <ProtectedRoute allowedRoles={["student"]}>
              <LopDangKyPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/student/chuongtrinh"
          element={
            <ProtectedRoute allowedRoles={["student"]}>
              <CTDTPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/student/tkb"
          element={
            <ProtectedRoute allowedRoles={["student"]}>
              <TKBPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/staff/trangchu"
          element={
            <ProtectedRoute allowedRoles={["staff"]}>
              <StaffPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/staff/quanly/monhoc"
          element={
            <ProtectedRoute allowedRoles={["staff"]}>
              <SubjectPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/staff/quanly/monhocmo"
          element={
            <ProtectedRoute allowedRoles={["staff"]}>
              <ObjectSubjectPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/staff/quanly/lophoc"
          element={
            <ProtectedRoute allowedRoles={["staff"]}>
              <ClassPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/staff/quanly/sinhvien"
          element={
            <ProtectedRoute allowedRoles={["staff"]}>
              <StudentManagementPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/trangchu"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <HomePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/sinhvien"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <StudentAccountPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/nhanvien"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <StaffManagementPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/dieuchinhdkhp"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <DKHPPage />
            </ProtectedRoute>
          }
        />

        <Route path="/*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
