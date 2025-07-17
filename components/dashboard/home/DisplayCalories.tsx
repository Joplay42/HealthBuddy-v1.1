"use client";
import { BarChart, PieChart, CalorieSqueleton } from "@/components";
import { useUserInformationContext } from "@/context/UserInformationContext";
import Image from "next/image";
import { useRouter } from "next/navigation";

const DisplayCalories = () => {
  // Fetch the userGoal and info
  const { userGoal, userCalorieInfo, loading } = useUserInformationContext();
  // Router hooks to manage the navigation
  const router = useRouter();

  // Display the skeleton is it is loading
  if (loading) {
    return <CalorieSqueleton />;
  }

  // Display a text to set an objective if the user doesnt have one
  if (userGoal.calorie === 0 && !loading) {
    return (
      <div className="py-16">
        <h1 className="text-3xl font-bold text-center">
          Welcome to <span className="text-custom-green">HealthBuddy</span>{" "}
          calorie tracker!
          <span className="text-5xl"> 🎉</span>
        </h1>
        <div className="flex justify-center mt-5">
          <button
            className="w-fit bg-black text-white px-5 py-2 rounded-2xl text-center hover:opacity-75"
            // Open the modal
            onClick={() =>
              router.push("/dashboard?modal=objective", {
                scroll: false,
              })
            }
          >
            Set objective
          </button>
        </div>
      </div>
    );
  }

  const caloriesConsumed = userCalorieInfo.calorie;
  const caloriesRemaining = userGoal.calorie - userCalorieInfo.calorie;

  return (
    <div className="flex flex-wrap justify-between items-center gap-x-6">
      <div className="flex flex-wrap gap-8 items-center">
        <div className="w-60 h-auto relative">
          {/** Chart component to display the calorie consumed and remaining */}
          <PieChart data={caloriesConsumed} remaining={caloriesRemaining} />
          <div className="absolute bottom-1/2 right-1/2 translate-x-1/2 translate-y-1/2 text-center">
            {/** Display of the calorie remaining */}
            <h1 className="font-bold text-4xl">{caloriesRemaining}</h1>
            <p>Remaining</p>
          </div>
        </div>
        <div className="flex flex-wrap gap-6 py-6 lg:flex-col lg:space-y-4">
          <div className="flex space-x-1">
            {/** Display of the calorie objective */}
            <Image src="/flag.svg" width={25} height={25} alt="flag icon" />
            <p className="font-light text-lg">
              Objective :{" "}
              <span className="font-extrabold text-neutral-600 text-xl">
                {userGoal.calorie}
              </span>
            </p>
          </div>
          <div className="flex space-x-1">
            {/** Display of the calories */}
            <Image src="/fork.svg" width={25} height={25} alt="flag icon" />
            <p className="font-light text-lg">
              Consumed :{" "}
              <span className="font-extrabold text-neutral-600 text-xl">
                {userCalorieInfo.calorie}
              </span>
            </p>
          </div>
        </div>
      </div>
      <div className="flex flex-col w-full 2xl:w-96">
        {/** BarChart component to display the amount of nutrients */}
        <BarChart data={userCalorieInfo} goal={userGoal} nutrient="protein" />
        <BarChart data={userCalorieInfo} goal={userGoal} nutrient="carbs" />
        <BarChart data={userCalorieInfo} goal={userGoal} nutrient="fat" />
      </div>
    </div>
  );
};

export default DisplayCalories;
