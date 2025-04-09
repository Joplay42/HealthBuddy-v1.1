"use client";
import NutrientsCharts from "@/components/charts/NutrientsCharts";
import { useFirebaseAuth } from "@/context/UserContext";
import { foodItemCardProps, foodProps } from "@/types";
import { addFoodToConsumedList, capitalize, consumeFood } from "@/utils";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Slide, toast } from "react-toastify";

const FoodItemCard = ({ food, setConsumedLoading }: foodItemCardProps) => {
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
        setConsumedLoading(true);
        if (user) {
          // Close the modal when the operation is done
          // Get the current params
          const currentParams = new URLSearchParams(window.location.search);
          // Delete the current param
          currentParams.delete("modal");
          // Push the router to the route without params
          router.replace(window.location.pathname);
          await consumeFood(food, user.uid, multiplier);
          await addFoodToConsumedList(meal, food, multiplier, user.uid);

          setTimeout(() => {
            // Notify the user
            toast.success("Food has been consumed!", {
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
      } catch (error: any) {
        console.error(error.message);
      } finally {
        setConsumedLoading(false);
      }
    } else {
      // Set an error handling for empty meal
      setError(true);
    }
  };

  return (
    // Grid container
    <div className="flex flex-wrap items-center justify-center sm:justify-between gap-6 md:gap-4 py-5 border-neutral-300 border-t animate-fade-in">
      {/** Food name */}
      <div className="text-md md:text-lg w-full md:w-40">
        <h3 className="font-semibold line-clamp-3">{capitalize(food.Name)}</h3>
        <h3>{capitalize(food.Brand)}</h3>
        <p>{(Math.round(food.Quantity * multiplier) || 0) + " " + food.Unit}</p>
      </div>
      {/** Food calorie chart */}
      <div className="flex items-center space-x-4">
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
      <div className="flex items-center space-x-10 justify-self-end sm:space-x-4">
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
      <div className="flex space-x-4 lg:items-center">
        <div className="flex flex-col lg:items-center justify-self-end sm:justify-self-auto lg:justify-self-end">
          <h3 className="font-bold">Qty</h3>
          <input
            type="number"
            className="w-10 h-8 md:h-auto md:w-16 rounded-lg text-center"
            value={multiplier || 0}
            onChange={(e) => handleQuantityChange(e.target.valueAsNumber)}
          />
        </div>
        {/** Meal input */}
        <div className="flex flex-col lg:items-center justify-self-end sm:justify-self-auto lg:justify-self-end">
          <h3 className="font-bold">Meal</h3>
          <select
            value={meal}
            className={`w-fit rounded-lg h-8 md:h-auto ${
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
