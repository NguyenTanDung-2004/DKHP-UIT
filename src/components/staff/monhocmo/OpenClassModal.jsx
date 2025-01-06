import React, { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  addClassNonTH,
  addClassWithInPractice,
  getGiangVienList,
  getRoomList,
} from "../../../services/classServices";

const OpenClassModal = ({ isOpen, onClose, subject, hasPractice }) => {
  const [siSo, setSiSo] = useState(30);
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [tietBatDau, setTietBatDau] = useState(1);
  const [tietKetThuc, setTietKetThuc] = useState(2);
  const [thu, setThu] = useState(2);
  const [giangVienId, setGiangVienId] = useState("");
  const [roomId, setRoomId] = useState("");
  const [flagTH, setFlagTH] = useState(1);
  const [thStart, setThStart] = useState("");
  const [thEnd, setThEnd] = useState("");
  const [sectionOfDay, setSectionOfDay] = useState(1);
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
  const practiceType = [
    { label: "HT1", value: 1 },
    { label: "HT2", value: 2 },
  ];
  const morningTimeSlots = [6, 7, 8, 9, 10];
  const afternoonTimeSlots = [1, 2, 3, 4, 5];

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

  const handleOpenClass = async () => {
    if (hasPractice) {
      // Handle add class with practice
      const classData = {
        requestCreateClassNonTH: {
          subjectId: subject.id,
          siSo: Number(siSo),
          start: start,
          end: end,
          tietBatDau: Number(tietBatDau),
          thu: Number(thu),
          giangVienId: giangVienId,
          roomId: roomId,
        },
        flagTH: Number(flagTH),
        start: thStart,
        end: thEnd,
        sectionOfDay: Number(sectionOfDay),
        thu: Number(thu),
        giangVienId: giangVienId,
        roomId: roomId,
      };
      try {
        await addClassWithInPractice(classData);
        await new Promise((resolve) => {
          toast.success("Mở lớp học thành công!", {
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
        toast.error("Mở lớp học thất bại!", {
          position: "bottom-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      }
    } else {
      // Handle add class non practice
      const classData = {
        subjectId: subject.id,
        siSo: Number(siSo),
        start: start,
        end: end,
        tietBatDau: Number(tietBatDau),
        thu: Number(thu),
        giangVienId: giangVienId,
        roomId: roomId,
      };
      try {
        await addClassNonTH(classData);
        await new Promise((resolve) => {
          toast.success("Mở lớp học thành công!", {
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
        toast.error("Mở lớp học thất bại! Giảng viên trùng lịch!", {
          position: "bottom-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      }
    }
  };

  const handleCloseModal = () => {
    onClose();
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
  const handleSectionOfDayChange = (e) => {
    const newSectionOfDay = Number(e.target.value);
    setSectionOfDay(newSectionOfDay);
    // Reset the time slots to be correct
    if (newSectionOfDay === 1) {
      setTietBatDau(6);
      setTietKetThuc(7);
    } else {
      setTietBatDau(1);
      setTietKetThuc(2);
    }
  };
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-500 bg-opacity-75">
      <div className="bg-white p-6 rounded shadow-lg w-[600px] overflow-y-auto max-h-[90vh]">
        <div className="flex justify-between items-center mb-4">
          <h2 className="font-semibold text-xl">MỞ LỚP HỌC</h2>
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
        {hasPractice ? (
          <>
            <div className="mb-4 flex gap-4">
              <div className="flex-1 flex-col">
                <label className="block text-sm font-medium text-gray-700">
                  Sĩ số
                </label>
                <input
                  type="number"
                  min={1}
                  className="mt-1 block w-full border rounded px-2 py-1 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  value={siSo}
                  onChange={(e) => setSiSo(e.target.value)}
                />
              </div>
            </div>
            <div className="mb-4 flex gap-4">
              <div className="flex-1 flex-col">
                <label className="block text-sm font-medium text-gray-700">
                  Ngày bắt đầu (Lý Thuyết)
                </label>
                <input
                  type="date"
                  className="mt-1 block w-full border rounded px-2 py-1 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  value={start}
                  onChange={(e) => setStart(e.target.value)}
                />
              </div>
              <div className="flex-1 flex-col">
                <label className="block text-sm font-medium text-gray-700">
                  Ngày kết thúc (Lý Thuyết)
                </label>
                <input
                  type="date"
                  className="mt-1 block w-full border rounded px-2 py-1 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  value={end}
                  onChange={(e) => setEnd(e.target.value)}
                />
              </div>
            </div>
            <div className="mb-4 flex gap-4">
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
                    <option
                      key={tiet}
                      value={tiet}
                      disabled={tiet <= tietBatDau}
                    >
                      {tiet}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="mb-4 flex gap-4">
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
            <div className="mb-4 flex gap-4">
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
            <div className="mb-4 flex gap-4">
              <div className="flex-1 flex-col">
                <label className="block text-sm font-medium text-gray-700">
                  Ngày bắt đầu (Thực Hành)
                </label>
                <input
                  type="date"
                  className="mt-1 block w-full border rounded px-2 py-1 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  value={thStart}
                  onChange={(e) => setThStart(e.target.value)}
                />
              </div>
              <div className="flex-1 flex-col">
                <label className="block text-sm font-medium text-gray-700">
                  Ngày kết thúc (Thực Hành)
                </label>
                <input
                  type="date"
                  className="mt-1 block w-full border rounded px-2 py-1 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  value={thEnd}
                  onChange={(e) => setThEnd(e.target.value)}
                />
              </div>
            </div>
            <div className="mb-4 flex gap-4">
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
              <div className="flex-1 flex-col">
                <label className="block text-sm font-medium text-gray-700">
                  Hình thức thực hành
                </label>
                <select
                  className="mt-1 block w-full border rounded px-2 py-1 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  value={flagTH}
                  onChange={(e) => setFlagTH(Number(e.target.value))}
                >
                  {practiceType.map((type) => (
                    <option key={type.value} value={type.value}>
                      {type.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="mb-4 flex gap-4">
              <div className="flex-1 flex-col">
                <label className="block text-sm font-medium text-gray-700">
                  Sĩ số
                </label>
                <input
                  type="number"
                  min={1}
                  className="mt-1 block w-full border rounded px-2 py-1 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  value={siSo}
                  onChange={(e) => setSiSo(e.target.value)}
                />
              </div>
            </div>
            <div className="mb-4 flex gap-4">
              <div className="flex-1 flex-col">
                <label className="block text-sm font-medium text-gray-700">
                  Ngày bắt đầu
                </label>
                <input
                  type="date"
                  className="mt-1 block w-full border rounded px-2 py-1 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  value={start}
                  onChange={(e) => setStart(e.target.value)}
                />
              </div>
              <div className="flex-1 flex-col">
                <label className="block text-sm font-medium text-gray-700">
                  Ngày kết thúc
                </label>
                <input
                  type="date"
                  className="mt-1 block w-full border rounded px-2 py-1 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  value={end}
                  onChange={(e) => setEnd(e.target.value)}
                />
              </div>
            </div>
            <div className="mb-4 flex gap-4">
              <div className="flex-1 flex-col">
                <label className="block text-sm font-medium text-gray-700">
                  Tiết bắt đầu
                </label>
                <select
                  className="mt-1 block w-full border rounded px-2 py-1 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  value={tietBatDau}
                  onChange={handleTietBatDauChange}
                >
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((tiet) => (
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
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((tiet) => (
                    <option
                      key={tiet}
                      value={tiet}
                      disabled={tiet <= tietBatDau}
                    >
                      {tiet}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="mb-4 flex gap-4">
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
            <div className="mb-4 flex gap-4">
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
          </>
        )}

        <div className="flex justify-end mt-4">
          <button
            className="bg-[#2F6BFF] text-white py-2 px-4 rounded shadow-xl hover:bg-opacity-90"
            onClick={handleOpenClass}
          >
            Mở lớp
          </button>
        </div>
        <ToastContainer />
      </div>
    </div>
  );
};

export default OpenClassModal;
