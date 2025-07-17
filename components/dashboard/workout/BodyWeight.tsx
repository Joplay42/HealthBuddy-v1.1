"use client";
import { DisplayWeight, WeightsGrid } from "@/components";
import { BodyWeightProps } from "@/types";

const BodyWeight = ({ weight, objective, loading }: BodyWeightProps) => {
  return (
    <div className="bg-white p-5 rounded-3xl border border-neutral-400">
      <div className="flex items-center justify-between mb-10">
        {/** title */}
        <h1 className="font-bold text-xl">Body weights</h1>
        {/** Button to add  a new food item */}
        <button
          className="w-fit bg-black text-white px-3 py-2 rounded-2xl text-center hover:opacity-75 hover:cursor-pointer"
          onClick={() => {}}
        >
          Add weights +
        </button>
      </div>
      <div className="lg:grid grid-cols-4 grid-rows-[minmax(150px,auto)_auto] space-y-5 md:space-y-0 md:gap-10 items-start">
        <div className="col-span-3 h-[400px]">
          <DisplayWeight
            weight={weight}
            objective={objective}
            loading={loading}
          />
        </div>
        <WeightsGrid weight={weight} loading={loading} />
      </div>
    </div>
  );
};

export default BodyWeight;
