import React from "react";

const WeightsGridSqueleton = () => {
  return (
    <div className="max-h-96 overflow-y-auto">
      <div className="grid grid-cols-2 mb-4">
        <div className="h-6 w-10 bg-gray-200 animate-pulse rounded pb-3"></div>
        <div className="h-6 w-10 bg-gray-200 animate-pulse rounded pb-3"></div>
      </div>

      {Array(7)
        .fill(0)
        .map((_, index) => (
          <div
            key={index}
            className="border-y border-neutral-300 animate-fade-in grid grid-cols-2 py-2"
          >
            <div className="h-6 w-10 bg-gray-200 animate-pulse rounded py-2"></div>
            <div className="h-6 w-10 bg-gray-200 animate-pulse rounded py-2"></div>
          </div>
        ))}
    </div>
  );
};

export default WeightsGridSqueleton;
