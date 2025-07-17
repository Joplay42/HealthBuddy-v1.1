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
    // Find the workout for today
    const workout = userWorkoutObjectiveInfo.workoutPlan.days.find(
      (workout) => workout.day === selectedDays.toDateString().substring(0, 3)
    );
    setTodaysWorkout(workout);
  }, [selectedDays]);

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
          workoutPlan={userWorkoutObjectiveInfo.workoutPlan.days}
          selectedDays={selectedDays}
          setSelectedDays={setSelectedDays}
        />
      </div>
      <div data-aos="fade-up" data-aos-delay="200" data-aos-duration="300">
        <WorkoutSchedule
          todaysWorkout={todaysWorkout}
          selectedDay={selectedDays}
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
