"use client";
import { WorkoutDayCardProps } from "@/types";
import { useEffect, useState } from "react";

const WorkoutDayCard = ({ day, workout }: WorkoutDayCardProps) => {
  const [remaining, setRemaining] = useState<number>();

  // UseEffect to calculate the remaining days
  useEffect(() => {
    const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    const todayIndex = new Date().getDay();
    const targetIndex = daysOfWeek.indexOf(workout.day);

    let diff = targetIndex - todayIndex;
    if (diff < 0) {
      diff += 7;
    }

    setRemaining(diff);
  }, []);

  return (
    <div className="flex flex-col space-y-2">
      <p className="text-lg text-custom-green">{workout.day}</p>
      <div className="rounded-xl border-2 border-[#b2b2b2] p-4 flex justify-between">
        <p className="font-medium">{workout.name}</p>
        <p>
          {remaining === 0
            ? "Today"
            : remaining === 1
            ? "Tomorrow"
            : `In ${remaining} days`}
        </p>
      </div>
    </div>
  );
};

export default WorkoutDayCard;
