import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/admin/HomePage";
import StaffPage from "./pages/staff/HomePage";
import StudentPage from "./pages/student/HomePage";
import LopDangKyPage from "./pages/student/LopDangKyPage";
import AuthPage from "./pages/AuthPage";
import NotFoundPage from "./pages/NotFoundPage";
import CTDTPage from "./pages/student/CTDTPage";
import SubjectPage from "./pages/staff/SubjectPage";
import ObjectSubjectPage from "./pages/staff/ObjectSubject";
const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/student/trangchu" element={<StudentPage />} />
        <Route path="/student/lopdangky" element={<LopDangKyPage />} />
        <Route path="/student/chuongtrinh" element={<CTDTPage />} />

        <Route path="/staff/trangchu" element={<StaffPage />} />
        <Route path="/staff/quanly/monhoc" element={<SubjectPage />} />
        <Route path="/staff/quanly/monhocmo" element={<ObjectSubjectPage />} />

        <Route path="/admin/trangchu" element={<HomePage />} />

        <Route path="/" element={<AuthPage />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
