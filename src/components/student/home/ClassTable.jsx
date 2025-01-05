import React from "react";
import ClassItem from "./ClassItem";

const ClassTable = ({ classes, selectedClasses, onToggleSelect }) => {
  return (
    <table className="w-full table-auto">
      <thead>
        <tr className="bg-[#0000000f] text-[#2F6BFF]">
          <th className="border border-[#B9B9B9] px-4 py-4"></th>
          <th className="border border-[#B9B9B9] px-4 py-4">Mã lớp</th>
          <th className="border border-[#B9B9B9] px-4 py-4">Tên môn học</th>
          <th className="border border-[#B9B9B9] px-4 py-4">Số TC</th>
          <th className="border border-[#B9B9B9] px-4 py-4">Thời gian học</th>
          <th className="border border-[#B9B9B9] px-4 py-4">Giảng viên</th>
          <th className="border border-[#B9B9B9] px-4 py-4">Sỉ số/Đã ĐK</th>
        </tr>
      </thead>
      <tbody>
        {classes.map((classData) => (
          <ClassItem
            key={classData.id}
            classData={classData}
            isSelected={!!selectedClasses[classData.id]}
            onSelect={() => onToggleSelect(classData)}
            disabled={classData.disabled}
          />
        ))}
      </tbody>
    </table>
  );
};

export default ClassTable;
