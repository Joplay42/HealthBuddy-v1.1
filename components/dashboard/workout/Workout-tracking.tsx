"use client";
import Calendar from "./Calendar";
import WorkoutSchedule from "./WorkoutSchedule";
import BodyWeight from "./BodyWeight";
import { useEffect, useState } from "react";
import { workoutDayProps } from "@/types";
import { useUserInformationContext } from "@/context/UserInformationContext";
import { useRouter } from "next/navigation";

const WorkoutTracking = () => {
  // Fetch user weights info
  const { userWeightInfo, userWorkoutObjectiveInfo, loading } =
    useUserInformationContext();
  // Todays date
  const todaysDate = new Date();
  // Router hooks
  const router = useRouter();

  // Hook for selected days - by default today
  const [selectedDays, setSelectedDays] = useState<Date>(todaysDate);
  // Hook for todays workout
  const [todaysWorkout, setTodaysWorkout] = useState<workoutDayProps>();

  // Hooks to find todays workout
  useEffect(() => {
    if (!userWorkoutObjectiveInfo?.workoutPlan?.days?.length) return;

    const workout = userWorkoutObjectiveInfo.workoutPlan.days.find(
      (w) => w.day === selectedDays.toDateString().substring(0, 3)
    );

    setTodaysWorkout(workout);
  }, [selectedDays, userWorkoutObjectiveInfo]);

  if (loading) return null;

  if (!userWorkoutObjectiveInfo || userWorkoutObjectiveInfo.workoutPlan.days.length === 0)
    return (
      <div className="py-5 md:py-10">
        <div className="bg-white dark:bg-ink-900 p-5 rounded-3xl border border-neutral-400 dark:border-white/10 h-full">
          <div className="space-y-3 py-32">
            <h1 className="text-2xl font-bold text-center dark:text-bone">
              Start planning your{" "}
              <span className="text-custom-green dark:text-lime">Workouts</span> Today!
              <span className="text-3xl"> 🎉</span>
            </h1>
            <div className="flex justify-center mt-5">
              <button
                className="w-fit bg-black dark:bg-lime text-white dark:text-ink-950 px-5 py-2 rounded-2xl text-center hover:opacity-75"
                onClick={() => {
                  router.push("?modal=workout", { scroll: false });
                }}
              >
                Find my workout
              </button>
            </div>
          </div>
        </div>
      </div>
    );

  return (
    <div className="py-5 md:py-10 md:grid grid-cols-3 grid-rows-[minmax(150px,auto)_auto] space-y-5 md:space-y-0 md:gap-10">
      <div
        className="col-span-2"
        data-aos="fade-up"
        data-aos-delay="200"
        data-aos-duration="300"
      >
        <Calendar
          today={todaysDate}
          workoutPlan={userWorkoutObjectiveInfo.workoutPlan}
          selectedDays={selectedDays}
          setSelectedDays={setSelectedDays}
          loading={loading}
        />
      </div>

      <div data-aos="fade-up" data-aos-delay="200" data-aos-duration="300">
        <WorkoutSchedule
          todaysWorkout={todaysWorkout}
          selectedDay={selectedDays}
          loading={loading}
        />
      </div>
      <div
        className="col-span-full"
        data-aos="fade-up"
        data-aos-delay="200"
        data-aos-duration="300"
      >
        <BodyWeight
          weight={userWeightInfo}
          objective={userWorkoutObjectiveInfo}
          loading={loading}
        />
      </div>
    </div>
  );
};

export default WorkoutTracking;
