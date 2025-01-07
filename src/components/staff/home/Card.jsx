import React from "react";

const Card = ({ title, value, icon }) => {
  const getRandomColor = () => {
    const colors = [
      "#f44336", // Đỏ
      "#e91e63", // Hồng đậm
      "#9c27b0", // Tím
      "#673ab7", // Tím đậm
      "#3f51b5", // Xanh dương đậm
      "#2196f3", // Xanh dương
      "#03a9f4", // Xanh da trời
      "#00bcd4", // Xanh mòng két
      "#009688", // Xanh lục đậm
      "#4caf50", // Xanh lá
      "#8bc34a", // Xanh lá nhạt
      "#cddc39", // Vàng chanh
      "#ffeb3b", // Vàng
      "#ffc107", // Vàng cam
      "#ff9800", // Cam đậm
      "#ff5722", // Cam
      "#795548", // Nâu
      "#607d8b", // Xám xanh
    ];
    return colors[Math.floor(Math.random() * colors.length)];
  };
  const randomColor = getRandomColor();

  return (
    <div
      className="p-4 rounded shadow-md flex flex-col items-center w-full sm:w-[250px] md:w-[250px] lg:w-[250px] xl:w-[250px] text-white"
      style={{ backgroundColor: randomColor }}
    >
      {icon && <div className="text-4xl mb-2">{icon}</div>}
      <h3 className="text-lg font-semibold mb-1 text-center">{title}</h3>
      <p className="text-2xl font-bold">{value}</p>
    </div>
  );
};

export default Card;
