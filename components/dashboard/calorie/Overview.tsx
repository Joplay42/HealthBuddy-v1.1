// Props import
import { overViewProps } from "@/types";
// Components imports
import { CalorieSqueleton, OverviewSqueleton, PieChart } from "@/components";
// NextJs image imports
import Image from "next/image";
// Utils function imports
import { calculateNutriantDaily } from "@/utils";

/**
 * This component is used to display the overview information of the user
 * goals and data.
 *
 * @param goal the goals of the user
 * @param data the data of the user
 * @returns
 */
const Overview = ({ goal, data, loading }: overViewProps) => {
  // Calories consumed and remaining
  const caloriesConsumed = data.calorie;
  const caloriesRemaining = goal.calorie - data.calorie;

  if (loading) {
    return <OverviewSqueleton />;
  }

  return (
    // The card container
    <div className="bg-white p-5 rounded-3xl border border-neutral-400">
      {/** The title */}
      <h1 className="font-bold text-xl mb-10">Overview</h1>
      <div className="flex flex-wrap items-center justify-between gap-10">
        <div className="flex flex-wrap items-center gap-x-8">
          {/** Calories display */}
          <div className="w-60 h-auto relative">
            {/** Chart to display the calories */}
            <PieChart data={caloriesConsumed} remaining={caloriesRemaining} />
            {/** Display of the remaining calories */}
            <div className="absolute bottom-1/2 right-1/2 translate-x-1/2 translate-y-1/2 text-center">
              <h1 className="font-bold text-4xl">{caloriesRemaining}</h1>
              <p>Remaining</p>
            </div>
          </div>
          {/** Display of the objective and the consumed */}
          <div className="flex flex-wrap gap-6 py-6 lg:flex-col lg:space-y-4">
            <div className="flex space-x-1">
              {/** The objective data */}
              <Image src="/flag.svg" width={25} height={25} alt="flag icon" />
              <p className="font-light text-lg">
                Objective :{" "}
                <span className="font-extrabold text-neutral-600 text-xl">
                  {goal.calorie}
                </span>
              </p>
            </div>
            <div className="flex space-x-1">
              {/** The consumed data */}
              <Image src="/fork.svg" width={25} height={25} alt="flag icon" />
              <p className="font-light text-lg">
                Consumed :{" "}
                <span className="font-extrabold text-neutral-600 text-xl">
                  {data.calorie}
                </span>
              </p>
            </div>
          </div>
        </div>
        {/** Display of the nutrient */}
        <div className="flex flex-wrap items-center gap-10">
          {/** Protein */}
          <div className="w-28 h-auto relative">
            <h1 className="font-bold text-xl absolute -top-8 right-1/2 translate-x-1/2">
              Protein
            </h1>
            {/** Chart component to display the informations */}
            <PieChart
              data={data.protein}
              remaining={
                calculateNutriantDaily({
                  dailyCalories: goal.calorie,
                  nutrientPercentage: goal.protein,
                  nutrientType: "protein",
                }) - data.protein
              }
            />
            <div className="absolute bottom-1/2 right-1/2 translate-x-1/2 translate-y-1/2">
              <h1 className="font-bold text-2xl">
                {Math.round(data.protein)}
                <span className="font-normal text-xl">g</span>
              </h1>
            </div>
          </div>
          {/** Carbs */}
          <div className="w-28 h-auto relative">
            <h1 className="font-bold text-xl absolute -top-8 right-1/2 translate-x-1/2">
              Carbs
            </h1>
            {/** Chart component to display the informations */}
            <PieChart
              data={data.carbs}
              remaining={
                calculateNutriantDaily({
                  dailyCalories: goal.calorie,
                  nutrientPercentage: goal.carbs,
                  nutrientType: "carbs",
                }) - data.carbs
              }
            />
            <div className="absolute bottom-1/2 right-1/2 translate-x-1/2 translate-y-1/2">
              <h1 className="font-bold text-2xl">
                {Math.round(data.carbs)}
                <span className="font-normal text-xl">g</span>
              </h1>
            </div>
          </div>
          {/** Fat */}
          <div className="w-28 h-auto relative">
            <h1 className="font-bold text-xl absolute -top-8 right-1/2 translate-x-1/2">
              Fat
            </h1>
            {/** Chart component to display the informations */}
            <PieChart
              data={data.fat}
              remaining={
                calculateNutriantDaily({
                  dailyCalories: goal.calorie,
                  nutrientPercentage: goal.fat,
                  nutrientType: "fat",
                }) - data.fat
              }
            />
            <div className="absolute bottom-1/2 right-1/2 translate-x-1/2 translate-y-1/2">
              <h1 className="font-bold text-2xl">
                {Math.round(data.fat)}
                <span className="font-normal text-xl">g</span>
              </h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Overview;
