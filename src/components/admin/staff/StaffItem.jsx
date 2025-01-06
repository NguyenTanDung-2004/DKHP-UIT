import React, { useState } from "react";
import EditStaffModal from "./EditStaffModal";

const StaffItem = ({ staff, index, onSelect, isSelected, onEditStaff }) => {
  const { fullName, email, account, flagAdmin, id } = staff;
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const handleOpenEditModal = () => {
    setIsEditModalOpen(true);
  };

  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
  };

  const role = flagAdmin ? "admin" : "staff";
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
          {index}
        </td>
        <td className="py-4 px-4 border border-[#B9B9B9]">{fullName}</td>
        <td className="py-4 px-4 border border-[#B9B9B9]">{email}</td>
        <td className="py-4 px-4 border border-[#B9B9B9]">{account}</td>
        <td className="py-4 px-4 border border-[#B9B9B9]">{role}</td>
        <td className="py-4 px-4 border border-[#B9B9B9] text-center">
          <i
            onClick={handleOpenEditModal}
            className="fa-solid fa-pen-to-square text-blue-500 cursor-pointer"
          ></i>
        </td>
      </tr>
      <EditStaffModal
        isOpen={isEditModalOpen}
        onClose={handleCloseEditModal}
        staff={staff}
        onEditStaff={onEditStaff}
      />
    </>
  );
};

export default StaffItem;
