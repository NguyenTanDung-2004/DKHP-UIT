import React from "react";
import ClassItem from "./ClassItem";

const ScheduleRow = ({ time, scheduleData, slotIndex }) => {
  const days = [2, 3, 4, 5, 6, 7, 8];

  return (
    <tr>
      <td className="border border-gray-500 px-4 py-2 whitespace-pre-line max-w-[200px] w-[150px]">
        {time}
      </td>
      {days.map((day) => {
        const classInDayAndSlot = scheduleData.filter(
          (item) =>
            item.thu === day &&
            item.tietBatDau <= slotIndex &&
            item.tietKetThuc >= slotIndex
        );
        return (
          <td
            key={day}
            className="border border-gray-500 px-4 py-2 bg-[#cccccc] w-[150px]"
          >
            {classInDayAndSlot.map((classItem) => (
              <ClassItem key={classItem.id} classItem={classItem} />
            ))}
          </td>
        );
      })}
    </tr>
  );
};
export default ScheduleRow;
