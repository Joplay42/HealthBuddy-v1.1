// Props imports
import { ObjectiveCardProps } from "@/types";
// Utils function imports
import { calculateNutriantDaily } from "@/utils";

/**
 * This component is used to display the nutrient objective and the remaining
 * of it.
 *
 * @param goal the user goal for the calories and nutrient
 * @param data the user data for the calories and nutrient
 * @param nutrient the nutrient type
 * @returns
 */
const ObjectiveCard = ({ goal, data, nutrient }: ObjectiveCardProps) => {
  return (
    <div className="grid grid-cols-2 md:block items-center">
      {/** The name of the nutrient */}
      <h2 className="font-semibold capitalize dark:text-bone">{nutrient} :</h2>
      <p className="font-light dark:text-white/55">
        <span className="font-medium text-green dark:text-lime text-3xl">
          {Math.round(data[nutrient])}
        </span>
        {"g / "}
        {/** Utils function to calculate the amount of nutrient daily */}
        {calculateNutriantDaily({
          dailyCalories: goal.calorie,
          nutrientPercentage: goal[nutrient],
          nutrientType: nutrient,
        })}
        g
      </p>
    </div>
  );
};

export default ObjectiveCard;
