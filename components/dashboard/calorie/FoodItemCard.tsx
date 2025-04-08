"use client";
import NutrientsCharts from "@/components/charts/NutrientsCharts";
import { useFirebaseAuth } from "@/context/UserContext";
import { foodItemCardProps, foodProps } from "@/types";
import { addFoodToConsumedList, capitalize, consumeFood } from "@/utils";
import { useRouter } from "next/navigation";
import { useState } from "react";

const FoodItemCard = ({ food }: foodItemCardProps) => {
  // Router hooks to handle navigation
  const router = useRouter();
  // Fetch the user
  const { user, isAdmin } = useFirebaseAuth();

  // States for the multiplier
  const [multiplier, setMultiplier] = useState(1);
  // states for the disablility of the button
  const [disableButton, setDisableButton] = useState(false);
  // States for the meal
  const [meal, setMeal] = useState<string>("");
  // States for error handling
  const [error, setError] = useState<boolean>(false);

  // The quantity change function
  const handleQuantityChange = (nb: number) => {
    if (!(nb < 0)) {
      // Check if the amount is 0
      if (nb === 0) {
        // Disable the button to prevent null value
        setDisableButton(true);
      } else {
        setDisableButton(false);
      }
      // Set the amount to the right number
      setMultiplier(nb);
    }
  };

  // THe function to add the food to the firestore
  const handleSubmit = async (food: foodProps, multiplier: number) => {
    if (meal) {
      // Remove the errors
      setError(false);
      try {
        if (user) {
          await consumeFood(food, user.uid, multiplier);
          await addFoodToConsumedList(meal, food, multiplier, user.uid);

          // Close the modal when the operation is done
          // Get the current params
          const currentParams = new URLSearchParams(window.location.search);
          // Delete the current param
          currentParams.delete("modal");
          // Push the router to the route without params
          router.replace(window.location.pathname);
        }
      } catch (error: any) {
        console.error(error.message);
      }
    } else {
      // Set an error handling for empty meal
      setError(true);
    }
  };

  return (
    // Grid container
    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-y-6 lg:gap-y-0 items-center justify-between py-5 border-neutral-300 border-t">
      {/** Food name */}
      <div className="text-lg w-40">
        <h3 className="font-semibold">{capitalize(food.Name)}</h3>
        <p>{(Math.round(food.Quantity * multiplier) || 0) + food.Unit}</p>
      </div>
      {/** Food calorie chart */}
      <div className="flex items-center space-x-4 justify-self-end sm:justify-self-auto">
        <NutrientsCharts
          Calories={Math.round(food.Calories * multiplier) || 0}
          Protein={Math.round(food.Protein * multiplier) || 0}
          Carbs={Math.round(food.Carbs * multiplier) || 0}
          Fat={Math.round(food.Fat * multiplier) || 0}
          size="h-20 w-auto"
          fontSize="text-lg"
        />
        <p>Calories</p>
      </div>
      {/** Food nutrient informations */}
      <div className="flex items-center gap-x-10 md:col-span-2 sm:justify-self-center">
        <div className="text-center">
          <h3 className="font-bold text-[#AFF921]">Protein</h3>
          <p>
            <span className="font-semibold">
              {Math.round(food.Protein * multiplier) || 0}
            </span>
            g
          </p>
        </div>
        <div className="text-center">
          <h3 className="font-bold text-[#73af00]">Carbs</h3>
          <p>
            <span className="font-semibold">
              {Math.round(food.Carbs * multiplier) || 0}
            </span>
            g
          </p>
        </div>
        <div className="text-center">
          <h3 className="font-bold text-[#d7ff8a]">Fat</h3>
          <p>
            <span className="font-semibold">
              {Math.round(food.Fat * multiplier) || 0}
            </span>
            g
          </p>
        </div>
      </div>
      {/** Food qty input */}
      <div className="flex space-x-4 lg:items-center sm:justify-self-auto lg:justify-self-end col-span-2">
        <div className="flex flex-col lg:items-center justify-self-end sm:justify-self-auto lg:justify-self-end">
          <h3 className="font-bold">Qty</h3>
          <input
            type="number"
            className="w-16 rounded-lg text-center"
            value={multiplier || 0}
            onChange={(e) => handleQuantityChange(e.target.valueAsNumber)}
          />
        </div>
        {/** Meal input */}
        <div className="flex flex-col lg:items-center justify-self-end sm:justify-self-auto lg:justify-self-end">
          <h3 className="font-bold">Meal</h3>
          <select
            value={meal}
            className={`w-fit rounded-lg ${
              error && ` border-4 border-red-400`
            }`}
            onChange={(e) => {
              setMeal(e.target.value);
              setError(false);
            }}
          >
            <option disabled defaultChecked></option>
            <option value="Breakfast">Breakfast</option>
            <option value="Lunch">Lunch</option>
            <option value="Diner">Diner</option>
            <option value="Snack">Snack</option>
          </select>
        </div>
      </div>
      {/** Add button */}
      <button
        className="disabled:opacity-50 bg-black text-white rounded-xl text-2xl h-10 lg:h-16 w-full lg:w-12 col-span-2 sm:col-span-3 md:col-span-4 lg:col-span-1 lg:justify-self-end"
        onClick={() => handleSubmit(food, multiplier)}
        disabled={disableButton}
      >
        +
      </button>
    </div>
  );
};

export default FoodItemCard;
