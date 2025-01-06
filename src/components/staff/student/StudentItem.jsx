import React from "react";

const StudentItem = ({ student, isSelected, onSelect, onEditStudent }) => {
  const handleEditClick = () => {
    onEditStudent(student);
  };
  return (
    <tr className={isSelected ? "bg-white" : "bg-gray-50"}>
      <td className="border border-[#B9B9B9] px-4 py-4 text-center">
        <input
          type="checkbox"
          checked={isSelected}
          onChange={onSelect}
          className="cursor-pointer"
        />
      </td>
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
      <td className="py-4 px-4 border border-[#B9B9B9] text-center">
        <i
          className="fa-solid fa-pen-to-square text-blue-500 cursor-pointer"
          onClick={handleEditClick}
        ></i>
      </td>
    </tr>
  );
};

export default StudentItem;
