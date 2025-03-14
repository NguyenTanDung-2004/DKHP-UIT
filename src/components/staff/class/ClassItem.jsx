import React, { useState } from "react";
import EditClassModal from "./EditClassModal";
import { deleteClassAfter } from "../../../services/classServices";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ClassItem = ({ classData, onSelect, isSelected }) => {
  const {
    className,
    subject,
    thu,
    tietBatDau,
    tietKetThuc,
    startDate,
    endDate,
    giangVien,
    currentSiSo,
    siso,
    flagTH,
    room,
    credits,
  } = classData;
  const [editModalOpen, setEditModalOpen] = useState(false);

  const handleOpenEditModal = () => {
    setEditModalOpen(true);
  };

  const handleCloseEditModal = () => {
    setEditModalOpen(false);
  };
  const isDeleteButtonDisabled = Number(currentSiSo) / siso <= 0.5;
  const hinhThuc = flagTH === 0 ? "LT" : flagTH === 1 ? "HT1" : "HT2";

  const handleDeleteClass = async (id) => {
    try {
      await deleteClassAfter(id);

      window.location.reload();
      // if (response.text == "delete") {
      //   alert("thanhf coong");

      // } else {
      //   alert("thaais baij");
      //   toast.error(`Xóa lớp học thất bại !`, {
      //     position: "bottom-right",
      //     autoClose: 3000,
      //     hideProgressBar: false,
      //     closeOnClick: true,
      //     pauseOnHover: true,
      //     draggable: true,
      //   });
    } catch (error) {
      window.location.reload();
      // console.error("Error deleting classes:", error);
      // toast.error(`Xóa lớp học thất bại !`, {
      //   position: "bottom-right",
      //   autoClose: 3000,
      //   hideProgressBar: false,
      //   closeOnClick: true,
      //   pauseOnHover: true,
      //   draggable: true,
      // });
    }
  };

  return (
    <tr className={isSelected ? "bg-white" : "bg-gray-50"}>
      {flagTH === 0 ? (
        <td className="py-4 px-4 border border-[#B9B9B9] text-center">
          <input
            type="checkbox"
            checked={isSelected}
            onChange={onSelect}
            className="cursor-pointer"
          />
        </td>
      ) : (
        <td className="py-4 px-4 border border-[#B9B9B9] text-center"></td>
      )}
      <td className="py-4 px-4 border border-[#B9B9B9] text-center">
        {className}
      </td>
      <td className="py-4 px-4 border border-[#B9B9B9]">
        {subject.maMonHoc + " - " + subject.tenMonHoc}
      </td>
      <td className="py-4 px-4 border border-[#B9B9B9] text-center">
        {hinhThuc}
      </td>
      <td className="py-4 px-4 border border-[#B9B9B9] text-center">
        {credits}
      </td>
      <td className="py-4 px-4 border border-[#B9B9B9]">{`${thu}, Tiết ${tietBatDau}-${tietKetThuc}; ${startDate}-${endDate}`}</td>
      <td className="py-4 px-4 border border-[#B9B9B9]">{giangVien.name}</td>
      <td className="py-4 px-4 border border-[#B9B9B9] text-center">{`${currentSiSo}/${siso}`}</td>
      <td className="py-4 px-4 border border-[#B9B9B9] text-center">
        {isDeleteButtonDisabled && flagTH === 0 ? (
          <button
            onClick={() => handleDeleteClass(classData.id)}
            className={`w-fix  text-white py-2 px-4 rounded shadow-xl bg-[#E43D3D] hover:bg-opacity-90}`}
          >
            HỦY
          </button>
        ) : (
          <td className="py-4 px-4 text-center"></td>
        )}
      </td>
      <td className="py-4 px-4 border border-[#B9B9B9] text-center">
        <button
          onClick={handleOpenEditModal}
          className="text-[#2F6BFF] hover:text-opacity-50 text-xl rounded-full flex items-center justify-center w-full h-full"
        >
          <i className="fas fa-edit"></i>
        </button>
        <EditClassModal
          isOpen={editModalOpen}
          onClose={handleCloseEditModal}
          classData={classData}
        />
      </td>
    </tr>
  );
};

export default ClassItem;
