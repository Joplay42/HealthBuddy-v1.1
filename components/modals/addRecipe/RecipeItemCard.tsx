"use client";
import NutrientsCharts from "@/components/charts/NutrientsCharts";
import { useFirebaseAuth } from "@/context/UserContext";
import { macronutrients, recipeProps } from "@/types";
import { addRecipeToConsumedList, capitalize, consumeFood } from "@/utils";
import { useRouter } from "next/navigation";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import Image from "next/image";
import { Slide, toast } from "react-toastify";

const RecipeItemCard = ({
  recipe,
  setConsumedLoading,
}: {
  recipe: recipeProps;
  setConsumedLoading: Dispatch<SetStateAction<boolean>>;
}) => {
  // Router hooks to handle navigation
  const router = useRouter();
  // Fetch the user
  const { user, isAdmin } = useFirebaseAuth();
  // The recipe macros
  const [macros, setMacros] = useState<macronutrients>(recipe.macronutrients);

  // States for the multiplier
  const [multiplier, setMultiplier] = useState(1);
  // states for the disablility of the button
  const [disableButton, setDisableButton] = useState(false);
  // States for the meal
  const [meal, setMeal] = useState<string>("");
  // States for error handling
  const [error, setError] = useState<boolean>(false);

  // UseEffect to set the right macros with the amount of servings
  useEffect(() => {
    setMacros({
      Calories: recipe.macronutrients.Calories / recipe.NbServing,
      Protein: recipe.macronutrients.Protein / recipe.NbServing,
      Carbs: recipe.macronutrients.Carbs / recipe.NbServing,
      Fat: recipe.macronutrients.Fat / recipe.NbServing,
    });
  }, [recipe, multiplier]);

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
  const handleSubmit = async (macros: macronutrients, multiplier: number) => {
    if (meal) {
      // Remove the errors
      setError(false);
      try {
        setConsumedLoading(true);
        if (user) {
          await consumeFood(macros, user.uid, multiplier);
          await addRecipeToConsumedList(
            meal,
            recipe,
            macros,
            multiplier,
            user.uid
          );

          // Close the modal when the operation is done
          // Get the current params
          const currentParams = new URLSearchParams(window.location.search);
          // Delete the current param
          currentParams.delete("modal");
          // Push the router to the route without params
          router.replace(window.location.pathname);

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

  // Function to handle the item deletion
  const handleDeletion = async () => {
    setDisableButton(true);
    // Error handling
    try {
      // Call the api DELETE method
      const res = await fetch(
        `/api/foods/recipes?userid=${user?.uid}&del=${recipe.Id}`,
        {
          method: "DELETE",
        }
      );

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error);
      }
    } catch (error: any) {
      console.error("Error deleting the item: ", error);
    } finally {
      setDisableButton(false);
    }
  };

  return (
    // Grid container
    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-y-6 lg:gap-y-0 items-center justify-between py-5 border-neutral-300 border-t animate-fade-in">
      {/** Food name */}
      <div className="text-lg w-40">
        <h3 className="font-semibold line-clamp-3">
          {capitalize(recipe.Name)}
        </h3>
        <p>1 portion</p>
      </div>
      {/** Food calorie chart */}
      <div className="flex items-center space-x-4 justify-self-end sm:justify-self-auto">
        <NutrientsCharts
          Calories={Math.round(macros.Calories * multiplier) || 0}
          Protein={Math.round(macros.Protein * multiplier) || 0}
          Carbs={Math.round(macros.Carbs * multiplier) || 0}
          Fat={Math.round(macros.Fat * multiplier) || 0}
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
              {Math.round(macros.Protein * multiplier) || 0}
            </span>
            g
          </p>
        </div>
        <div className="text-center">
          <h3 className="font-bold text-[#73af00]">Carbs</h3>
          <p>
            <span className="font-semibold">
              {Math.round(macros.Carbs * multiplier) || 0}
            </span>
            g
          </p>
        </div>
        <div className="text-center">
          <h3 className="font-bold text-[#d7ff8a]">Fat</h3>
          <p>
            <span className="font-semibold">
              {Math.round(macros.Fat * multiplier) || 0}
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
      <div className="flex items-center space-x-4 h-10 lg:h-16 w-full lg:w-32 col-span-2 sm:col-span-3 md:col-span-4 lg:col-span-1 lg:justify-self-end">
        <button
          onClick={() =>
            router.push(`?modal=editrecipe&index=1&recipeId=${recipe.Id}`, {
              scroll: false,
            })
          }
        >
          <Image src={"/edit.svg"} height={30} width={30} alt="Delete icon" />
        </button>
        <button onClick={handleDeletion}>
          <Image src={"/trash.svg"} height={30} width={30} alt="Delete icon" />
        </button>
        <button
          className="disabled:opacity-50 bg-black text-white rounded-xl text-2xl h-10 lg:h-16 w-full lg:w-12 col-span-2 sm:col-span-3 md:col-span-4 lg:col-span-1 lg:justify-self-end"
          onClick={() => handleSubmit(macros, multiplier)}
          disabled={disableButton}
        >
          +
        </button>
      </div>
    </div>
  );
};

export default RecipeItemCard;
