import React, { useState } from "react";

const CreateStaffModal = ({ isOpen, onClose, onCreateStaff }) => {
  const [staffData, setStaffData] = useState({
    name: "",
    email: "",
    username: "",
    role: "staff",
  });

  const handleChange = (e) => {
    setStaffData({ ...staffData, [e.target.name]: e.target.value });
  };
  const handleRoleChange = (e) => {
    setStaffData({ ...staffData, role: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await onCreateStaff(staffData);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-500 bg-opacity-75">
      <div className="bg-white p-6 rounded shadow-lg w-[400px]  overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="font-semibold text-xl">THÊM NHÂN VIÊN</h2>
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
          <div className="flex flex-col">
            <div className="mb-4 flex flex-col">
              <label className="block text-sm font-medium text-gray-700">
                Tên nhân viên:
              </label>
              <input
                type="text"
                name="name"
                value={staffData.name}
                onChange={handleChange}
                className="mt-1 block w-full border rounded px-2 py-1 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                required
              />
            </div>
            <div className="mb-4 flex flex-col">
              <label className="block text-sm font-medium text-gray-700">
                Email:
              </label>
              <input
                type="email"
                name="email"
                value={staffData.email}
                onChange={handleChange}
                className="mt-1 block w-full border rounded px-2 py-1 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                required
              />
            </div>
            <div className="mb-4 flex flex-col">
              <label className="block text-sm font-medium text-gray-700">
                Tài khoản:
              </label>
              <input
                type="text"
                name="username"
                value={staffData.username}
                onChange={handleChange}
                className="mt-1 block w-full border rounded px-2 py-1 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                required
              />
            </div>
            <div className="mb-4 flex flex-col">
              <label className="block text-sm font-medium text-gray-700">
                Vai trò:
              </label>
              <div className="mt-1 flex items-center space-x-4">
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    name="role"
                    value="staff"
                    checked={staffData.role === "staff"}
                    onChange={handleRoleChange}
                    className="form-radio h-4 w-4 text-indigo-600 focus:ring-indigo-500"
                  />
                  <span className="ml-2 text-gray-700">Staff</span>
                </label>
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    name="role"
                    value="admin"
                    checked={staffData.role === "admin"}
                    onChange={handleRoleChange}
                    className="form-radio h-4 w-4 text-indigo-600 focus:ring-indigo-500"
                  />
                  <span className="ml-2 text-gray-700">Admin</span>
                </label>
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
              onClick={handleSubmit}
              className="bg-[#2F6BFF] text-white py-2 px-4 rounded shadow-xl hover:bg-opacity-90"
            >
              Lưu
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateStaffModal;
