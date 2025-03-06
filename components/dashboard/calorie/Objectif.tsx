"use client";
// Props imports
import { objectiveProps } from "@/types";
// hooks imports
import { useState } from "react";
// Component imports
import {
  ObjectiveCard,
  Modal,
  ObjectifSqueleton,
  SetObjective,
} from "@/components";
import { useRouter } from "next/navigation";

/**
 * This component display all the nutrient information out of the goal and the
 * nutrient consumed.
 *
 * @param data the user food consumed
 * @param goal the user goal
 * @returns
 */
const Objective = ({ data, goal, loading }: objectiveProps) => {
  const router = useRouter();

  if (loading) {
    return <ObjectifSqueleton />;
  }

  return (
    // The objective cards container
    <div className="bg-white p-5 rounded-3xl border border-neutral-400 flex flex-col justify-between lg:h-full">
      <div>
        {/** The title of the card */}
        <h1 className="font-bold text-xl mb-10">Objective</h1>
        {/** A grid to display each info */}
        <div className="lg:grid grid-cols-2 gap-10 pb-7">
          {/** The first item display */}
          <div className="grid grid-cols-2 md:block items-center">
            <h2 className="font-semibold">Calories :</h2>
            <p className="font-light">
              <span className="font-medium text-green text-3xl">
                {data.calorie}
              </span>{" "}
              / {goal.calorie}
            </p>
          </div>
          {/** The card to display the nutrients */}
          <ObjectiveCard goal={goal} data={data} nutrient="protein" />
          <ObjectiveCard goal={goal} data={data} nutrient="carbs" />
          <ObjectiveCard goal={goal} data={data} nutrient="fat" />
        </div>
      </div>
      {/** Button to change the objective */}
      <button
        className="w-full bg-black text-white px-3 py-2 rounded-2xl text-center hover:opacity-75"
        // Open the modal
        onClick={() =>
          router.push("?modal=objective", {
            scroll: false,
          })
        }
      >
        Set objective
      </button>
    </div>
  );
};

export default Objective;
