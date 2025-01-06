import React, { useState } from "react";
import OpenClassModal from "./OpenClassModal";

const SubjectItem = ({ subject, onSelect, isSelected }) => {
  const { maMonHoc, tenMonHoc, loaiMonHoc, maKhoa, soTinChiLT, soTinChiTH } =
    subject;
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <tr className={`${isSelected ? "bg-white" : "bg-gray-50"} `}>
        <td className="py-4 px-4 border border-[#B9B9B9] text-center">
          <input
            type="checkbox"
            checked={isSelected}
            onChange={onSelect}
            className="cursor-pointer"
          />
        </td>
        <td className="py-4 px-4 border border-[#B9B9B9] text-center">
          {maMonHoc}
        </td>
        <td className="py-4 px-4 border border-[#B9B9B9]">{tenMonHoc}</td>
        <td className="py-4 px-4 border border-[#B9B9B9]  text-center">
          {loaiMonHoc}
        </td>
        <td className="py-4 px-4 border border-[#B9B9B9] text-center">
          {maKhoa}
        </td>
        <td className="py-4 px-4 border border-[#B9B9B9] text-center">
          {soTinChiLT}
        </td>
        <td className="py-4 px-4 border border-[#B9B9B9] text-center">
          {soTinChiTH}
        </td>
        <td className="py-4 px-4 border border-[#B9B9B9] text-center">
          <button
            onClick={handleOpenModal}
            className="text-[#2F6BFF] hover:text-opacity-50 text-xl rounded-full flex items-center justify-center w-full h-full"
          >
            <i className="fas fa-plus"></i>
          </button>
        </td>
      </tr>
      <OpenClassModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        subject={subject}
        hasPractice={soTinChiTH > 0}
      />
    </>
  );
};

export default SubjectItem;
