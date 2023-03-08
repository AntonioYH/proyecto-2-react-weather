import React from 'react';

const Info = ({ country, city, icon, temperature, main, description }) => {
  return (
    <div className="Info-container hover:scale-125 transition bg-[#D5F3FF] dark:bg-indigo-700 pb-4 px-[14px] shadow-gray-700 shadow-md w-[297px] rounded-[22px] h-[231px] relative">
      <div className="h-full  flex flex-col justify-between">
        <p className="text-[79px] font-light text-[#026EED] dark:text-[#FFFFFF]">
          {temperature}°
        </p>
        <div className="flex flex-col gap-1 font-semibold text-sm text-[#56A5F1] dark:text-[#9D7BFF]">
          <p>{main}</p>
          <p>{description}</p>
        </div>
        <p className="text-xl font-medium text-[#026EED] dark:text-[#FFFFFF]">
          {city},<span className="ml-2">{country}</span>
        </p>
      </div>
      <img
        className="absolute left-28 bottom-28 drop-shadow-xl hover:scale-75 transition animate-pulse"
        src={icon}
        alt=""
      />
    </div>
  );
};

export default Info;
