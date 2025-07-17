"use client";
import WorkoutScheduleSqueleton from "@/components/Squeleton/WorkoutScheduleSqueleton";
import { workoutScheduleProps } from "@/types";
import { useState } from "react";

const WorkoutSchedule = ({
  todaysWorkout,
  selectedDay,
}: workoutScheduleProps) => {
  // States for loading
  const [loading, setLoading] = useState<boolean>(false);

  if (loading) return <WorkoutScheduleSqueleton />;

  return (
    <div className="bg-white p-5 rounded-3xl border border-neutral-400 h-full">
      {/** The title */}
      <h1 className="font-bold text-lg md:text-xl mb-5">
        Workout - {selectedDay.toDateString()}
      </h1>
      <div className="space-y-3">
        <h3 className="font-semibold text-lg text-custom-green">
          {todaysWorkout?.name}
        </h3>
        <p className="text-[#828282] font-medium">{todaysWorkout?.desc}</p>
        <button
          className="w-fit bg-black text-white px-3 py-2 rounded-2xl text-center hover:opacity-75 hover:cursor-pointer"
          onClick={() => {}}
        >
          See exercises
        </button>
      </div>
    </div>
  );
};

export default WorkoutSchedule;
