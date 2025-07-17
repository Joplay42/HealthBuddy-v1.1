import React from "react";

const DisplayWeightSqueleton = () => {
  const yTicks = [...Array(4)];
  const xTicks = [...Array(6)];

  return (
    <div className="h-64 w-full p-4 animate-pulse">
      <div className="relative h-full w-full">
        {/* Y-axis grid lines + tick labels */}
        {yTicks.map((_, rowIndex) => (
          <div
            key={`row-${rowIndex}`}
            className="absolute left-0 right-0 flex items-center justify-between"
            style={{ top: `${(rowIndex + 1) * 20}%` }}
          >
            {/* Y-axis tick placeholder */}
            <div className="w-8 h-6 bg-gray-300 rounded-md mr-2" />
            {/* Grid line */}
            <div className="flex-1 h-px bg-gray-200" />
          </div>
        ))}

        {/* X-axis grid lines + tick labels */}
        {xTicks.map((_, colIndex) => (
          <div
            key={`col-${colIndex}`}
            className="absolute top-0 bottom-0 flex flex-col items-center"
            style={{ left: `${(colIndex + 1) * 14.28}%` }}
          >
            {/* Grid line */}
            <div className="w-px flex-1 bg-gray-200" />
            {/* X-axis tick placeholder */}
            <div className="w-8 h-6 bg-gray-300 rounded-md mt-2" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default DisplayWeightSqueleton;
