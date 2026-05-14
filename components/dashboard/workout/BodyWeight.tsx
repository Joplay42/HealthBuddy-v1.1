"use client";
import { DisplayWeight, WeightsGrid } from "@/components";
import { BodyWeightProps } from "@/types";
import { useRouter } from "next/navigation";

const BodyWeight = ({ weight, objective, loading }: BodyWeightProps) => {
  // Hooks for the naviation
  const router = useRouter();

  return (
    <div className="bg-white dark:bg-ink-900 p-5 rounded-3xl border border-neutral-400 dark:border-white/10">
      <div className="flex items-center justify-between mb-10">
        <h1 className="font-bold text-xl dark:text-bone">Body weights</h1>
        <button
          className="hidden sm:block w-fit bg-black dark:bg-lime text-white dark:text-ink-950 px-3 py-2 rounded-2xl text-center hover:opacity-75 hover:cursor-pointer"
          onClick={() => {
            router.push("?modal=weight", { scroll: false });
          }}
        >
          Add weights +
        </button>
        <button
          className="sm:hidden w-fit bg-black dark:bg-lime text-white dark:text-ink-950 px-3 py-2 rounded-2xl text-center hover:opacity-75 hover:cursor-pointer"
          onClick={() => {
            router.push("?modal=weight", { scroll: false });
          }}
        >
          +
        </button>
      </div>
      <div
        className={`lg:grid grid-cols-4 grid-rows-[minmax(150px,auto)_auto] space-y-5 md:space-y-0 md:gap-10 items-start ${
          weight.length > 0 && "pt-4"
        }`}
      >
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
