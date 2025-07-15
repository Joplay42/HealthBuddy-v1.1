"use client";
import Calendar from "./Calendar";
import WorkoutSchedule from "./WorkoutSchedule";
import BodyWeight from "./BodyWeight";
import { workoutPlans } from "@/constant";
import { useEffect, useState } from "react";
import { WeekDay, workoutDayProps } from "@/types";

const WorkoutTracking = () => {
  // Todays date
  const todaysDate = new Date().toDateString();
  // Todays day
  const todaysDay = todaysDate.substring(0, 3);

  // Today day object
  const today: WeekDay = {
    day: todaysDay,
    date: todaysDate,
  };
  // Hook for selected days - by default today
  const [selectedDays, setSelectedDays] = useState<WeekDay>(today);
  // Hook for todays workout
  const [todaysWorkout, setTodaysWorkout] = useState<workoutDayProps>();

  // Hooks to find todays workout
  useEffect(() => {
    // Find the workout for today
    const workout = workoutPlans[0].days.find(
      (workout) => workout.day === selectedDays.day
    );
    setTodaysWorkout(workout);
  }, [selectedDays]);

  return (
    <div className="py-5 md:py-10 md:grid grid-cols-3 grid-rows-[minmax(150px,auto)_auto] space-y-5 md:space-y-0 md:gap-10">
      <div className="col-span-2">
        <Calendar
          today={today}
          workoutPlan={workoutPlans[0].days}
          selectedDays={selectedDays}
          setSelectedDays={setSelectedDays}
        />
      </div>
      <WorkoutSchedule todaysWorkout={todaysWorkout} />
      <div className="col-span-full">
        <BodyWeight />
      </div>
    </div>
  );
};

export default WorkoutTracking;
