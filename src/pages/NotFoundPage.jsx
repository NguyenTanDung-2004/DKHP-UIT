// src/pages/NotFoundPage.js
import React from "react";
import { useNavigate } from "react-router-dom";
import NotFoundImage from "../images/not-found.png";

const NotFoundPage = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1); // Sử dụng navigate(-1) để quay lại trang trước đó
  };

  return (
    <div className="flex flex-col justify-center items-center w-screen h-screen bg-gray-100">
      <img
        src={NotFoundImage}
        alt="Not Found"
        className="w-[300px] h-[300px] -mt-[40px]"
      />
      <h1 className="text-4xl font-bold text-gray-800 mb-3 -mt-[20px]">
        Oops!
      </h1>
      <p className="text-gray-600 text-base mb-2">
        Không tìm thấy trang bạn đang tìm kiếm.
      </p>
      <p className="text-gray-600 text-base mb-4">
        Vui lòng kiểm tra lại đường dẫn hoặc quay lại{" "}
        <button
          onClick={handleGoBack}
          className="text-blue-500 hover:underline"
        >
          trang trước
        </button>
        .
      </p>
    </div>
  );
};

export default NotFoundPage;
