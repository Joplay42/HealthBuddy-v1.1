"use client";
import { Modal, WorkoutFindingLoading, WorkoutPlan } from "@/components";
import CreateWorkoutObjective from "../dashboard/workout/CreateWorkoutObjective";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { objectiveAlgorithmProps } from "@/types";

const WorkoutObjective = () => {
  // Hooks for navigation
  const searchParams = useSearchParams();
  const pathName = usePathname();
  const router = useRouter();

  // Hooks for the algorithm finding workout
  const [objective, setObjective] = useState<objectiveAlgorithmProps>({
    weightObjective: 0,
    weightNumber: undefined,
    timeRange: 0,
    objectiveIntensity: 0,
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

  return (
    <Modal backButton={index != "1"}>
      {index === "1" && (
        <CreateWorkoutObjective
          objectiveAlgorithm={objective}
          setObjectiveAlgorithm={setObjective}
          setIndex={updateParams}
        />
      )}
      {/** Handle the loading states */}
      {/** <WorkoutFindingLoading/> */}
      {index === "2" && <WorkoutPlan />}
    </Modal>
  );
};

export default WorkoutObjective;
