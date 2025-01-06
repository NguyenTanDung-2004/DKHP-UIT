import React from "react";

const StudentItem = ({ student, isSelected, onSelect }) => {
  return (
    <tr className={isSelected ? "bg-white" : "bg-gray-50"}>
      {student.actived ? (
        <td className="py-4 px-4 border border-[#B9B9B9] text-center"></td>
      ) : (
        <td className="border border-[#B9B9B9] px-4 py-4 text-center">
          <input
            type="checkbox"
            checked={isSelected}
            onChange={onSelect}
            className="cursor-pointer"
          />
        </td>
      )}

      <td className="border border-[#B9B9B9] px-4 py-4 text-center">
        {student.mssv}
      </td>
      <td className="border border-[#B9B9B9] px-4 py-4 ">{student.tenDayDu}</td>
      <td className="border border-[#B9B9B9] px-4 py-4 text-center">
        {student.tenKhoa}
      </td>
      <td className="border border-[#B9B9B9] px-4 py-4 text-center">
        {student.tenNganh}
      </td>
      <td className="border border-[#B9B9B9] px-4 py-4 text-center">
        {student.gioiTinh}
      </td>
      <td className="border border-[#B9B9B9] px-4 py-4 text-center">
        {student.actived ? "Đã có" : "Chưa có"}
      </td>
    </tr>
  );
};

export default StudentItem;
