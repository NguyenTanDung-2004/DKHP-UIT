import React from "react";
import StaffItem from "./StaffItem";

const StaffTable = ({
  staffs,
  selectedStaffIds,
  onToggleSelect,
  onEditStaff,
}) => {
  return (
    <table className="w-full table-auto border-collapse">
      <thead className="bg-[#0000000f] text-[#2F6BFF]">
        <tr>
          <th className="py-2 px-4 border border-[#B9B9B9]"></th>
          <th className="py-2 px-4 border border-[#B9B9B9]">STT</th>
          <th className="py-2 px-4 border border-[#B9B9B9]">TÊN NHÂN VIÊN</th>
          <th className="py-2 px-4 border border-[#B9B9B9]">EMAIL</th>
          <th className="py-2 px-4 border border-[#B9B9B9]">TÀI KHOẢN</th>
          <th className="py-2 px-4 border border-[#B9B9B9]">VAI TRÒ</th>
          <th className="py-2 px-4 border border-[#B9B9B9]"></th>
        </tr>
      </thead>
      <tbody>
        {staffs.map((staff, index) => (
          <StaffItem
            key={staff.id}
            staff={staff}
            index={index + 1}
            onSelect={() => onToggleSelect(staff)}
            isSelected={!!selectedStaffIds[staff.id]}
            onEditStaff={onEditStaff}
          />
        ))}
      </tbody>
    </table>
  );
};

export default StaffTable;
