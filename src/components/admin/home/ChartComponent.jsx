import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const ChartComponent = ({ data, title }) => {
  if (!data) {
    return <div>Đang tải dữ liệu biểu đồ...</div>;
  }
  const chartData = {
    labels: Object.keys(data),
    datasets: [
      {
        data: Object.values(data),
        backgroundColor: [
          "rgba(255, 99, 132, 0.8)",
          "rgba(54, 162, 235, 0.8)",
          "rgba(255, 206, 86, 0.8)",
          "rgba(75, 192, 192, 0.8)",
          "rgba(153, 102, 255, 0.8)",
          "rgba(255, 159, 64, 0.8)",
          "rgba(200, 100, 100, 0.8)",
          "rgba(200, 180, 50, 0.8)",
          "rgba(100, 100, 200, 0.8)",
        ],
        borderWidth: 0,
      },
    ],
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md w-[400px] ">
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <Pie data={chartData} />
    </div>
  );
};

export default ChartComponent;
