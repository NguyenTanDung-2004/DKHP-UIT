import React from "react";

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
    credits,
    flagTH,
  } = classData;
  const hinhThuc = flagTH === 0 ? "LT" : flagTH === 1 ? "HT1" : "HT2";

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
