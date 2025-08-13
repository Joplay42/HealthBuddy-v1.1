"use client";
import { workoutPlans } from "@/constant";
import { UserWorkoutPlanProps, WorkoutPlanProps } from "@/types";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Dispatch, SetStateAction } from "react";

const WorkoutPlan = ({
  plan,
  setPlan,
  setIndex,
  submit,
}: {
  plan: WorkoutPlanProps;
  setPlan: Dispatch<SetStateAction<WorkoutPlanProps>>;
  setIndex: (nb: string) => void;
  submit: (
    e: React.FormEvent<HTMLFormElement>,
    plan: WorkoutPlanProps | UserWorkoutPlanProps
  ) => void;
}) => {
  // Router hooks
  const router = useRouter();

  // Function to change workout
  const changeWorkout = () => {
    // Find the current workout index
    const currentPlanIndex = workoutPlans.findIndex(
      (workout) => workout.title === plan.title
    );

    // Get the maximum index from the workout
    const maxIndex = workoutPlans.length;

    // Change the next index
    const nextIndex = currentPlanIndex + 1 >= 8 ? 0 : currentPlanIndex + 1;

    // next workout
    setPlan(workoutPlans[nextIndex]);
  };

  return (
    <div className="px-5 pb-5 md:px-10 lg:pb-10 lg:px-20">
      <div className="lg:grid lg:grid-cols-2 lg:items-center">
        <form onSubmit={(e) => submit(e, plan)} className="space-y-3">
          <div className="flex gap-1">
            <h4 className="font-medium text-neutral-600">Recommanded plan</h4>
            <Image src="/stars.svg" height={20} width={20} alt="Stars icon" />
          </div>
          <div className="space-y-2">
            <div className="flex gap-3">
              <h1 className="font-bold text-xl lg:text-2xl">{plan.title}</h1>
              {Array(5)
                .fill(0)
                .map((_, index) => {
                  // Cut the array for each intensity
                  let active = 0;

                  if (plan.intensity === "Low") active = 1;
                  if (plan.intensity === "Moderate") active = 3;
                  if (plan.intensity === "High") active = 5;

                  return (
                    <div className="flex gap-1 items-center" key={index}>
                      <div
                        className={`w-3 h-3 rounded-full ${
                          index < active ? "bg-custom-green" : "bg-neutral-300"
                        }`}
                      />
                    </div>
                  );
                })}
            </div>
            <div className="bg-custom-green h-1 w-12"></div>
          </div>
          <p className="text-neutral-600">{plan.desc}</p>
          <div className="flex flex-wrap gap-3">
            {plan.days
              .filter(
                (day, index, arr) =>
                  index === arr.findIndex((d) => d.name === day.name)
              )
              .map((day, index) => (
                <div
                  key={index}
                  className="border border-neutral-200 rounded-lg p-4 w-[48%]"
                >
                  <h4 className="font-semibold">{day.name}</h4>
                  <p className="text-neutral-600 text-xs">{day.desc}</p>
                </div>
              ))}
            <p className="font-medium">
              Not satisfied?{" "}
              <button
                onClick={() => setIndex("3")}
                className="font-bold text-custom-green hover:text-lime-400 hover:cursor-pointer"
              >
                Create your own plan
              </button>{" "}
              or{" "}
              <button
                onClick={() => changeWorkout()}
                className="font-bold text-custom-green hover:text-lime-400 hover:cursor-pointer"
              >
                keep looking
              </button>
            </p>
          </div>
          <button
            className="mt-8 flex items-center gap-2 justify-center py-2 rounded-xl hover:opacity-75 hover:transition ease-in-out duration-300 bg-black text-white w-full disabled:opacity-60 text-sm"
            type="submit"
            // disabled={loading || disableButton}
          >
            Select
            {/* {loading && (
              <Image
                src="/loading.gif"
                width={25}
                height={25}
                alt="Loading gif"
              />
            )} */}
          </button>
        </form>
        <Image
          src="/set-objective.png"
          alt=""
          width={1000}
          height={1000}
          className="h-auto w-5/6 justify-self-end rounded-xl hidden lg:block"
        />
      </div>
    </div>
  );
};

export default WorkoutPlan;
