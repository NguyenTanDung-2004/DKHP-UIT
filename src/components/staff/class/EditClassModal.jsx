import React, { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  editClass,
  getGiangVienList,
  getRoomList,
} from "../../../services/classServices";

const EditClassModal = ({ isOpen, onClose, classData }) => {
  const [siso, setSiso] = useState(classData?.siso || 30);
  const [startDate, setStartDate] = useState(
    classData?.startDate ? formatDate(classData.startDate) : ""
  );
  const [endDate, setEndDate] = useState(
    classData?.endDate ? formatDate(classData.endDate) : ""
  );
  const [tietBatDau, setTietBatDau] = useState(classData?.tietBatDau || 1);
  const [tietKetThuc, setTietKetThuc] = useState(classData?.tietKetThuc || 2);
  const [thu, setThu] = useState(getDayOfWeekValue(classData?.thu) || 2); // Changed here
  const [giangVienId, setGiangVienId] = useState(
    classData?.giangVien?.id || ""
  );
  const [roomId, setRoomId] = useState(classData?.room?.id || "");
  const [note, setNote] = useState(classData?.note || "");
  const [idLT, setIdLT] = useState(classData?.idLT || "");
  const [sectionOfDay, setSectionOfDay] = useState(
    classData?.sectionOfDay || 1
  );
  const [flagTH, setFlagTH] = useState(classData?.flagTH || 0);
  const [giangVienList, setGiangVienList] = useState([]);
  const [roomList, setRoomList] = useState([]);
  const daysOfWeek = [
    { label: "Thứ 2", value: 2 },
    { label: "Thứ 3", value: 3 },
    { label: "Thứ 4", value: 4 },
    { label: "Thứ 5", value: 5 },
    { label: "Thứ 6", value: 6 },
    { label: "Thứ 7", value: 7 },
    { label: "Chủ nhật", value: 8 },
  ];
  const sectionOfDays = [
    { label: "Sáng", value: 1 },
    { label: "Chiều", value: 2 },
  ];

  const morningTimeSlots = [1, 2, 3, 4, 5];
  const afternoonTimeSlots = [6, 7, 8, 9, 10];
  function getDayOfWeekValue(dayString) {
    switch (dayString) {
      case "Thứ hai":
        return 2;
      case "Thứ ba":
        return 3;
      case "Thứ tư":
        return 4;
      case "Thứ năm":
        return 5;
      case "Thứ sáu":
        return 6;
      case "Thứ bảy":
        return 7;
      case "Chủ nhật":
        return 8;
      default:
        return 2;
    }
  }
  function formatDate(dateString) {
    if (!dateString) return "";
    try {
      const parts = dateString.split("/");
      let date;

      if (parts.length === 3) {
        const day = parseInt(parts[0], 10);
        const month = parseInt(parts[1], 10) - 1; // Month is 0-indexed
        const year = parseInt(parts[2], 10);
        date = new Date(year, month, day);
        if (isNaN(date.getTime())) {
          return "";
        }
      } else {
        date = new Date(dateString);
        if (isNaN(date.getTime())) {
          return "";
        }
      }

      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const day = String(date.getDate()).padStart(2, "0");
      return `${year}-${month}-${day}`;
    } catch (error) {
      console.error("Error parsing date:", error);
      return "";
    }
  }
  const parseDateForDisplay = (dateString) => {
    if (!dateString) return "";
    try {
      const parts = dateString.split("/");
      let date;
      if (parts.length === 3) {
        const day = parseInt(parts[0], 10);
        const month = parseInt(parts[1], 10) - 1;
        const year = parseInt(parts[2], 10);

        date = new Date(year, month, day);
        if (isNaN(date.getTime())) {
          return "";
        }
      } else {
        date = new Date(dateString);
        if (isNaN(date.getTime())) {
          return "";
        }
      }

      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const day = String(date.getDate()).padStart(2, "0");
      return `${year}-${month}-${day}`;
    } catch (error) {
      console.error("Error parsing date:", error);
      return "";
    }
  };

  const getTimeSlots = () => {
    return sectionOfDay === 1 ? morningTimeSlots : afternoonTimeSlots;
  };

  useEffect(() => {
    const fetchGiangVien = async () => {
      try {
        const data = await getGiangVienList();
        setGiangVienList(data);
      } catch (error) {
        console.error("Error fetching giang vien list:", error);
      }
    };

    const fetchRooms = async () => {
      try {
        const data = await getRoomList();
        setRoomList(data);
      } catch (error) {
        console.error("Error fetching room list:", error);
      }
    };

    fetchGiangVien();
    fetchRooms();
  }, []);
  const handleEditClass = async () => {
    const classDataToUpdate = {
      classId: classData.id,
      siso: Number(siso),
      startDate: startDate,
      endDate: endDate,
      tietBatDau: Number(tietBatDau),
      thu: Number(thu),
      flagTH: Number(flagTH),
      note: note,
      idLT: idLT,
      sectionOfDay: Number(sectionOfDay),
      roomId: roomId,
      giangVienId: giangVienId,
      subjectId: classData.subjectId,
    };
    console.log("edit class: ", classDataToUpdate);
    try {
      await editClass(classDataToUpdate);
      await new Promise((resolve) => {
        toast.success("Chỉnh sửa lớp học thành công!", {
          position: "bottom-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          onClose: resolve,
        });
      });
      onClose();
    } catch (error) {
      toast.error("Chỉnh sửa lớp học thất bại!", {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
  };

  const handleCloseModal = () => {
    onClose();
  };
  const handleSectionOfDayChange = (e) => {
    setSectionOfDay(Number(e.target.value));
  };
  const handleTietBatDauChange = (e) => {
    const newTietBatDau = Number(e.target.value);
    setTietBatDau(newTietBatDau);
    // Ensure tietKetThuc is at least tietBatDau + 1
    if (tietKetThuc <= newTietBatDau) {
      setTietKetThuc(newTietBatDau + 1);
    }
  };
  const handleTietKetThucChange = (e) => {
    const newTietKetThuc = Number(e.target.value);
    if (newTietKetThuc > tietBatDau) setTietKetThuc(newTietKetThuc);
  };
  const handleFlagTHChange = (e) => {
    setFlagTH(Number(e.target.value));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-500 bg-opacity-75">
      <div className=" bg-white p-6 rounded shadow-lg w-[600px] overflow-y-auto max-h-[90vh]">
        <div className="flex justify-between items-center mb-4">
          <h2 className="font-semibold text-xl">CHỈNH SỬA LỚP HỌC</h2>
          <button
            onClick={handleCloseModal}
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
        <div className="mb-4 text-start flex gap-4">
          <div className="flex-1 flex-col">
            <label className="block text-sm font-medium text-gray-700">
              Sĩ số
            </label>
            <input
              type="number"
              min={1}
              className="mt-1 block w-full border rounded px-2 py-1 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              value={siso}
              onChange={(e) => setSiso(e.target.value)}
            />
          </div>
        </div>
        <div className="mb-4  text-start flex gap-4">
          <div className="flex-1 flex-col">
            <label className="block text-sm font-medium text-gray-700">
              Ngày bắt đầu
            </label>
            <input
              type="date"
              className="mt-1 block w-full border rounded px-2 py-1 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              value={parseDateForDisplay(classData?.startDate)}
              onChange={(e) => setStartDate(e.target.value)}
            />
          </div>
          <div className="flex-1 flex-col">
            <label className="block text-sm font-medium text-gray-700">
              Ngày kết thúc
            </label>
            <input
              type="date"
              className="mt-1 block w-full border rounded px-2 py-1 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              value={parseDateForDisplay(classData?.endDate)}
              onChange={(e) => setEndDate(e.target.value)}
            />
          </div>
        </div>
        <div className="mb-4  text-start flex gap-4">
          <div className="flex-1 flex-col">
            <label className="block text-sm font-medium text-gray-700">
              Tiết bắt đầu
            </label>
            <select
              className="mt-1 block w-full border rounded px-2 py-1 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              value={tietBatDau}
              onChange={handleTietBatDauChange}
            >
              {getTimeSlots().map((tiet) => (
                <option key={tiet} value={tiet}>
                  {tiet}
                </option>
              ))}
            </select>
          </div>
          <div className="flex-1 flex-col">
            <label className="block text-sm font-medium text-gray-700">
              Tiết kết thúc
            </label>
            <select
              className="mt-1 block w-full border rounded px-2 py-1 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              value={tietKetThuc}
              onChange={handleTietKetThucChange}
            >
              {getTimeSlots().map((tiet) => (
                <option key={tiet} value={tiet} disabled={tiet <= tietBatDau}>
                  {tiet}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="mb-4  text-start flex gap-4">
          <div className="flex-1 flex-col">
            <label className="block text-sm font-medium text-gray-700">
              Thứ
            </label>
            <select
              className="mt-1 block w-full border rounded px-2 py-1 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              value={thu}
              onChange={(e) => setThu(Number(e.target.value))}
            >
              {daysOfWeek.map((day) => (
                <option key={day.value} value={day.value}>
                  {day.label}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="mb-4  text-start flex gap-4">
          <div className="flex-1 flex-col">
            <label className="block text-sm font-medium text-gray-700">
              Giảng viên
            </label>
            <select
              className="mt-1 block w-full border rounded px-2 py-1 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              value={giangVienId}
              onChange={(e) => setGiangVienId(e.target.value)}
            >
              <option value="" disabled>
                Chọn giảng viên
              </option>
              {giangVienList.map((gv) => (
                <option key={gv.id} value={gv.id}>
                  {gv.name}
                </option>
              ))}
            </select>
          </div>
          <div className="flex-1 flex-col">
            <label className="block text-sm font-medium text-gray-700">
              Phòng học
            </label>
            <select
              className="mt-1 block w-full border rounded px-2 py-1 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              value={roomId}
              onChange={(e) => setRoomId(e.target.value)}
            >
              <option value="" disabled>
                Chọn phòng học
              </option>
              {roomList.map((room) => (
                <option key={room.id} value={room.id}>
                  {room.roomName}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="mb-4  text-start flex gap-4">
          <div className="flex-1 flex-col">
            <label className="block text-sm font-medium text-gray-700">
              Hình thức
            </label>
            <select
              className="mt-1 block w-full border rounded px-2 py-1 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              value={flagTH}
              onChange={handleFlagTHChange}
              disabled={true}
            >
              <option value={0}>LT</option>
              <option value={1}>HT1</option>
              <option value={2}>HT2</option>
            </select>
          </div>
          <div className="flex-1 flex-col">
            <label className="block text-sm font-medium text-gray-700">
              Buổi
            </label>
            <select
              className="mt-1 block w-full border rounded px-2 py-1 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              value={sectionOfDay}
              onChange={handleSectionOfDayChange}
            >
              {sectionOfDays.map((section) => (
                <option key={section.value} value={section.value}>
                  {section.label}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="flex justify-center mt-4">
          <button
            className="bg-[#2F6BFF] text-white py-2 px-4 rounded shadow-xl hover:bg-opacity-90"
            onClick={handleEditClass}
          >
            Lưu thay đổi
          </button>
        </div>
        <ToastContainer />
      </div>
    </div>
  );
};

export default EditClassModal;
