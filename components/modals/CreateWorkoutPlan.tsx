"use client";
import {
  UserWorkoutPlanProps,
  workoutDayProps,
  WorkoutPlanProps,
} from "@/types";
import React, { useEffect, useState } from "react";
import {
  EVENTS,
  Joyride,
  STATUS,
  type EventData,
  type Step,
} from "react-joyride";
import { useTheme } from "@/context/ThemeContext";

let createPlanTourShown = false;

const CREATE_PLAN_STEPS: Step[] = [
  {
    target: '[data-tour="cp-title"]',
    title: "Plan name",
    content:
      'Give your plan a descriptive name — for example "Push / Pull / Legs" or "Full Body 3x". This is what you\'ll see on your dashboard.',
    placement: "bottom",
    isFixed: true,
  },
  {
    target: '[data-tour="cp-desc"]',
    title: "Plan description",
    content:
      "Write a short summary of the plan: the equipment needed, overall intensity, or any other notes. This helps you remember what the plan is about when you come back to it.",
    placement: "bottom",
    isFixed: true,
  },
  {
    target: '[data-tour="cp-days"]',
    title: "Build your weekly schedule",
    content:
      'Tap the + on each day to activate it, then fill in a workout name and a short description for that day. All 7 days must be filled before you can submit — rest days count too (just name them "Rest" and describe them as recovery).',
    placement: "top",
    isFixed: true,
  },
];

const CreateWorkoutPlan = ({
  submit,
}: {
  submit: (
    e: React.FormEvent<HTMLFormElement>,
    plan: WorkoutPlanProps | UserWorkoutPlanProps,
  ) => void;
}) => {
  const { theme } = useTheme();
  const [tourRun, setTourRun] = useState(false);

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
          (day) => day.name.length > 0 && day.desc.length > 0,
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

  useEffect(() => {
    if (createPlanTourShown) return;
    const t = setTimeout(() => {
      createPlanTourShown = true;
      setTourRun(true);
    }, 500);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="px-5 pb-5 md:px-10 lg:pb-10 lg:px-20">
      <form onSubmit={(e) => submit(e, userWorkoutPlan)}>
        <h1 className="font-bold text-2xl lg:text-3xl">
          Create your own{" "}
          <span className="text-custom-green dark:text-lime">
            workout plan!
          </span>
        </h1>
        <div data-tour="cp-title" className="space-y-2 mt-6 lg:mt-10">
          {/** Handle errors */}
          <label className="font-semibold text-md dark:text-bone">
            Program title
          </label>
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
            className="border-black dark:border-white/20 rounded-xl w-full"
            placeholder="ex. Push | Pull | Leg"
          />
        </div>
        <div data-tour="cp-desc" className="space-y-2 mt-6">
          {/** Handle errors */}
          <label className="font-semibold text-md dark:text-bone">
            Program description
          </label>
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
            className="border border-black dark:border-white/20 rounded-xl w-full p-2 resize-none"
            placeholder="ex. Overall equipment and intensity of the workouts"
          />
        </div>
        <div data-tour="cp-days" className="space-y-2 mt-6 mb-10">
          <label className="font-semibold text-md dark:text-bone">
            Days selection
          </label>
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-5 md:gap-10">
            {userWorkoutPlan.days.map((item, index) => (
              <div
                className={`h-60 ${
                  !daysActive.includes(index)
                    ? "outline-1 outline-neutral-400 dark:outline-white/20 outline-dashed"
                    : "border-2 border-black dark:border-lime"
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
                      <label className="font-semibold text-sm dark:text-bone">
                        Name
                      </label>
                      <input
                        value={userWorkoutPlan.days[index]?.name || ""}
                        onChange={(e) =>
                          setUserWorkoutPlan((prev) => ({
                            ...prev,
                            days: prev.days.map((day, i) =>
                              i === index
                                ? { ...day, name: e.target.value }
                                : day,
                            ),
                          }))
                        }
                        type="text"
                        name="title"
                        className="border-black dark:border-white/20 rounded-md w-full text-sm"
                        placeholder="ex. Arm day"
                      />
                    </div>
                    <div className="px-2 space-y-2">
                      <label className="font-semibold text-sm dark:text-bone">
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
                                : day,
                            ),
                          }))
                        }
                        rows={2}
                        maxLength={200}
                        name="title"
                        className="border border-black dark:border-white/20 rounded-md w-full p-2 resize-none"
                        placeholder="ex. Arm day"
                      />
                    </div>
                  </div>
                )}
                <p className="absolute top-2 font-bold dark:text-bone">
                  {item.day}
                </p>
              </div>
            ))}
          </div>
        </div>
        {buttonDisabled && (
          <p className="text-red-500">All the fields should be filled</p>
        )}
        <button
          className="flex items-center gap-2 justify-center py-4 px-3 rounded-xl hover:opacity-75 hover:transition ease-in-out duration-300 bg-black dark:bg-lime text-white dark:text-ink-950 w-full disabled:opacity-60"
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
      {tourRun && (
        <Joyride
          steps={CREATE_PLAN_STEPS}
          run
          continuous
          scrollToFirstStep
          onEvent={(data: EventData) => {
            const { status, type } = data;
            if (
              status === STATUS.FINISHED ||
              status === STATUS.SKIPPED ||
              type === EVENTS.TARGET_NOT_FOUND
            ) {
              setTourRun(false);
            }
          }}
          locale={{
            back: "Back",
            close: "Close",
            last: "Got it",
            next: "Next",
            skip: "Skip",
          }}
          options={{
            primaryColor: "#AFF921",
            textColor: theme === "dark" ? "#F4F4F0" : "#2B2B2B",
            backgroundColor: theme === "dark" ? "#1f1f1f" : "#ffffff",
            arrowColor: theme === "dark" ? "#1f1f1f" : "#ffffff",
            overlayColor:
              theme === "dark" ? "rgba(0,0,0,0.55)" : "rgba(43,43,43,0.45)",
            zIndex: 99999,
            showProgress: true,
            buttons: ["back", "skip", "primary"],
            overlayClickAction: false,
            skipBeacon: true,
            spotlightPadding: 8,
            spotlightRadius: 12,
          }}
          styles={{
            tooltip: { borderRadius: 16, padding: 16, maxWidth: "90vw" },
            tooltipTitle: {
              fontSize: 16,
              fontWeight: 700,
              margin: 0,
              marginBottom: 6,
            },
            tooltipContent: { fontSize: 14, padding: 6 },
            buttonPrimary: {
              backgroundColor: "#AFF921",
              color: "#2B2B2B",
              borderRadius: 12,
              padding: "8px 16px",
              fontWeight: 600,
            },
            buttonBack: {
              color: theme === "dark" ? "#F4F4F0" : "#2B2B2B",
              marginRight: 8,
            },
            buttonSkip: {
              color: theme === "dark" ? "rgba(255,255,255,0.55)" : "#797979",
            },
          }}
        />
      )}
    </div>
  );
};

export default CreateWorkoutPlan;
