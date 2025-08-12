"use client";
import { UserWorkoutPlanProps, workoutDayProps } from "@/types";
import React, { useEffect, useState } from "react";
import Image from "next/image";

const CreateWorkoutPlan = () => {
  // Workout object created
  const [userWorkoutPlan, setUserWorkoutPlan] = useState<UserWorkoutPlanProps>({
    title: "",
    desc: "",
    days: [],
  });
  // Active days for the inputs
  const [daysActive, setDaysActive] = useState<number[]>([]);
  // Button disability
  const [buttonDisabled, setButtonDisabled] = useState<boolean>(true);

  // Function to handle the days activation
  const activateDay = (index: number) => {
    setDaysActive((prev) => (prev.includes(index) ? prev : [...prev, index]));
  };

  // useEffect to check the form validity
  useEffect(() => {
    // Check for the form validity
    const checkFormValidity = () => {
      //Check if all the days are activated and the userWorkout object is valid
      if (
        daysActive.length === 7 &&
        userWorkoutPlan.title.length > 0 &&
        userWorkoutPlan.desc.length > 0 &&
        userWorkoutPlan.days.every(
          (day) => day.name.length > 0 && day.desc.length > 0
        )
      ) {
        setButtonDisabled(false);
      } else {
        setButtonDisabled(true);
      }
    };

    //Call the functions
    checkFormValidity();
  }, [daysActive, userWorkoutPlan]);

  // Generate days of the week
  useEffect(() => {
    // generate the days of the week
    const generateWeek = () => {
      const days: workoutDayProps[] = [];

      // Current day
      const currentDate = new Date();
      const dayOfWeek = currentDate.getDay();
      const diff = (dayOfWeek === 0 ? -6 : 1) - dayOfWeek;
      // Increment the day
      currentDate.setDate(currentDate.getDate() + diff);

      for (let i = 0; i < 7; i++) {
        // Current day
        const date = new Date(currentDate);
        // Increment the day
        date.setDate(currentDate.getDate() + i);
        // Get the day
        const day = date.toDateString().substring(0, 3);
        days.push({
          name: "",
          desc: "",
          day: day,
        });
      }

      setUserWorkoutPlan((prev) => ({
        ...prev,
        days: days,
      }));
    };
    //Call the functions
    generateWeek();
  }, []);

  // Handle submit form function
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    // Remove the page refresh
    e.preventDefault();
  };

  return (
    <div className="px-5 pb-5 md:px-10 lg:pb-10 lg:px-20">
      <form onSubmit={handleSubmit}>
        <h1 className="font-bold text-2xl lg:text-3xl">
          Create your own{" "}
          <span className="text-custom-green">workout plan!</span>
        </h1>
        <div className="space-y-2 mt-6 lg:mt-10">
          {/** Handle errors */}
          <label className="font-semibold text-md">Program title</label>
          <input
            value={userWorkoutPlan.title}
            onChange={(e) =>
              setUserWorkoutPlan((prev) => ({
                ...prev,
                title: e.target.value,
              }))
            }
            type="text"
            name="title"
            className="border-black rounded-xl w-full"
            placeholder="ex. Push | Pull | Leg"
          />
        </div>
        <div className="space-y-2 mt-6">
          {/** Handle errors */}
          <label className="font-semibold text-md">Program description</label>
          <textarea
            value={userWorkoutPlan.desc}
            onChange={(e) =>
              setUserWorkoutPlan((prev) => ({
                ...prev,
                desc: e.target.value,
              }))
            }
            rows={4}
            maxLength={500}
            name="title"
            className="border border-black rounded-xl w-full p-2 resize-none"
            placeholder="ex. Overall equipment and intensity of the workouts"
          />
        </div>
        <div className="space-y-2 mt-6 mb-10">
          <label className="font-semibold text-md">Days selection</label>
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-5 md:gap-10">
            {userWorkoutPlan.days.map((item, index) => (
              <div
                className={`h-60 ${
                  !daysActive.includes(index)
                    ? "outline-1 outline-neutral-400 outline-dashed"
                    : "border-2 border-black"
                } rounded-lg flex justify-center items-center relative`}
                key={index}
              >
                {!daysActive.includes(index) ? (
                  <button
                    onClick={() => activateDay(index)}
                    className="bg-neutral-500 text-white w-7 rounded-full text-center text-xl"
                  >
                    +
                  </button>
                ) : (
                  <div className="space-y-2 mt-10">
                    <div className="px-2 space-y-2">
                      <label className="font-semibold text-sm">Name</label>
                      <input
                        value={userWorkoutPlan.days[index]?.name || ""}
                        onChange={(e) =>
                          setUserWorkoutPlan((prev) => ({
                            ...prev,
                            days: prev.days.map((day, i) =>
                              i === index
                                ? { ...day, name: e.target.value }
                                : day
                            ),
                          }))
                        }
                        type="text"
                        name="title"
                        className="border-black rounded-md w-full text-sm"
                        placeholder="ex. Arm day"
                      />
                    </div>
                    <div className="px-2 space-y-2">
                      <label className="font-semibold text-sm">
                        Description
                      </label>
                      <textarea
                        value={userWorkoutPlan.days[index]?.desc || ""}
                        onChange={(e) =>
                          setUserWorkoutPlan((prev) => ({
                            ...prev,
                            days: prev.days.map((day, i) =>
                              i === index
                                ? { ...day, desc: e.target.value }
                                : day
                            ),
                          }))
                        }
                        rows={2}
                        maxLength={200}
                        name="title"
                        className="border border-black rounded-md w-full p-2 resize-none"
                        placeholder="ex. Arm day"
                      />
                    </div>
                  </div>
                )}
                <p className="absolute top-2 font-bold">{item.day}</p>
              </div>
            ))}
          </div>
        </div>
        {buttonDisabled && (
          <p className="text-red-500">All the fields should be filled</p>
        )}
        <button
          className="flex items-center gap-2 justify-center py-4 px-3 rounded-xl hover:opacity-75 hover:transition ease-in-out duration-300 bg-black text-white w-full disabled:opacity-60"
          type="submit"
          disabled={buttonDisabled}
        >
          Create workout plan
          {/* {loading && (
            <Image
              src="/loading.gif"
              width={40}
              height={40}
              alt="Loading gif"
            />
          )} */}
        </button>
      </form>
    </div>
  );
};

export default CreateWorkoutPlan;
