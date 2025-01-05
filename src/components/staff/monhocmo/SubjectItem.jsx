import React from "react";

const SubjectItem = ({ subject, onSelect, isSelected, onOpenClass }) => {
  const { maMonHoc, tenMonHoc, loaiMonHoc, maKhoa } = subject;

  return (
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
        <button
          onClick={() => onOpenClass(subject)}
          className="text-[#2F6BFF] hover:text-opacity-50 text-xl rounded-full flex items-center justify-center w-full h-full"
        >
          <i className="fas fa-plus"></i>
        </button>
      </td>
    </tr>
  );
};

export default SubjectItem;
