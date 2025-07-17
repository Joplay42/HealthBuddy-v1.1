"use client";
import { DisplayWorkoutsProps, WeekDay, WorkoutPlanProps } from "@/types";
import { useEffect, useState } from "react";
import WorkoutDayCard from "./WorkoutDayCard";
import WorkoutDayCardSqueleton from "@/components/Squeleton/WorkoutDayCardSqueleton";

const DisplayWorkouts = ({ plan }: DisplayWorkoutsProps) => {
  // States for the current week
  const [weekDates, setWeekDates] = useState<WeekDay[]>([]);
  // Loading states
  const [loading, setLoading] = useState<boolean>(true);

  // Get the current week
  useEffect(() => {
    const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    const generateWeek = () => {
      const today = new Date();
      const weekArray = [];

      for (let i = 0; i < 7; i++) {
        const current = new Date(today);
        current.setDate(today.getDate() + i);

        weekArray.push({
          day: daysOfWeek[current.getDay()],
          date: current.toLocaleDateString("en-CA"),
        });
      }

      return weekArray;
    };

    setWeekDates(generateWeek());
    setLoading(false);
  }, []);

  if (loading) return <WorkoutDayCardSqueleton />;

  return (
    <div className="space-y-3">
      {weekDates.map((entry, index) => {
        const foundDays = plan.days.find(
          (workout) => workout.day === entry.day
        ) ?? { name: "", desc: "", day: "" };

        return (
          <WorkoutDayCard day={entry.day} workout={foundDays} key={index} />
        );
      })}
    </div>
  );
};

export default DisplayWorkouts;
