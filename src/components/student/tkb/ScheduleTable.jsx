import React from "react";
import ScheduleRow from "./ScheduleRow";

const ScheduleTable = ({ scheduleData }) => {
  const days = [
    "Thứ 2",
    "Thứ 3",
    "Thứ 4",
    "Thứ 5",
    "Thứ 6",
    "Thứ 7",
    "Chủ nhật",
  ];
  const timeSlots = [
    "Tiết 1\n(7:30 - 8:15)",
    "Tiết 2\n(8:15 - 9:00)",
    "Tiết 3\n(9:00 - 9:45)",
    "Tiết 4\n(10:00 - 10:45)",
    "Tiết 5\n(10:45 - 11:30)",
    "Tiết 6\n(13:00 - 13:45)",
    "Tiết 7\n(13:45 - 14:30)",
    "Tiết 8\n(14:30-15:15)",
    "Tiết 9\n(15:30-16:15)",
    "Tiết 10\n(16:15-17:00)",
  ];
  return (
    <table className="w-full border-collapse">
      <thead>
        <tr>
          <th className="border border-gray-500 px-4 py-2 w-[150px] bg-[#F2F4F7]">
            Thứ / Tiết
          </th>
          {days.map((day) => (
            <th
              key={day}
              className="border border-gray-500 px-4 py-2 w-[150px] bg-[#F2F4F7]"
            >
              {day}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {timeSlots.map((time, index) => (
          <ScheduleRow
            key={time}
            time={time}
            scheduleData={scheduleData}
            slotIndex={index + 1}
          />
        ))}
      </tbody>
    </table>
  );
};
export default ScheduleTable;
