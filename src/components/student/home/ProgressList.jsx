import React from "react";
import ProgressItem from "./ProgressItem";

const ProgressList = ({
  selectedClasses,
  onRemove,
  onRegister,
  totalCredits,
}) => {
  const numberOfClasses = Object.keys(selectedClasses).length;
  return (
    <div className="mt-[72px] bg-white border border-gray-300 rounded shadow-md p-4 w-60 fixed top-0 right-0 h-screen flex flex-col">
      <h2 className="text-xl font-bold mb-3 text-[#2F6BFF]">Đã chọn</h2>
      <p className="mb-2">{`${numberOfClasses} lớp, ${totalCredits} tín chỉ`}</p>
      <div className="overflow-y-auto max-h-96 flex-1">
        {Object.values(selectedClasses).map((classData) => (
          <ProgressItem
            key={classData.id}
            classData={classData}
            onRemove={() => onRemove(classData.id)}
          />
        ))}
      </div>
      <button
        onClick={onRegister}
        className="bg-[#2F6BFF] text-white py-2 px-4 rounded mt-24 shadow-xl font-bold"
      >
        Đăng ký
      </button>
    </div>
  );
};

export default ProgressList;
