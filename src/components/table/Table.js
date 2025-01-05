import React from "react";

const Table = ({ columns, renderRow, data }) => {
  return (
    <div className=" mt-4  overflow-hidden  border border-[#E5E7EB]">
      <table className="w-full border-collapse">
        <thead>
          <tr className="text-left text-[#202224] text-sm bg-[#0000000f]">
            {columns.map((col) => (
              <th key={col.accessor} className={`p-3 ${col.className}`}>
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>{data.map((item, index) => renderRow(item, index))}</tbody>
      </table>
    </div>
  );
};

export default Table;
