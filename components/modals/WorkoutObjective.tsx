"use client";
import {
  CreateWorkoutPlan,
  Modal,
  WorkoutFindingLoading,
  WorkoutPlan,
} from "@/components";
import CreateWorkoutObjective from "../dashboard/workout/CreateWorkoutObjective";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import {
  objectiveAlgorithmProps,
  userProgramProps,
  UserWorkoutPlanProps,
  WorkoutPlanProps,
} from "@/types";
import { workoutPlans } from "@/constant";
import { useFirebaseAuth } from "@/context/UserContext";
import { Slide, toast } from "react-toastify";

const WorkoutObjective = () => {
  // Hooks for navigation
  const searchParams = useSearchParams();
  const pathName = usePathname();
  const router = useRouter();

  // Loading state
  const [loading, setLoading] = useState(false);
  // Error state
  const [error, setError] = useState<string>();

  // Get the userId to set the objective
  const { user } = useFirebaseAuth();
  const userId = user?.uid;

  // Hooks for the workout plan
  const [workoutPlan, setworkoutPlan] = useState<WorkoutPlanProps>(
    workoutPlans[0]
  );

  // Hooks for the userWorkoutPlan
  const [userWorkoutPlan, setUserWorkoutPlan] = useState<userProgramProps>();

  // Hooks for the algorithm finding workout
  const [userCriteria, setUserCriteria] = useState<objectiveAlgorithmProps>({
    objective: "Lose",
    currentWeight: undefined,
    weightObjective: undefined,
    timeRange: 1,
    objectiveIntensity: "Low",
    experienceLevel: "Beginner",
  });

  // Get the params
  const index = searchParams.get("index") || "1";

  // Function to update the params state
  const updateParams = (newIndex: string) => {
    const params = new URLSearchParams(searchParams);

    // Set the new index
    if (newIndex) params.set("index", newIndex);

    // Redirect the route
    router.push(`${pathName}?${params.toString()}`, { scroll: false });
  };

  // Generate workout plan
  const generatePlan = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      // Prevent page reload
      e.preventDefault();
      // Activate the loading state
      setLoading(true);

      // The current best plan
      let bestPlan = workoutPlans[0];
      // The current score
      let bestScore = 0;

      // Loop through programs
      for (const plan of workoutPlans) {
        // Get the score for each plan
        const score = matchScore(plan, userCriteria);
        // Check if this is the best plan
        if (score > bestScore) {
          bestScore = score;
          bestPlan = plan;
        }
      }

      setworkoutPlan(bestPlan);
    } catch (error: any) {
    } finally {
      // Next page index
      updateParams("2");
      // Simulate a loading time for the ux
      setTimeout(() => {
        // Remove the loading state
        setLoading(false);
      }, 7000);
      console.log(JSON.stringify({ userCriteria }));
    }
  };

  // Function to add score for the best pointing results
  const matchScore = (
    plan: WorkoutPlanProps,
    criteria: objectiveAlgorithmProps
  ) => {
    // Score variable
    let score = 0;

    // Add score for the weight objective
    if (plan.categorie.includes(criteria.objective)) score += 5;

    // Add score for the intensity objective
    if (plan.intensity === criteria.objectiveIntensity) {
      score += 4;
    } else {
      const intensities = ["Low", "Moderate", "High"];
      // Get the plan intensity index
      const planIndex = intensities.indexOf(plan.intensity);
      // get the user intensity index
      const userIndex = intensities.indexOf(userCriteria.objectiveIntensity);
      // Calculate the difference
      const diff = Math.abs(planIndex - userIndex);
      if (diff === 1) score += 2;
    }

    // add score for the experience level
    if (plan.level.includes(criteria.experienceLevel)) {
      score += 5;
    } else {
      const experiences = ["Beginner", "Intermediate", "Advanced"];
      // Get the plan intensity index
      const planIndex = experiences.indexOf(plan.level);
      // get the user intensity index
      const userIndex = experiences.indexOf(userCriteria.experienceLevel);
      // Calculate the difference
      const diff = Math.abs(planIndex - userIndex);
      if (diff === 1) score += 2;
    }

    return score;
  };

  // Function to handle the error when submiting the forms
  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>,
    plan: WorkoutPlanProps | UserWorkoutPlanProps
  ) => {
    try {
      // Clear the errors
      setError("");
      // Prevent page reload
      e.preventDefault();
      // enable the loading animation
      setLoading(true);

      // Check if a user was found
      if (userId) {
        const res = await fetch(`/api/workouts?userid=${userId}`, {
          method: "POST",
          body: JSON.stringify({
            workoutPlan: plan,
            objectiveWeight: userCriteria.weightObjective,
            months: userCriteria.timeRange,
          }),
        });

        // Store the data
        const data = await res.json();
        if (!res.ok) {
          throw new Error(data.error);
        }

        // Closing the modal when the operation is done
        // Get the current params
        const currentParams = new URLSearchParams(window.location.search);
        // Delete the current param
        currentParams.delete("modal");
        // Push the router to the route without params
        router.replace(window.location.pathname);

        setTimeout(() => {
          // Notify the user
          toast.success("A new objective has been set!", {
            position: "bottom-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            transition: Slide,
          });
        }, 100);
      }

      // Disable the loading animation
      setLoading(false);
    } catch (error: any) {
      console.error(error);
      setError(error.message);
    }
  };

  return (
    <Modal backButton={index != "1"}>
      {index === "1" && loading != true && (
        <CreateWorkoutObjective
          objectiveAlgorithm={userCriteria}
          submit={generatePlan}
          setObjectiveAlgorithm={setUserCriteria}
        />
      )}
      {/** Handle the loading states */}
      {loading && <WorkoutFindingLoading />}
      {index === "2" && loading != true && (
        <WorkoutPlan
          plan={workoutPlan}
          setPlan={setworkoutPlan}
          setIndex={updateParams}
          submit={handleSubmit}
        />
      )}
      {index === "3" && <CreateWorkoutPlan submit={handleSubmit} />}
    </Modal>
  );
};

export default WorkoutObjective;
