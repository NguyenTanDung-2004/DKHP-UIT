import React from "react";

const ClassItem = ({ classData, onSelect, isSelected, disabled }) => {
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
    credits,
    flagTH,
  } = classData;
  const hinhThuc = flagTH === 0 ? "LT" : flagTH === 1 ? "HT1" : "HT2";
  return (
    <tr
      className={`
      ${disabled ? "opacity-50 cursor-not-allowed" : ""}
      ${isSelected ? "bg-white" : "bg-gray-50"}
    `}
    >
      <td className="border border-[#B9B9B9] px-4 py-4">
        <input
          type="checkbox"
          checked={isSelected}
          onChange={onSelect}
          className="cursor-pointer"
          disabled={disabled}
          title={
            disabled ? "Lớp này đã được đăng ký hoặc trùng lịch" : undefined
          }
        />
      </td>
      <td className="border border-[#B9B9B9] px-4 py-4">{className}</td>
      <td className="border border-[#B9B9B9] px-4 py-4">{subject}</td>
      <td className="py-4 px-4 border border-[#B9B9B9] text-center">
        {hinhThuc}
      </td>
      <td className="border border-[#B9B9B9] px-4 py-4">{credits}</td>
      <td className="border border-[#B9B9B9] px-4 py-4">{`${thu}, Tiết ${tietBatDau}-${tietKetThuc}; ${startDate}-${endDate}`}</td>
      <td className="border border-[#B9B9B9] px-4 py-4">{giangVien}</td>
      <td className="border border-[#B9B9B9] px-4 py-4">{`${currentSiSo}/${siso}`}</td>
    </tr>
  );
};

export default ClassItem;
