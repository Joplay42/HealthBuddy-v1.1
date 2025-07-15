"use client";

import { CalendarProps } from "@/types";

const Calendar = ({
  today,
  workoutPlan,
  selectedDays,
  setSelectedDays,
}: CalendarProps) => {
  return (
    <div className="bg-white p-5 rounded-3xl border border-neutral-400">
      <div className="flex items-center justify-between mb-10">
        {/** title */}
        <h1 className="font-bold text-xl">Planning</h1>
        {/** Button to add  a new food item */}
        <button
          className="w-fit bg-black text-white px-3 py-2 rounded-2xl text-center hover:opacity-75 hover:cursor-pointer"
          onClick={() => {}}
        >
          Change workout plan
        </button>
      </div>
      <p>Today: {today.date}</p>
      <p>Workouts: </p>
      {workoutPlan.map((entry, index) => (
        <p key={index}>
          - {entry.day} ({entry.name})
        </p>
      ))}
      <p>Selected day: {selectedDays.date}</p>
    </div>
  );
};

export default Calendar;
