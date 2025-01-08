import React, { useState, useEffect } from "react";
import { getDetailStudent } from "../../../services/studentServices";
const EditStudentModal = ({ isOpen, onClose, onEditStudent, student }) => {
  const [editedStudent, setEditedStudent] = useState({
    mssv: "",
    tenDayDu: "",
    tenKhoa: "",
    tenNganh: "",
    diaChiChiTiet: "",
    tinh_thanhPho: "",
    quan_huyen: "",
    xa_phuong: "",
    phone: "",
    gioiTinh: "",
    noiSinh: "",
    diaChiChiTiet1: "",
    tinh_thanhPho1: "",
    quan_huyen1: "",
    xa_phuong1: "",
    ngaySinh: "",
    cmnd: "",
    emailCaNhan: "",
  });
  const facultyOptions = [
    "Công Nghệ Phần Mềm",
    "Hệ thống thông tin",
    "Khoa Học Máy Tính",
    "Công Nghệ Thông Tin",
  ];
  const genderOptions = ["nam", "nữ", "khác"];
  useEffect(() => {
    const fetchStudentDetails = async () => {
      if (student && student.mssv) {
        try {
          const studentData = await getDetailStudent(student.mssv);
          setEditedStudent(studentData);
        } catch (error) {
          console.error("Error fetching student details:", error);
        }
      }
    };
    fetchStudentDetails();
  }, [student]);

  const handleChange = (e) => {
    setEditedStudent({ ...editedStudent, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onEditStudent(editedStudent);
  };

  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-500 bg-opacity-75">
      <div className="bg-white p-6 rounded shadow-lg w-[800px] max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="font-semibold text-xl">
            CHỈNH SỬA THÔNG TIN SINH VIÊN
          </h2>
          <button
            onClick={onClose}
            className="text-gray-600 hover:text-gray-800 focus:outline-none"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col gap-4">
            <div className="flex gap-4">
              <div className="mb-4 flex flex-col  flex-1">
                <label className="block text-sm font-medium text-gray-700">
                  MSSV:
                </label>
                <input
                  type="text"
                  name="mssv"
                  value={editedStudent.mssv}
                  onChange={handleChange}
                  className="mt-1 block w-full border rounded px-2 py-1 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  readOnly
                />
              </div>
              <div className="mb-4 flex flex-col flex-1">
                <label className="block text-sm font-medium text-gray-700">
                  Họ và tên:
                </label>
                <input
                  type="text"
                  name="tenDayDu"
                  value={editedStudent.tenDayDu || ""}
                  onChange={handleChange}
                  className="mt-1 block w-full border rounded px-2 py-1 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
              </div>
            </div>

            <div className="flex gap-4">
              <div className="mb-4 flex flex-col flex-1">
                <label className="block text-sm font-medium text-gray-700">
                  Khoa:
                </label>
                <select
                  name="tenKhoa"
                  value={editedStudent.tenKhoa || ""}
                  onChange={handleChange}
                  className="mt-1 block w-full border rounded px-2 py-1 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                >
                  <option value="" disabled>
                    Chọn khoa
                  </option>
                  {facultyOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mb-4 flex flex-col flex-1">
                <label className="block text-sm font-medium text-gray-700">
                  Ngành:
                </label>
                <input
                  type="text"
                  name="tenNganh"
                  value={editedStudent.tenNganh || ""}
                  onChange={handleChange}
                  className="mt-1 block w-full border rounded px-2 py-1 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
              </div>
            </div>

            <div className="mb-4 flex flex-col">
              <label className="block text-sm font-medium text-gray-700">
                Địa chỉ chi tiết:
              </label>
              <input
                type="text"
                name="diaChiChiTiet"
                value={editedStudent.diaChiChiTiet || ""}
                onChange={handleChange}
                className="mt-1 block w-full border rounded px-2 py-1 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              />
            </div>

            <div className="flex gap-4">
              <div className="mb-4 flex flex-col flex-1">
                <label className="block text-sm font-medium text-gray-700">
                  Tỉnh/thành phố (tạm trú):
                </label>
                <input
                  type="text"
                  name="tinh_thanhPho"
                  value={editedStudent.tinh_thanhPho || ""}
                  onChange={handleChange}
                  className="mt-1 block w-full border rounded px-2 py-1 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
              </div>
              <div className="mb-4 flex flex-col flex-1">
                <label className="block text-sm font-medium text-gray-700">
                  Quận/huyện (tạm trú):
                </label>
                <input
                  type="text"
                  name="quan_huyen"
                  value={editedStudent.quan_huyen || ""}
                  onChange={handleChange}
                  className="mt-1 block w-full border rounded px-2 py-1 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
              </div>
              <div className="mb-4 flex flex-col flex-1">
                <label className="block text-sm font-medium text-gray-700">
                  Xã/phường (tạm trú):
                </label>
                <input
                  type="text"
                  name="xa_phuong"
                  value={editedStudent.xa_phuong || ""}
                  onChange={handleChange}
                  className="mt-1 block w-full border rounded px-2 py-1 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
              </div>
            </div>
            <div className="flex gap-4">
              <div className="mb-4 flex flex-col flex-1">
                <label className="block text-sm font-medium text-gray-700">
                  Ngày sinh:
                </label>
                <input
                  type="date"
                  name="ngaySinh"
                  value={editedStudent.ngaySinh || ""}
                  onChange={handleChange}
                  className="mt-1 block w-full border rounded px-2 py-1 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
              </div>
              <div className="mb-4 flex flex-col flex-1">
                <label className="block text-sm font-medium text-gray-700">
                  CMND:
                </label>
                <input
                  type="text"
                  name="cmnd"
                  value={editedStudent.cmnd || ""}
                  onChange={handleChange}
                  className="mt-1 block w-full border rounded px-2 py-1 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
              </div>
              <div className="mb-4 flex flex-col flex-1">
                <label className="block text-sm font-medium text-gray-700">
                  Email cá nhân:
                </label>
                <input
                  type="email"
                  name="emailCaNhan"
                  value={editedStudent.emailCaNhan || ""}
                  onChange={handleChange}
                  className="mt-1 block w-full border rounded px-2 py-1 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
              </div>
            </div>
            <div className="flex gap-4">
              {/* <div className="mb-4 flex flex-col flex-1">
                <label className="block text-sm font-medium text-gray-700">
                  Điện thoại:
                </label>
                <input
                  type="text"
                  name="phone"
                  value={editedStudent.phone || ""}
                  onChange={handleChange}
                  className="mt-1 block w-full border rounded px-2 py-1 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
              </div> */}
              <div className="mb-4 flex flex-col flex-1">
                <label className="block text-sm font-medium text-gray-700">
                  Giới tính:
                </label>
                <select
                  name="gioiTinh"
                  value={editedStudent.gioiTinh || ""}
                  onChange={handleChange}
                  className="mt-1 block w-full border rounded px-2 py-1 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                >
                  <option value="" disabled>
                    Chọn giới tính
                  </option>
                  {genderOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mb-4 flex flex-col flex-1">
                <label className="block text-sm font-medium text-gray-700">
                  Nơi sinh:
                </label>
                <input
                  type="text"
                  name="noiSinh"
                  value={editedStudent.noiSinh || ""}
                  onChange={handleChange}
                  className="mt-1 block w-full border rounded px-2 py-1 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
              </div>
            </div>

            <div className="mb-4 flex flex-col">
              <label className="block text-sm font-medium text-gray-700">
                Địa chỉ chi tiết (thường trú):
              </label>
              <input
                type="text"
                name="diaChiChiTiet1"
                value={editedStudent.diaChiChiTiet1 || ""}
                onChange={handleChange}
                className="mt-1 block w-full border rounded px-2 py-1 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              />
            </div>

            <div className="flex gap-4">
              <div className="mb-4 flex flex-col flex-1">
                <label className="block text-sm font-medium text-gray-700">
                  Tỉnh/thành phố (thường trú):
                </label>
                <input
                  type="text"
                  name="tinh_thanhPho1"
                  value={editedStudent.tinh_thanhPho1 || ""}
                  onChange={handleChange}
                  className="mt-1 block w-full border rounded px-2 py-1 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
              </div>
              <div className="mb-4 flex flex-col flex-1">
                <label className="block text-sm font-medium text-gray-700">
                  Quận/huyện (thường trú):
                </label>
                <input
                  type="text"
                  name="quan_huyen1"
                  value={editedStudent.quan_huyen1 || ""}
                  onChange={handleChange}
                  className="mt-1 block w-full border rounded px-2 py-1 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
              </div>
              <div className="mb-4 flex flex-col flex-1">
                <label className="block text-sm font-medium text-gray-700">
                  Phường/xã (thường trú):
                </label>
                <input
                  type="text"
                  name="xa_phuong1"
                  value={editedStudent.xa_phuong1 || ""}
                  onChange={handleChange}
                  className="mt-1 block w-full border rounded px-2 py-1 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
              </div>
            </div>
          </div>
          <div className="flex justify-end mt-4 gap-4">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-300 hover:bg-gray-400 px-4 py-2 rounded mr-2"
            >
              Hủy bỏ
            </button>
            <button
              type="submit"
              className="bg-[#2F6BFF] text-white py-2 px-4 rounded shadow-xl hover:bg-opacity-90"
            >
              Lưu chỉnh sửa
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditStudentModal;
