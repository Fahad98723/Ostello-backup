import React from "react";

const CareerCard = ({ data }) => {
  const { title, desc } = data;
  return (
    <div className="bg-white rounded-xl shadow-md px-4 py-6">
      <div className="flex flex-col">
        <div className="text-[#1C1C1C] text-3xl font-medium">{title}</div>
        <hr className="my-3" />
        <div className="text-[#616161]">{desc}</div>
      </div>
    </div>
  );
};

export default CareerCard;
