"use client";
import { CalendarProps, WeekPlanningProps } from "@/types";
import { useEffect, useState } from "react";
import Image from "next/image";
import CalendarDay from "./CalendarDay";

const Calendar = ({
  today,
  workoutPlan,
  selectedDays,
  setSelectedDays,
}: CalendarProps) => {
  // States for the next 2 weeks
  const [weekArray, setWeekArray] = useState<WeekPlanningProps[]>([]);
  // States for the week index
  const [weekIndex, setWeekIndex] = useState<number>(0);

  const start = weekIndex * 7;
  const end = start + 7;

  // Hooks to create 2 next week and to assigne if there is a workout
  useEffect(() => {
    // The days of the week
    const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    const generateWeek = () => {
      // Simulate a 2 week loop
      for (let i = 0; i < 14; i++) {
        // Get the current day
        const current = new Date(today);
        // Set the new simualted date
        current.setDate(today.getDate() + i);

        // Get the day
        const day = current.toDateString().substring(0, 3);
        // Find the right workout for the day
        const foundWorkout = workoutPlan.find((workout) => workout.day === day);

        if (foundWorkout) {
          setWeekArray((prev) => [
            ...prev,
            {
              date: current,
              workout: foundWorkout,
            },
          ]);
        }
      }
    };

    generateWeek();
  }, []);

  return (
    <div className="bg-white p-5 rounded-3xl border border-neutral-400 h-full">
      <div className="flex items-center justify-between mb-5">
        {/** title */}
        <h1 className="font-bold text-xl">Planning</h1>
        {/** Button to add  a new food item */}
        <button
          className="hidden md:block w-fit bg-black text-white px-3 py-2 rounded-2xl text-center hover:opacity-75 hover:cursor-pointer"
          onClick={() => {}}
        >
          Change workout plan
        </button>
        <button
          className="md:hidden w-fit bg-black text-white px-3 py-2 rounded-2xl text-center hover:opacity-75 hover:cursor-pointer"
          onClick={() => {}}
        >
          Change
        </button>
      </div>
      <div className="flex justify-between items-center">
        <p className="font-medium text-custom-dark text-xl mb-3">
          <span className="text-2xl font-semibold">
            {selectedDays.getDate()}
          </span>{" "}
          {selectedDays.toDateString().substring(4, 7)}
        </p>
        <div className="flex items-center space-x-2">
          <button
            className="bg-neutral-300 px-2 py-1 md:px-3 md:py-2 rounded-xl border border-neutral-400 disabled:bg-neutral-100"
            disabled={weekIndex == 0}
            onClick={() => setWeekIndex((prev) => prev - 1)}
          >
            <Image
              src="/previous-arrow.svg"
              width={17}
              height={17}
              alt="back arrow icon"
              className=""
            />
          </button>
          <button
            className="bg-neutral-300 px-2 py-1 md:px-3 md:py-2 rounded-xl border border-neutral-400 disabled:bg-neutral-200"
            disabled={weekIndex == 1}
            onClick={() => setWeekIndex((prev) => prev + 1)}
          >
            <Image
              src="/next-arrow.svg"
              width={17}
              height={17}
              alt="back arrow icon"
              className=""
            />
          </button>
        </div>
      </div>
      <div className="flex items-center justify-between border border-neutral-400">
        {weekArray.slice(start, end).map((entry, index) => (
          <CalendarDay
            weekDay={entry}
            selectedDay={selectedDays}
            setSelectedDay={setSelectedDays}
            key={index}
          />
        ))}
      </div>
    </div>
  );
};

export default Calendar;
