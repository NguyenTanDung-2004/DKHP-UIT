import React from "react";
import StudentItem from "./StudentItem";

const StudentTable = ({ students, selectedStudents, onSelectStudent }) => {
  return (
    <table className="w-full table-auto mt-4">
      <thead className="bg-[#0000000f] text-[#2F6BFF]">
        <tr>
          <th className="border border-[#B9B9B9] px-4 py-4"></th>
          <th className="border border-[#B9B9B9] px-4 py-4">MSSV</th>
          <th className="border border-[#B9B9B9] px-4 py-4">Tên sinh viên</th>
          <th className="border border-[#B9B9B9] px-4 py-4">Tên khoa</th>
          <th className="border border-[#B9B9B9] px-4 py-4">Tên ngành</th>
          <th className="border border-[#B9B9B9] px-4 py-4">Giới tính</th>
          <th className="border border-[#B9B9B9] px-4 py-4">Tài khoản</th>
        </tr>
      </thead>
      <tbody>
        {students.map((student) => (
          <StudentItem
            key={student.mssv}
            student={student}
            isSelected={!!selectedStudents[student.mssv]}
            onSelect={() => onSelectStudent(student.mssv)}
          />
        ))}
      </tbody>
    </table>
  );
};

export default StudentTable;
