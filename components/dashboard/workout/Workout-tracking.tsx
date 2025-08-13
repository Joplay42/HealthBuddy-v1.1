"use client";
import Calendar from "./Calendar";
import WorkoutSchedule from "./WorkoutSchedule";
import BodyWeight from "./BodyWeight";
import { useEffect, useState } from "react";
import { workoutDayProps } from "@/types";
import { useUserInformationContext } from "@/context/UserInformationContext";

const WorkoutTracking = () => {
  // Fetch user weights info
  const { userWeightInfo, userWorkoutObjectiveInfo, loading } =
    useUserInformationContext();
  // Todays date
  const todaysDate = new Date();

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

  return (
    <div className="py-5 md:py-10 md:grid grid-cols-3 grid-rows-[minmax(150px,auto)_auto] space-y-5 md:space-y-0 md:gap-10">
      <div
        className={
          userWorkoutObjectiveInfo.workoutPlan.days.length !== 0
            ? `col-span-2`
            : `col-span-3`
        }
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
      {userWorkoutObjectiveInfo.workoutPlan.days.length !== 0 && (
        <div data-aos="fade-up" data-aos-delay="200" data-aos-duration="300">
          <WorkoutSchedule
            todaysWorkout={todaysWorkout}
            selectedDay={selectedDays}
            loading={loading}
          />
        </div>
      )}

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
