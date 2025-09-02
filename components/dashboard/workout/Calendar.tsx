"use client";
import { CalendarProps, WeekPlanningProps } from "@/types";
import { useEffect, useState } from "react";
import Image from "next/image";
import CalendarDay from "./CalendarDay";
import Calendarsqueleton from "@/components/Squeleton/Calendarsqueleton";
import { useRouter } from "next/navigation";

const Calendar = ({
  today,
  workoutPlan,
  selectedDays,
  setSelectedDays,
  loading,
}: CalendarProps) => {
  // States for the next 2 weeks
  const [weekArray, setWeekArray] = useState<WeekPlanningProps[]>([]);
  // States for the week index
  const [weekIndex, setWeekIndex] = useState<number>(0);
  // Router states
  const router = useRouter();

  const start = weekIndex * 7;
  const end = start + 7;

  // Hooks to create 2 next week and to assigne if there is a workout
  useEffect(() => {
    if (!workoutPlan?.days?.length) return;

    const newWeekArray: WeekPlanningProps[] = [];

    for (let i = 0; i < 14; i++) {
      const current = new Date(today);
      current.setDate(today.getDate() + i);

      const day = current.toDateString().substring(0, 3);
      const foundWorkout = workoutPlan.days.find(
        (workout) => workout.day === day
      );

      newWeekArray.push({
        date: current,
        workout: foundWorkout, // keep null if no workout
      });
    }

    setWeekArray(newWeekArray);
  }, [workoutPlan, today]);

  if (loading) return <Calendarsqueleton />;

  return (
    <div className="bg-white p-5 rounded-3xl border border-neutral-400 h-full">
      <div className="flex items-center justify-between mb-5">
        {/** title */}
        <h1 className="font-bold text-xl">Planning</h1>
        {/** Button to add  a new food item */}
        <button
          className="hidden md:block w-fit bg-black text-white px-3 py-2 rounded-2xl text-center hover:opacity-75 hover:cursor-pointer"
          onClick={() => {
            router.push("?modal=workout", { scroll: false });
          }}
        >
          Change workout plan
        </button>
        <button
          className="md:hidden w-fit bg-black text-white px-3 py-2 rounded-2xl text-center hover:opacity-75 hover:cursor-pointer"
          onClick={() => {
            router.push("?modal=workout", { scroll: false });
          }}
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
      <div className="relative flex items-center justify-between border border-neutral-400">
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
