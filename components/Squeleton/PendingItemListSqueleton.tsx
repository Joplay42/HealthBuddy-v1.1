import React from "react";

const PendingItemListSqueleton = () => {
  return (
    // Grid container
    <div className="flex flex-wrap items-center justify-between space-y-4 py-5 bg-neutral-100 px-5 my-4 rounded-xl">
      {/** Food name */}
      <div className="text-lg w-40 space-y-4">
        <div className="h-6 w-20 bg-gray-200 animate-pulse rounded"></div>
        <div className="h-6 w-10 bg-gray-200 animate-pulse rounded"></div>
      </div>
      {/** Food calorie chart */}
      <div className="flex items-center space-x-4 justify-self-end sm:justify-self-auto">
        <div className="w-16 h-16 border-[12px] border-gray-200 rounded-full animate-pulse"></div>
        <div className="h-6 w-20 bg-gray-200 animate-pulse rounded"></div>
      </div>
      {/** Food nutrient informations */}
      <div className="flex items-center gap-x-4 md:col-span-2 sm:justify-self-center">
        <div className="text-center space-y-2">
          <div className="h-6 w-16 bg-gray-200 animate-pulse rounded"></div>
          <div className="h-6 w-10 bg-gray-200 animate-pulse rounded"></div>
        </div>
        <div className="text-center space-y-2">
          <div className="h-6 w-16 bg-gray-200 animate-pulse rounded"></div>
          <div className="h-6 w-10 bg-gray-200 animate-pulse rounded"></div>
        </div>
        <div className="text-center space-y-2">
          <div className="h-6 w-16 bg-gray-200 animate-pulse rounded"></div>
          <div className="h-6 w-10 bg-gray-200 animate-pulse rounded"></div>
        </div>
      </div>{" "}
    </div>
  );
};

export default PendingItemListSqueleton;
