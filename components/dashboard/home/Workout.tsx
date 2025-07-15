import React from "react";
import DisplayWorkouts from "./DisplayWorkouts";
import { workoutPlans } from "@/constant";

const Workout = () => {
  return (
    <div className="w-full h-full row-span-2">
      <div className="flex items-center justify-between pb-5">
        {/** Title of the container */}
        <h1 className="font-bold text-xl">Workouts</h1>

        <button
          className="w-fit bg-black text-white px-3 py-2 rounded-2xl text-center hover:opacity-75 hover:cursor-pointer"
          onClick={() => {}}
        >
          Schedule +
        </button>
      </div>
      <div className="w-full h-auto bg-white p-5 rounded-3xl border border-neutral-400">
        <DisplayWorkouts plan={workoutPlans[0]} />
      </div>
    </div>
  );
};

export default Workout;
