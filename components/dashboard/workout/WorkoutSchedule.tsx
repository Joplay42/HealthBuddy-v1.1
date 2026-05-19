"use client";
import WorkoutScheduleSqueleton from "@/components/Squeleton/WorkoutScheduleSqueleton";
import { workoutScheduleProps } from "@/types";
import { useState } from "react";
import HelpBubble from "@/components/onboarding/HelpBubble";

const WorkoutSchedule = ({
  todaysWorkout,
  selectedDay,
  loading,
}: workoutScheduleProps) => {
  if (loading) return <WorkoutScheduleSqueleton />;

  return (
    <div className="bg-white dark:bg-ink-900 p-5 rounded-3xl border border-neutral-400 dark:border-white/10 h-full">
      <div className="flex items-center gap-2 mb-5">
        <h1 className="font-bold text-lg md:text-xl dark:text-bone">
          Workout - {selectedDay.toDateString()}
        </h1>
        <HelpBubble
          id="workout-schedule"
          placement="bottom"
          content="The exercises for the selected day. Pick a different day in the calendar above to see its workout."
        />
      </div>
      <div className="space-y-3">
        <h3 className="font-semibold text-lg text-custom-green dark:text-lime">
          {todaysWorkout?.name}
        </h3>
        <p className="text-[#828282] dark:text-white/55 font-medium">{todaysWorkout?.desc}</p>
        {/* Implement muscle exercises */}
        {/* <button
          className="w-fit bg-black text-white px-3 py-2 rounded-2xl text-center hover:opacity-75 hover:cursor-pointer"
          onClick={() => {}}
        >
          See exercises
        </button> */}
      </div>
    </div>
  );
};

export default WorkoutSchedule;
