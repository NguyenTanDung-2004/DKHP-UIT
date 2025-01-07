// RegistrationPeriodDisplay.js
import React from "react";
import moment from "moment";

const RegistrationPeriodDisplay = ({
  registrationPeriod,
  handleEditRegistrationPeriod,
}) => {
  const getBatchDateRange = (batch, startDate, endDate, allowedBatches) => {
    if (!startDate || !endDate || !allowedBatches || !allowedBatches[batch])
      return { startDate: null, endDate: null };

    const days = allowedBatches[batch];
    const batchEndDate = moment(endDate);
    const batchStartDate = moment(endDate).subtract(days - 1, "days");
    return {
      startDate: batchStartDate.format("DD/MM/YYYY"),
      endDate: batchEndDate.format("DD/MM/YYYY"),
    };
  };

  return (
    <div className="bg-white shadow-md rounded p-6 mb-6">
      <div className="flex flex-col">
        <div className="flex flex-col w-fix m-auto">
          <p className="mb-2">
            <span className="font-semibold">Ngày bắt đầu:</span>{" "}
            {moment(registrationPeriod.startDate).format("DD/MM/YYYY")},{" "}
            <span className="font-semibold">Ngày kết thúc:</span>{" "}
            {moment(registrationPeriod.endDate).format("DD/MM/YYYY")}
          </p>
          <p className="mb-2">
            <span className="font-semibold">Thời gian bắt đầu:</span>{" "}
            {moment(registrationPeriod.startTime, "HH:mm").format("HH:mm")},
            <span className="font-semibold">Thời gian kết thúc:</span>{" "}
            {moment(registrationPeriod.endTime, "HH:mm").format("HH:mm")}
          </p>
          <div className="mb-4">
            {Object.entries(registrationPeriod.allowedBatches).map(
              ([batch, days]) => {
                const { startDate, endDate } = getBatchDateRange(
                  batch,
                  registrationPeriod.startDate,
                  registrationPeriod.endDate,
                  registrationPeriod.allowedBatches
                );
                return (
                  <p key={batch}>
                    <span className="font-semibold">
                      Từ khóa {batch} về trước
                    </span>{" "}
                    được đăng ký từ ngày {startDate} đến ngày {endDate}
                  </p>
                );
              }
            )}
          </div>
        </div>
        <button
          onClick={handleEditRegistrationPeriod}
          className="justify-center self-center w-[400px] text-white py-2 px-4 rounded shadow-xl bg-[#2F6BFF] hover:bg-opacity-90"
        >
          ĐIỀU CHỈNH THỜI GIAN ĐĂNG KÝ HỌC PHẦN
        </button>
      </div>
    </div>
  );
};

export default RegistrationPeriodDisplay;
