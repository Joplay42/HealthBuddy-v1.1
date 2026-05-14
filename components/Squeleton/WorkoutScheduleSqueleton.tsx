import React from "react";

const WorkoutScheduleSqueleton = () => {
  return (
    <div className="bg-white dark:bg-ink-900 p-5 rounded-3xl border border-neutral-400 dark:border-white/10 h-full">
      {/** The title */}
      <div className="h-6 w-32 bg-gray-200 dark:bg-ink-800 animate-pulse rounded mb-10"></div>
      <div className="space-y-3">
        <div className="h-6 w-20 bg-gray-200 dark:bg-ink-800 animate-pulse rounded"></div>
        <div className="h-20 w-full bg-gray-200 dark:bg-ink-800 animate-pulse rounded"></div>
        <div className="h-6 w-10 bg-gray-200 dark:bg-ink-800 animate-pulse rounded"></div>
      </div>
    </div>
  );
};

export default WorkoutScheduleSqueleton;
