import React from "react";

const SubjectItem = ({ subject, onSelect, isSelected, disabled }) => {
  const {
    maMonHoc,
    tenMonHoc,
    loaiMonHoc,
    maKhoa,
    dsMaMonHocTruoc,
    soTinChiLT,
    soTinChiTH,
  } = subject;
  return (
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
        <i className="fa-solid fa-pen-to-square text-blue-500 cursor-pointer"></i>
      </td>
    </tr>
  );
};

export default SubjectItem;
