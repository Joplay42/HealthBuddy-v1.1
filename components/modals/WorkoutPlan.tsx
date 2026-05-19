"use client";
import { workoutPlans } from "@/constant";
import { UserWorkoutPlanProps, WorkoutPlanProps } from "@/types";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { EVENTS, Joyride, STATUS, type EventData, type Step } from "react-joyride";
import { useTheme } from "@/context/ThemeContext";

let workoutPlanTourShown = false;

const WORKOUT_PLAN_STEPS: Step[] = [
  {
    target: '[data-tour="wp-header"]',
    title: "Your generated plan",
    content:
      "This plan was picked by the algorithm based on your goal, weights, intensity, and experience. The dots show intensity level — more filled dots means a harder programme.",
    placement: "bottom",
    isFixed: true,
  },
  {
    target: '[data-tour="wp-days"]',
    title: "Training days",
    content:
      "These cards show the workout types included in the plan and what each session focuses on. Tap Select below to lock this plan in.",
    placement: "bottom",
    isFixed: true,
  },
  {
    target: '[data-tour="wp-actions"]',
    title: "Not a good fit?",
    content:
      "Tap \"keep looking\" to cycle through other pre-built plans until you find one that suits you. Or tap \"Create your own plan\" to build a fully custom weekly schedule from scratch.",
    placement: "top",
    isFixed: true,
  },
];

const WorkoutPlan = ({
  plan,
  setPlan,
  setIndex,
  submit,
  loading,
}: {
  plan: WorkoutPlanProps;
  setPlan: Dispatch<SetStateAction<WorkoutPlanProps>>;
  setIndex: (nb: string) => void;
  submit: (
    e: React.FormEvent<HTMLFormElement>,
    plan: WorkoutPlanProps | UserWorkoutPlanProps
  ) => void;
  loading: boolean;
}) => {
  // Router hooks
  const router = useRouter();

  const { theme } = useTheme();
  const [tourRun, setTourRun] = useState(false);

  useEffect(() => {
    if (workoutPlanTourShown) return;
    const t = setTimeout(() => {
      workoutPlanTourShown = true;
      setTourRun(true);
    }, 500);
    return () => clearTimeout(t);
  }, []);

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
            <h4 className="font-medium text-neutral-600 dark:text-white/55">Recommanded plan</h4>
            <Image src="/stars.svg" height={20} width={20} alt="Stars icon" />
          </div>
          <div data-tour="wp-header" className="space-y-2">
            <div className="flex gap-3">
              <h1 className="font-bold text-xl lg:text-2xl dark:text-bone">{plan.title}</h1>
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
                          index < active ? "bg-custom-green dark:bg-lime" : "bg-neutral-300 dark:bg-ink-700"
                        }`}
                      />
                    </div>
                  );
                })}
            </div>
            <div className="bg-custom-green dark:bg-lime h-1 w-12"></div>
          </div>
          <p className="text-neutral-600 dark:text-white/55">{plan.desc}</p>
          <div data-tour="wp-days" className="flex flex-wrap gap-3">
            {plan.days
              .filter(
                (day, index, arr) =>
                  index === arr.findIndex((d) => d.name === day.name)
              )
              .map((day, index) => (
                <div
                  key={index}
                  className="border border-neutral-200 dark:border-white/10 rounded-lg p-4 w-[48%]"
                >
                  <h4 className="font-semibold dark:text-bone">{day.name}</h4>
                  <p className="text-neutral-600 dark:text-white/55 text-xs">{day.desc}</p>
                </div>
              ))}
            <p data-tour="wp-actions" className="font-medium">
              Not satisfied?{" "}
              <span
                onClick={() => setIndex("3")}
                className="font-bold text-custom-green dark:text-lime hover:text-lime-400 hover:cursor-pointer"
              >
                Create your own plan
              </span>{" "}
              or{" "}
              <span
                onClick={() => changeWorkout()}
                className="font-bold text-custom-green dark:text-lime hover:text-lime-400 hover:cursor-pointer"
              >
                keep looking
              </span>
            </p>
          </div>
          <button
            className="mt-8 flex items-center gap-2 justify-center py-2 rounded-xl hover:opacity-75 hover:transition ease-in-out duration-300 bg-black dark:bg-lime text-white dark:text-ink-950 w-full disabled:opacity-60 text-sm"
            type="submit"
            disabled={loading}
          >
            Select
            {loading && (
              <Image
                src="/loading.gif"
                width={25}
                height={25}
                alt="Loading gif"
              />
            )}
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
      {tourRun && (
        <Joyride
          steps={WORKOUT_PLAN_STEPS}
          run
          continuous
          scrollToFirstStep
          onEvent={(data: EventData) => {
            const { status, type } = data;
            if (status === STATUS.FINISHED || status === STATUS.SKIPPED || type === EVENTS.TARGET_NOT_FOUND) {
              setTourRun(false);
            }
          }}
          locale={{ back: "Back", close: "Close", last: "Got it", next: "Next", skip: "Skip" }}
          options={{
            primaryColor: "#AFF921",
            textColor: theme === "dark" ? "#F4F4F0" : "#2B2B2B",
            backgroundColor: theme === "dark" ? "#1f1f1f" : "#ffffff",
            arrowColor: theme === "dark" ? "#1f1f1f" : "#ffffff",
            overlayColor: theme === "dark" ? "rgba(0,0,0,0.55)" : "rgba(43,43,43,0.45)",
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
            tooltipTitle: { fontSize: 16, fontWeight: 700, margin: 0, marginBottom: 6 },
            tooltipContent: { fontSize: 14, padding: 6 },
            buttonPrimary: { backgroundColor: "#AFF921", color: "#2B2B2B", borderRadius: 12, padding: "8px 16px", fontWeight: 600 },
            buttonBack: { color: theme === "dark" ? "#F4F4F0" : "#2B2B2B", marginRight: 8 },
            buttonSkip: { color: theme === "dark" ? "rgba(255,255,255,0.55)" : "#797979" },
          }}
        />
      )}
    </div>
  );
};

export default WorkoutPlan;
