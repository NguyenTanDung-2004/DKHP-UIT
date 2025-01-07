import React from "react";

const UnregisterResultModal = ({ isOpen, onClose, result, allClasses }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-500 bg-opacity-75">
      <div className="bg-white p-6 rounded shadow-lg w-96">
        <div className="flex justify-between items-center mb-4">
          <h2 className="font-semibold text-xl">KẾT QUẢ HỦY ĐĂNG KÝ</h2>
          <button
            onClick={onClose}
            className="text-gray-600 hover:text-gray-800 focus:outline-none"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        {result && (
          <>
            {/* Success classes */}
            {result.listTrue && result.listTrue.length > 0 && (
              <>
                <div className="flex items-center mb-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-5 h-5 text-blue-600"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <span className="font-medium text-sm ml-1">
                    Hủy thành công:
                  </span>
                </div>
                {result.listTrue.map((classId) => (
                  <p key={classId} className="text-sm ml-6">
                    {allClasses.find((item) => item.id === classId)?.className}
                  </p>
                ))}
              </>
            )}
            {/* Failed classes */}
            {result.listWrong && result.listWrong.length > 0 && (
              <>
                <div className="flex items-center mt-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-5 h-5 text-red-600"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.944 3.374h14.71c1.727 0 2.813-1.874 1.944-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
                    />
                  </svg>
                  <span className="font-medium text-sm ml-1">
                    Hủy thất bại:
                  </span>
                </div>
                {result.listWrong.map((classId) => (
                  <p key={classId} className="text-sm ml-6">
                    {allClasses.find((item) => item.id === classId)?.className}
                  </p>
                ))}
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default UnregisterResultModal;
