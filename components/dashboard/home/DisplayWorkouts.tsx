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

  if (plan.days.length === 0)
    return (
      <div className="space-y-3 py-32">
        <h1 className="text-2xl font-bold text-center">
          Start your <span className="text-custom-green">Fitness journey</span>{" "}
          Today!
          <span className="text-3xl"> 🎉</span>
        </h1>
        <div className="flex justify-center mt-5">
          <button className="w-fit bg-black text-white px-5 py-2 rounded-2xl text-center hover:opacity-75">
            Find my workout
          </button>
        </div>
      </div>
    );

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
