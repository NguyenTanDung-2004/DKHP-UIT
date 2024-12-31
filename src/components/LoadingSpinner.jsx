import React from 'react';
import './LoadingSpinner.css'; // Import CSS spinner (sẽ tạo sau)

const LoadingSpinner = () => {
  return (
    <div className="loading-spinner">
      <div className="spinner"></div>
      <p>Đang tải...</p>
    </div>
  );
};

export default LoadingSpinner;
