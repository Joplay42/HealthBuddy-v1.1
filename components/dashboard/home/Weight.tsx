"use client";
import React from "react";
import DisplayWeight from "./DisplayWeight";
import { useUserInformationContext } from "@/context/UserInformationContext";
import { useRouter } from "next/navigation";

const Weight = () => {
  const { userWeightInfo, userWorkoutObjectiveInfo } =
    useUserInformationContext();

  // Router hooks
  const router = useRouter();

  if (!userWorkoutObjectiveInfo?.workoutPlan?.days?.length) return null;

  return (
    // The weight container
    <div className="col-span-2 w-full h-full animate-fade-in">
      <div className="flex items-center justify-between pb-5">
        {/** Title of the container */}
        <h1 className="font-bold text-xl dark:text-bone">Body weight</h1>

        {userWeightInfo.length !== 0 && (
          <button
            className="w-fit bg-black dark:bg-lime text-white dark:text-ink-950 px-3 py-2 rounded-2xl text-center hover:opacity-75 hover:cursor-pointer"
            onClick={() => {
              router.push("?modal=weight", { scroll: false });
            }}
          >
            Add weight +
          </button>
        )}
      </div>
      <div className="bg-white dark:bg-ink-900 px-3 pt-10 pb-16 md:p-10 rounded-3xl border border-neutral-400 dark:border-white/10 h-[340px]">
        <DisplayWeight
          weight={userWeightInfo}
          objective={userWorkoutObjectiveInfo}
          loading={false}
        />
      </div>
    </div>
  );
};

export default Weight;
