import React from "react";
import SubjectItem from "./SubjectItem";

const SubjectTable = ({
  subjects,
  selectedSubjects,
  onToggleSelect,
  onOpenClass,
}) => {
  return (
    <table className="min-w-full bg-white border border-gray-300 rounded">
      <thead className="bg-[#0000000f] text-[#2F6BFF]">
        <tr>
          <th className="py-2 px-4 border border-[#B9B9B9]"></th>
          <th className="py-2 px-4 border border-[#B9B9B9] text-center">
            Mã môn học
          </th>
          <th className="py-2 px-4 border border-[#B9B9B9]">Tên môn học</th>
          <th className="py-2 px-4 border border-[#B9B9B9] text-center">
            Loại môn học
          </th>
          <th className="py-2 px-4 border border-[#B9B9B9] text-center">
            Mã Khoa
          </th>
          <th className="py-2 px-4 border border-[#B9B9B9] text-center">
            Tín chỉ LT
          </th>
          <th className="py-2 px-4 border border-[#B9B9B9] text-center">
            Tín chỉ TH
          </th>
          <th className="py-2 px-4 border border-[#B9B9B9] text-center">
            Số lớp đang mở
          </th>
          <th className="py-2 px-4 border border-[#B9B9B9]"></th>
        </tr>
      </thead>
      <tbody>
        {subjects.map((subject) => (
          <SubjectItem
            key={subject.id}
            subject={subject}
            isSelected={!!selectedSubjects[subject.id]}
            onSelect={() => onToggleSelect(subject)}
            onOpenClass={onOpenClass}
          />
        ))}
      </tbody>
    </table>
  );
};

export default SubjectTable;
