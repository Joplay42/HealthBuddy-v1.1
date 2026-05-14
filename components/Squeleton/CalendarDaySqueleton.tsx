import React from "react";

const CalendarDaySqueleton = () => {
  return (
    <div className="w-full hover:cursor-pointer border dark:border-white/10">
      <div className="bg-neutral-100 dark:bg-ink-800 p-2 border-b dark:border-white/10 animate-pulse">
        <div className="h-4 w-6 mx-auto bg-gray-200 dark:bg-ink-800 animate-pulse rounded"></div>
      </div>
      <div className="pb-4 md:pb-6 pt-8 md:pt-12 space-y-2">
        <div className="h-6 w-8 mx-auto bg-gray-200 dark:bg-ink-800 animate-pulse rounded"></div>
        <div className="h-4 w-8 mx-auto bg-gray-200 dark:bg-ink-800 animate-pulse rounded"></div>
      </div>
    </div>
  );
};

export default CalendarDaySqueleton;
