"use client";
import DisplayWorkouts from "./DisplayWorkouts";
import { useUserInformationContext } from "@/context/UserInformationContext";

const Workout = () => {
  // Fetch the user workout plan
  const { userWorkoutObjectiveInfo, loading } = useUserInformationContext();

  return (
    <div
      className="w-full h-full row-span-2"
      data-aos="fade-up"
      data-aos-delay="200"
      data-aos-duration="300"
    >
      <div className="flex items-center justify-between pb-5">
        {/** Title of the container */}
        <h1 className="font-bold text-xl">Workouts</h1>

        {userWorkoutObjectiveInfo.workoutPlan.days.length !== 0 && (
          <button
            className="w-fit bg-black text-white px-3 py-2 rounded-2xl text-center hover:opacity-75 hover:cursor-pointer"
            onClick={() => {}}
          >
            Schedule +
          </button>
        )}
      </div>
      <div className="w-full bg-white p-5 rounded-3xl border border-neutral-400">
        <DisplayWorkouts plan={userWorkoutObjectiveInfo.workoutPlan} />
      </div>
    </div>
  );
};

export default Workout;
