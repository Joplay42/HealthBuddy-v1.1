import React from "react";
import DisplayWeight from "./DisplayWeight";
import { userProgramProps, userWeightProps } from "@/types";

const Weight = () => {
  // Hard coded values
  const userWeights: userWeightProps = {
    weights: [
      {
        number: 162,
        date: new Date("2025-07-01"),
      },
      {
        number: 160.5,
        date: new Date("2025-07-05"),
      },
      {
        number: 161,
        date: new Date("2025-07-10"),
      },
      {
        number: 159.2,
        date: new Date("2025-07-17"),
      },
      {
        number: 158.9,
        date: new Date("2025-07-23"),
      },
      {
        number: 157.1,
        date: new Date("2025-07-29"),
      },
      {
        number: 156,
        date: new Date("2025-08-04"),
      },
    ],
  };
  const userObjective: userProgramProps = {
    objectiveWeight: 150,
    months: 3,
  };

  return (
    // The weight container
    <div className="col-span-2 w-full h-full ">
      <div className="flex items-center justify-between pb-5">
        {/** Title of the container */}
        <h1 className="font-bold text-xl">Body weight</h1>

        {userWeights.weights.length !== 0 && (
          <button
            className="w-fit bg-black text-white px-3 py-2 rounded-2xl text-center hover:opacity-75 hover:cursor-pointer"
            onClick={() => {}}
          >
            Add weight +
          </button>
        )}
      </div>
      <div className="bg-white p-10 rounded-3xl border border-neutral-400">
        <DisplayWeight weight={userWeights} objective={userObjective} />
      </div>
    </div>
  );
};

export default Weight;
