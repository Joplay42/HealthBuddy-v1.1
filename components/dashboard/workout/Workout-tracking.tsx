"use client";
import Calendar from "./Calendar";
import WorkoutSchedule from "./WorkoutSchedule";
import BodyWeight from "./BodyWeight";
import { workoutPlans } from "@/constant";
import { useEffect, useState } from "react";
import { WeekDay, workoutDayProps } from "@/types";

const WorkoutTracking = () => {
  // Todays date
  const todaysDate = new Date();

  // Hook for selected days - by default today
  const [selectedDays, setSelectedDays] = useState<Date>(todaysDate);
  // Hook for todays workout
  const [todaysWorkout, setTodaysWorkout] = useState<workoutDayProps>();

  // Hooks to find todays workout
  useEffect(() => {
    // Find the workout for today
    const workout = workoutPlans[0].days.find(
      (workout) => workout.day === selectedDays.toDateString().substring(0, 3)
    );
    setTodaysWorkout(workout);
  }, [selectedDays]);

  return (
    <div className="py-5 md:py-10 md:grid grid-cols-3 grid-rows-[minmax(150px,auto)_auto] space-y-5 md:space-y-0 md:gap-10">
      <div className="col-span-2">
        <Calendar
          today={todaysDate}
          workoutPlan={workoutPlans[0].days}
          selectedDays={selectedDays}
          setSelectedDays={setSelectedDays}
        />
      </div>
      <WorkoutSchedule
        todaysWorkout={todaysWorkout}
        selectedDay={selectedDays}
      />
      <div className="col-span-full">
        <BodyWeight />
      </div>
    </div>
  );
};

export default WorkoutTracking;
