import React from "react";
import ClassItem from "./ClassItem";

const ClassTable = ({ classes, selectedClasses, onToggleSelect }) => {
  return (
    <table className="min-w-full bg-white border border-gray-300 rounded">
      <thead className="bg-[#0000000f] text-[#2F6BFF]">
        <tr>
          <th className="py-2 px-4 border border-[#B9B9B9]"></th>
          <th className="py-2 px-4 border border-[#B9B9B9] text-center">
            Mã lớp
          </th>
          <th className="py-2 px-4 border border-[#B9B9B9]">Tên môn học</th>
          <th className="py-2 px-4 border border-[#B9B9B9] text-center">
            Hình thức
          </th>
          <th className="border border-[#B9B9B9] px-4 py-4">Số TC</th>
          <th className="py-2 px-4 border border-[#B9B9B9]">Thời gian học</th>
          <th className="py-2 px-4 border border-[#B9B9B9]">Giảng viên</th>
          <th className="py-2 px-4 border border-[#B9B9B9] text-center">
            Sỉ số/Đã ĐK
          </th>
          <th className="py-2 px-4 border border-[#B9B9B9]"></th>
        </tr>
      </thead>
      <tbody>
        {classes.map((classData) => (
          <ClassItem
            key={classData.id}
            classData={classData}
            isSelected={!!selectedClasses[classData.id]}
            onSelect={() => onToggleSelect(classData)}
          />
        ))}
      </tbody>
    </table>
  );
};

export default ClassTable;
