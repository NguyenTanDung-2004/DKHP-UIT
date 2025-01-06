import React, { useState, useEffect, useRef } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { createSubject } from "../../../services/subjectServices";

const AddSubjectModal = ({ isOpen, onClose, maMonHocList }) => {
  const [maMonHoc, setMaMonHoc] = useState("");
  const [tenMonHoc, setTenMonHoc] = useState("");
  const [loaiMonHoc, setLoaiMonHoc] = useState("");
  const [maKhoa, setMaKhoa] = useState("");
  const [tinChiLT, setTinChiLT] = useState("");
  const [tinChiTH, setTinChiTH] = useState("");
  // const [monHocTruoc, setMonHocTruoc] = useState([]);  // Removed this line
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const subjectTypes = [
    { label: "LT", value: "LT" },
    { label: "CN", value: "CN" },
    { label: "CSNN", value: "CSNN" },
    { label: "CĐTN", value: "CĐTN" },
    { label: "CSN", value: "CSN" },
    { label: "ĐC", value: "ĐC" },
    { label: "CNTC", value: "CNTC" },
    { label: "ĐA", value: "ĐA" },
    { label: "KLTN", value: "KLTN" },
    { label: "TTTN", value: "TTTN" },
  ];

  const subjectMajors = [
    { label: "CS", value: "CS" },
    { label: "SE", value: "SE" },
    { label: "IS", value: "IS" },
    { label: "CE", value: "CE" },
    { label: "ENG", value: "ENG" },
    { label: "MA", value: "MA" },
    { label: "PDT", value: "PDT" },
    { label: "SS", value: "SS" },
    { label: "NC", value: "NC" },
  ];

  const handleCheckboxChange = (event) => {
    const value = event.target.value;
    if (selectedOptions.includes(value)) {
      setSelectedOptions(selectedOptions.filter((option) => option !== value));
    } else {
      setSelectedOptions([...selectedOptions, value]);
    }
    //  Removed setMonHocTruoc(selectedOptions);
  };

  const handleAdd = async () => {
    const newSubject = {
      maMonHoc,
      tenMonHoc,
      loaiMonHoc,
      maKhoa,
      soTinChiLT: Number(tinChiLT),
      soTinChiTH: Number(tinChiTH),
      maMonHocTruoc: selectedOptions, // Use selectedOptions directly
    };
    try {
      const data = await createSubject(newSubject);
      toast.success("Thêm môn học thành công!", {
        position: "bottom-right",
        autoClose: 3000, // Thời gian hiển thị toast
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      // Reset form after successful submission
      handleResetForm();
    } catch (error) {
      toast.error("Thêm môn học thất bại!", {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
  };

  const handleResetForm = () => {
    setMaMonHoc("");
    setTenMonHoc("");
    setLoaiMonHoc("");
    setMaKhoa("");
    setTinChiLT("");
    setTinChiTH("");
    // setMonHocTruoc([]);  // Removed this line
    setSelectedOptions([]);
    setSearchTerm("");
    setIsDropdownOpen(false);
  };

  const handleClose = () => {
    handleResetForm();
    onClose();
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    setIsDropdownOpen(true);
  };

  const filteredMaMonHocList = maMonHocList.filter((maMonHoc) =>
    maMonHoc.toLowerCase().includes(searchTerm.toLowerCase())
  );
  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-500 bg-opacity-75">
      <div className="bg-white p-6 rounded shadow-lg w-[450px]">
        <div className="flex justify-between items-center mb-4">
          <h2 className="font-semibold text-xl">THÊM MÔN HỌC MỚI</h2>
          <button
            onClick={handleClose}
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
        <div className="mb-4 flex flex-col">
          <label className="block text-sm font-medium text-gray-700">
            Mã môn học
          </label>
          <input
            type="text"
            className="mt-1 block w-full border rounded px-2 py-1 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            value={maMonHoc}
            onChange={(e) => setMaMonHoc(e.target.value)}
          />
        </div>
        <div className="mb-4 flex flex-col">
          <label className="block text-sm font-medium text-gray-700">
            Tên môn học
          </label>
          <input
            type="text"
            className="mt-1 block w-full border rounded px-2 py-1 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            value={tenMonHoc}
            onChange={(e) => setTenMonHoc(e.target.value)}
          />
        </div>
        <div className="mb-4 flex gap-4">
          <div className="flex-1 flex-col">
            <label className="block text-sm font-medium text-gray-700">
              Loại môn học
            </label>
            <select
              className="mt-1 block w-full border rounded px-2 py-1 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              value={loaiMonHoc}
              onChange={(e) => setLoaiMonHoc(e.target.value)}
            >
              <option value="" disabled>
                Chọn loại môn học
              </option>
              {subjectTypes.map((type) => (
                <option key={type.value} value={type.value}>
                  {type.label}
                </option>
              ))}
            </select>
          </div>
          <div className="flex-1 flex-col">
            <label className="block text-sm font-medium text-gray-700">
              Mã khoa
            </label>
            <select
              className="mt-1 block w-full border rounded px-2 py-1 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              value={maKhoa}
              onChange={(e) => setMaKhoa(e.target.value)}
            >
              <option value="" disabled>
                Chọn mã khoa
              </option>
              {subjectMajors.map((major) => (
                <option key={major.value} value={major.value}>
                  {major.label}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="mb-4 flex gap-4">
          <div className="flex-1 flex-col">
            <label className="block text-sm font-medium text-gray-700">
              Tín chỉ lý thuyết
            </label>
            <input
              type="number"
              min={0}
              onWheel={(e) => e.target.blur()}
              className="mt-1 block w-full border rounded px-2 py-1 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              value={tinChiLT}
              onChange={(e) => setTinChiLT(e.target.value)}
            />
          </div>
          <div className="flex-1 flex-col">
            <label className="block text-sm font-medium text-gray-700">
              Tín chỉ thực hành
            </label>
            <input
              type="number"
              min={0}
              onWheel={(e) => e.target.blur()}
              className="mt-1 block w-full border rounded px-2 py-1 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              value={tinChiTH}
              onChange={(e) => setTinChiTH(e.target.value)}
            />
          </div>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Môn học trước
          </label>
          <div className="relative" ref={dropdownRef}>
            <input
              type="text"
              placeholder="Tìm môn học trước..."
              className="mt-1 block w-full border rounded px-2 py-1 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              value={searchTerm}
              onChange={handleSearchChange}
            />
            {isDropdownOpen && (
              <div
                className="absolute mt-1 bg-white border border-gray-300 rounded shadow-lg max-h-40 overflow-y-auto w-full z-10"
                style={{ maxHeight: "200px" }}
              >
                {filteredMaMonHocList.map((maMonHoc) => (
                  <div
                    key={maMonHoc}
                    className="flex items-center px-2 py-1 hover:bg-gray-100 cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      id={maMonHoc}
                      value={maMonHoc}
                      checked={selectedOptions.includes(maMonHoc)}
                      onChange={handleCheckboxChange}
                      className="mr-2"
                    />
                    <label htmlFor={maMonHoc}>{maMonHoc}</label>
                  </div>
                ))}
                {filteredMaMonHocList.length === 0 && searchTerm !== "" && (
                  <div className="px-2 py-1 text-gray-500">
                    Không tìm thấy môn học
                  </div>
                )}
              </div>
            )}
          </div>
          {selectedOptions.length > 0 && (
            <div className="mt-2">
              <span className="font-medium text-gray-700">Đã chọn: </span>
              {selectedOptions.map((option, index) => (
                <span
                  key={option}
                  className="inline-block bg-gray-200 rounded-full px-2 py-1 text-sm text-gray-700 mr-1"
                >
                  {option}
                  {index !== selectedOptions.length - 1 && ", "}
                </span>
              ))}
            </div>
          )}
        </div>
        <div className="flex justify-end mt-4">
          <button
            className="bg-[#2F6BFF] text-white py-2 px-4 rounded shadow-xl hover:bg-opacity-90"
            onClick={handleAdd}
          >
            Thêm
          </button>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default AddSubjectModal;
