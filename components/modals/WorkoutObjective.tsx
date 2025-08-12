"use client";
import { Modal, WorkoutFindingLoading, WorkoutPlan } from "@/components";
import CreateWorkoutObjective from "../dashboard/workout/CreateWorkoutObjective";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { objectiveAlgorithmProps, WorkoutPlanProps } from "@/types";
import { workoutPlans } from "@/constant";

const WorkoutObjective = () => {
  // Hooks for navigation
  const searchParams = useSearchParams();
  const pathName = usePathname();
  const router = useRouter();

  // Loading state
  const [loading, setLoading] = useState(false);

  // Hooks for the workout plan
  const [workoutPlan, setworkoutPlan] = useState<WorkoutPlanProps>(
    workoutPlans[0]
  );

  // Hooks for the algorithm finding workout
  const [userCriteria, setUserCriteria] = useState<objectiveAlgorithmProps>({
    weightObjective: "Lose",
    weightNumber: undefined,
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
    if (plan.categorie.includes(criteria.weightObjective)) score += 5;

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
      {index === "2" && loading != true && <WorkoutPlan plan={workoutPlan} />}
    </Modal>
  );
};

export default WorkoutObjective;
