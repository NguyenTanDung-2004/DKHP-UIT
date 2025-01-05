import React from "react";

const ProgressItem = ({ classData, onRemove }) => {
  return (
    <div className="flex items-center justify-between bg-white border border-[#2F6BFF] text-[#2F6BFF] px-3 py-2 rounded-md mb-2">
      <span className="text-sm">{`${classData.className} (${classData.credits})`}</span>
      <button
        onClick={onRemove}
        className="text-gray-500 hover:text-gray-700 focus:outline-none"
      >
        <i className="fa-solid fa-xmark text-[#2F6BFF]"></i>
      </button>
    </div>
  );
};

export default ProgressItem;
