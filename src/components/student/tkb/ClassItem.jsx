import React from "react";

const ClassItem = ({ classItem }) => {
  return (
    <div className="bg-white p-2 rounded mb-1 text-xs max-w-[200px]">
      <div className="font-semibold">
        {classItem.className} - {classItem.giangVien.name}
      </div>
      <div className="whitespace-pre-line">
        Sĩ số: {classItem.siso}
        {/* Other details you may want to add */}
        {classItem.room && classItem.room.roomName && (
          <div>{`P ${classItem.room.roomName}`}</div>
        )}
        {classItem.startDate && classItem.endDate && (
          <div>
            BĐ:{classItem.startDate.substring(0, 10)}
            <div>KT: {classItem.endDate.substring(0, 10)}</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ClassItem;
