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

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/student/trangchu" element={<StudentPage />} />
        <Route path="/student/lopdangky" element={<LopDangKyPage />} />
        <Route path="/student/chuongtrinh" element={<CTDTPage />} />
        <Route path="/student/tkb" element={<TKBPage />} />

        <Route path="/staff/trangchu" element={<StaffPage />} />
        <Route path="/staff/quanly/monhoc" element={<SubjectPage />} />
        <Route path="/staff/quanly/monhocmo" element={<ObjectSubjectPage />} />
        <Route path="/staff/quanly/lophoc" element={<ClassPage />} />
        <Route
          path="/staff/quanly/sinhvien"
          element={<StudentManagementPage />}
        />

        <Route path="/admin/trangchu" element={<HomePage />} />
        <Route path="/admin/sinhvien" element={<StudentAccountPage />} />
        <Route path="/admin/nhanvien" element={<StaffManagementPage />} />

        <Route path="/" element={<AuthPage />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
