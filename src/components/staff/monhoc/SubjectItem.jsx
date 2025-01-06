import React, { useState } from "react";
import EditSubjectModal from "./EditSubjectModal";
const SubjectItem = ({
  subject,
  onSelect,
  isSelected,
  disabled,
  maMonHocList,
  onEditSubject,
}) => {
  const {
    maMonHoc,
    tenMonHoc,
    loaiMonHoc,
    maKhoa,
    dsMaMonHocTruoc,
    soTinChiLT,
    soTinChiTH,
    id,
  } = subject;
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const handleOpenEditModal = () => {
    setIsEditModalOpen(true);
  };
  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
  };

  return (
    <>
      <tr className={`${isSelected ? "bg-white" : "bg-gray-50"} `}>
        <td className="py-4 px-4 border border-[#B9B9B9] text-center">
          <input
            type="checkbox"
            checked={isSelected}
            onChange={onSelect}
            className={` ${
              disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
            }`}
            disabled={disabled}
            title={disabled ? "Môn học này đã được mở" : undefined}
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
        <td className="py-4 px-4 border border-[#B9B9B9]">
          {dsMaMonHocTruoc ? dsMaMonHocTruoc.join(", ") : ""}
        </td>
        <td className="py-4 px-4 border border-[#B9B9B9]  text-center">
          {soTinChiLT}
        </td>
        <td className="py-4 px-4 border border-[#B9B9B9]  text-center">
          {soTinChiTH}
        </td>
        <td className="py-4 px-4 border border-[#B9B9B9] text-center">
          <i
            onClick={handleOpenEditModal}
            className="fa-solid fa-pen-to-square text-blue-500 cursor-pointer"
          ></i>
        </td>
      </tr>
      <EditSubjectModal
        isOpen={isEditModalOpen}
        onClose={handleCloseEditModal}
        subject={subject}
        maMonHocList={maMonHocList}
        onEditSubject={onEditSubject}
      />
    </>
  );
};

export default SubjectItem;
