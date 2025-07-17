import React from "react";
import CalendarDaySqueleton from "./CalendarDaySqueleton";

const Calendarsqueleton = () => {
  return (
    <div className="bg-white p-5 rounded-3xl border border-neutral-400 h-full">
      <div className="flex items-center justify-between mb-5">
        {/** title */}
        <div className="h-6 w-28 bg-gray-200 animate-pulse rounded"></div>
        {/** Button to add  a new food item */}
        <div className="h-6 w-36 bg-gray-200 animate-pulse rounded mx-3 my-2"></div>
      </div>
      <div className="flex justify-between items-center">
        <div className="h-6 w-20 bg-gray-200 animate-pulse rounded mb-3"></div>
        <div className="flex items-center space-x-2">
          <div className="h-6 w-6 bg-gray-200 animate-pulse rounded"></div>{" "}
          <div className="h-6 w-6 bg-gray-200 animate-pulse rounded"></div>
        </div>
      </div>
      <div className="flex items-center justify-between border ">
        {Array(10)
          .fill(0)
          .map((_, index) => (
            <CalendarDaySqueleton key={index} />
          ))}
      </div>
    </div>
  );
};

export default Calendarsqueleton;
