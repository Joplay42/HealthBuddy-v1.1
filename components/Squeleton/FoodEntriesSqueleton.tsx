import React from "react";
import FoodEntriesListSqueleton from "./FoodEntriesListSqueleton";

const FoodEntriesSqueleton = () => {
  return (
    // Food entries container
    <div
      className="bg-white p-5 rounded-3xl border border-neutral-400"
      data-aos="fade-up"
      data-aos-duration="300"
    >
      <div className="flex items-center justify-between mb-10">
        {/** title */}
        <div className="h-6 w-20 bg-gray-200 animate-pulse rounded"></div>
        {/** Button to add  a new food item */}
        <div className="h-6 w-14 bg-gray-200 animate-pulse rounded"></div>
      </div>
      <FoodEntriesListSqueleton />
    </div>
  );
};

export default FoodEntriesSqueleton;
