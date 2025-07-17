import React from "react";
import DisplayWeight from "./DisplayWeight";
import { userProgramProps, userWeightProps } from "@/types";
import { userObjective, userWeights } from "@/constant";

const Weight = () => {
  return (
    // The weight container
    <div
      className="col-span-2 w-full h-full "
      data-aos="fade-up"
      data-aos-delay="200"
      data-aos-duration="300"
    >
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
      <div className="bg-white p-10 rounded-3xl border border-neutral-400 h-[340px]">
        <DisplayWeight weight={userWeights} objective={userObjective} />
      </div>
    </div>
  );
};

export default Weight;
