import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const RegistrationPeriodForm = ({
  startDate,
  endDate,
  startTime,
  endTime,
  allowedBatches,
  totalDays,
  handleStartDateChange,
  handleEndDateChange,
  setStartTime,
  setEndTime,
  handleBatchChange,
  handleSubmit,
  handleCancelEdit,
  isCreateForm, // add new prop isCreateForm
}) => {
  // initialize with allowedBatches or create defaults
  const [localAllowedBatches, setLocalAllowedBatches] = useState(() => {
    if (isCreateForm || !allowedBatches) {
      return { 22: 1, 23: 1, 24: 1 };
    } else {
      return allowedBatches;
    }
  });

  // Sync changes with parent if `allowedBatches` changes from parent
  useEffect(() => {
    if (!isCreateForm && allowedBatches) {
      setLocalAllowedBatches(allowedBatches);
    }
  }, [allowedBatches, isCreateForm]);

  const handleLocalBatchChange = (batch, days) => {
    const day = parseInt(days, 10) || 1;
    setLocalAllowedBatches((prev) => ({
      ...prev,
      [batch]: day,
    }));
    handleBatchChange(batch, day);
  };

  return (
    <div className="bg-white shadow-md rounded p-6 mb-6">
      <div className="flex  mb-4 gap-4">
        <div className="flex flex-col w-1/2">
          <label className="mb-2 text-gray-700">Ngày bắt đầu:</label>
          <DatePicker
            selected={startDate}
            onChange={handleStartDateChange}
            dateFormat="dd/MM/yyyy"
            minDate={new Date()}
            className="border p-2 rounded w-full"
            placeholderText="Chọn ngày bắt đầu"
          />
        </div>
        <div className="flex flex-col w-1/2">
          <label className="mb-2 text-gray-700">Ngày kết thúc:</label>
          <DatePicker
            selected={endDate}
            onChange={handleEndDateChange}
            dateFormat="dd/MM/yyyy"
            minDate={startDate || new Date()}
            className="border p-2 rounded w-full"
            placeholderText="Chọn ngày kết thúc"
          />
        </div>
      </div>
      <div className="flex  mb-4 gap-4">
        <div className="flex flex-col w-1/2">
          <label className="mb-2 text-gray-700">Thời gian bắt đầu:</label>
          <input
            type="time"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
            className="border p-2 rounded w-full"
          />
        </div>
        <div className="flex flex-col w-1/2">
          <label className="mb-2 text-gray-700">Thời gian kết thúc:</label>
          <input
            type="time"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
            className="border p-2 rounded w-full"
          />
        </div>
      </div>

      <p className="mb-4">Tổng ngày được phép đăng ký: {totalDays} ngày</p>

      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Thời gian đăng ký theo khóa:
        </label>
        {Array.from({ length: 3 }, (_, index) => {
          const batch = 22 + index;
          return (
            <div key={batch} className="flex items-center justify-center mb-2">
              <span className="mr-2">{`Khóa ${batch} về trước:`}</span>
              <input
                type="number"
                min="1"
                max={totalDays}
                value={localAllowedBatches[batch] || 1}
                onChange={(e) => handleLocalBatchChange(batch, e.target.value)}
                className="border p-2 rounded w-16"
              />
              <span className="ml-2">ngày</span>
            </div>
          );
        })}
      </div>

      <div className="flex justify-center gap-4">
        <button
          onClick={handleSubmit}
          className="text-white py-2 px-4 rounded shadow-xl bg-[#2F6BFF] hover:bg-opacity-90"
        >
          LƯU
        </button>
        <button
          onClick={handleCancelEdit}
          className="text-gray-700 py-2 px-4 rounded shadow-xl bg-gray-200 hover:bg-gray-300"
        >
          HỦY
        </button>
      </div>
    </div>
  );
};

export default RegistrationPeriodForm;
