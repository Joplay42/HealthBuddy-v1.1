"use client";
import { useRouter } from "next/navigation";
import DisplayWorkouts from "./DisplayWorkouts";
import { useUserInformationContext } from "@/context/UserInformationContext";

const Workout = () => {
  // Fetch the user workout plan
  const { userWorkoutObjectiveInfo, loading } = useUserInformationContext();

  // Router states
  const router = useRouter();

  return (
    <div className="w-full h-full row-span-2">
      <div className="flex items-center justify-between pb-5">
        {/** Title of the container */}
        <h1 className="font-bold text-xl dark:text-bone">Workouts</h1>

        {!userWorkoutObjectiveInfo && (
          <button
            className="w-fit bg-black dark:bg-lime text-white dark:text-ink-950 px-3 py-2 rounded-2xl text-center hover:opacity-75 hover:cursor-pointer"
            onClick={() => {
              router.push("?modal=workout", { scroll: false });
            }}
          >
            Schedule +
          </button>
        )}
      </div>
      <div className="w-full bg-white dark:bg-ink-900 p-5 rounded-3xl border border-neutral-400 dark:border-white/10">
        <DisplayWorkouts
          plan={userWorkoutObjectiveInfo?.workoutPlan ?? { title: "", desc: "", days: [] }}
          loading={loading}
        />
      </div>
    </div>
  );
};

export default Workout;
