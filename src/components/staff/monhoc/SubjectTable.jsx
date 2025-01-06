import React from "react";
import SubjectItem from "./SubjectItem";
const SubjectTable = ({
  subjects,
  selectedSubjects,
  onToggleSelect,
  openSubjectIds,
  maMonHocList,
  onEditSubject,
}) => {
  return (
    <table className="w-full table-auto border-collapse">
      <thead className="bg-[#0000000f] text-[#2F6BFF]">
        <tr>
          <th className="py-2 px-4 border border-[#B9B9B9]"></th>
          <th className="py-2 px-4 border border-[#B9B9B9]">Mã môn học</th>
          <th className="py-2 px-4 border border-[#B9B9B9]">Tên môn học</th>
          <th className="py-2 px-4 border border-[#B9B9B9]">Loại môn học</th>
          <th className="py-2 px-4 border border-[#B9B9B9]">Mã khoa</th>
          <th className="py-2 px-4 border border-[#B9B9B9]">Môn học trước</th>
          <th className="py-2 px-4 border border-[#B9B9B9]">Tín chỉ LT</th>
          <th className="py-2 px-4 border border-[#B9B9B9]">Tín chỉ TH</th>
          <th className="py-2 px-4 border border-[#B9B9B9]"></th>
        </tr>
      </thead>
      <tbody>
        {subjects.map((subject) => {
          return (
            <SubjectItem
              key={subject.id}
              subject={subject}
              onSelect={() => onToggleSelect(subject)}
              isSelected={!!selectedSubjects[subject.id]}
              disabled={openSubjectIds.includes(subject.id)}
              maMonHocList={maMonHocList}
              onEditSubject={onEditSubject}
            />
          );
        })}
      </tbody>
    </table>
  );
};

export default SubjectTable;
