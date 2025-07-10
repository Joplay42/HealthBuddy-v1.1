"use client";
import NutrientsCharts from "@/components/charts/NutrientsCharts";
import { useFirebaseAuth } from "@/context/UserContext";
import {
  foodCardProps,
  foodItemFetchedProps,
  foodProps,
  macronutrients,
  recipeProps,
} from "@/types";
import {
  addFoodToConsumedList,
  capitalize,
  consumeFood,
  getNutrient,
  isFoodItem,
  isFoodItemFetched,
  isFoodItemRecipe,
} from "@/utils";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import Image from "next/image";
import { Slide, toast } from "react-toastify";

const FoodCard = ({ item, setConsumedLoading }: foodCardProps) => {
  // Router hooks to handle navigation
  const router = useRouter();
  // Fetch the user
  const { user } = useFirebaseAuth();

  // States for the multiplier
  const [multiplier, setMultiplier] = useState(1);
  // states for the disablility of the button
  const [disableButton, setDisableButton] = useState(false);
  // States for the meal
  const [meal, setMeal] = useState<string>("");
  // State for the portions
  const [portion, setPortion] = useState<number>(0);
  // States for error handling
  const [error, setError] = useState<boolean>(false);

  // The quantity change function
  const handleQuantityChange = (nb: number) => {
    // Set the amount to the right number
    setMultiplier(nb);
    // Disable the button if 0 or negative number
    if (nb <= 0) {
      setMultiplier(0);
      setDisableButton(true);
    } else if (Number.isNaN(nb)) {
      setDisableButton(true);
    } else {
      setDisableButton(false);
    }
  };

  // Function to delete item with the type
  const handleDeletion = async () => {
    setDisableButton(true);
    // Error handling
    try {
      let res = new Response();
      if (isFoodItemRecipe(item)) {
        // Call the recipe api DELETE method
        res = await fetch(
          `/api/foods/recipes?userid=${user?.uid}&del=${item.Id}`,
          {
            method: "DELETE",
          }
        );
      } else if (isFoodItem(item)) {
        // Call the library api DELETE method
        const res = await fetch(
          `/api/foods?userid=${user?.uid}&del=${item.Id}`,
          {
            method: "DELETE",
          }
        );
      }

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

  // The function to add the food to the firestore
  const handleSubmit = async (
    item: foodItemFetchedProps | recipeProps | foodProps,
    multiplier: number
  ) => {
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

          // Convert macronutrients
          const parsedMacros: macronutrients = {
            Calories: getNutrient(item, "Calories", portion),
            Carbs: getNutrient(item, "Carbs", portion),
            Protein: getNutrient(item, "Protein", portion),
            Fat: getNutrient(item, "Fat", portion),
          };

          // Convert into foodProps
          const parsedFood: foodProps = {
            Name: item.Name,
            Brand: isFoodItemRecipe(item) ? "" : item.Brand,
            Quantity: isFoodItemFetched(item)
              ? item.portions[portion].Quantity
              : isFoodItemRecipe(item)
              ? 1
              : item.Quantity,
            Unit: isFoodItemFetched(item)
              ? item.portions[portion].Unit
              : isFoodItemRecipe(item)
              ? "portion"
              : item.Unit,
            Calories: getNutrient(item, "Calories", portion),
            Protein: getNutrient(item, "Protein", portion),
            Carbs: getNutrient(item, "Carbs", portion),
            Fat: getNutrient(item, "Fat", portion),
          };

          await consumeFood(parsedMacros, user.uid, multiplier);
          await addFoodToConsumedList(meal, parsedFood, multiplier, user.uid);

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
        <h3 className="font-semibold line-clamp-3">{capitalize(item.Name)}</h3>
        {/** Display the food brand if it is not a recipe */}
        {!isFoodItemRecipe(item) && <h3>{capitalize(item.Brand)}</h3>}
        {/** Display the portion */}
        {isFoodItemRecipe(item) ? (
          <p>1 portion</p>
        ) : (
          // Only display portions if the item is fetched
          isFoodItemFetched(item) && (
            <select
              className={`w-fit rounded-lg md:h-auto `}
              onChange={(e) => {
                const selectedIndex = parseInt(e.target.value);
                setPortion(selectedIndex);
              }}
            >
              {item.portions.map((portion, index) => (
                <option key={index} value={index}>
                  {portion.Unit +
                    " (" +
                    (Math.round(portion.Quantity * multiplier) || 0) +
                    "g)"}
                </option>
              ))}
            </select>
          )
        )}
      </div>
      {/** Food calorie chart */}
      <div className="flex items-center space-x-4">
        <NutrientsCharts
          Calories={
            Math.round(
              (isFoodItemRecipe(item)
                ? getNutrient(item, "Calories", portion) / item.NbServing
                : getNutrient(item, "Calories", portion)) * multiplier
            ) || 0
          }
          Protein={
            Math.round(
              (isFoodItemRecipe(item)
                ? getNutrient(item, "Protein", portion) / item.NbServing
                : getNutrient(item, "Protein", portion)) * multiplier
            ) || 0
          }
          Carbs={
            Math.round(
              (isFoodItemRecipe(item)
                ? getNutrient(item, "Carbs", portion) / item.NbServing
                : getNutrient(item, "Carbs", portion)) * multiplier
            ) || 0
          }
          Fat={
            Math.round(
              (isFoodItemRecipe(item)
                ? getNutrient(item, "Fat", portion) / item.NbServing
                : getNutrient(item, "Fat", portion)) * multiplier
            ) || 0
          }
          Empty={disableButton}
          size="max-h-20 w-auto"
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
              {Math.round(
                (isFoodItemRecipe(item)
                  ? getNutrient(item, "Protein", portion) / item.NbServing
                  : getNutrient(item, "Protein", portion)) * multiplier
              ) || 0}
            </span>
            g
          </p>
        </div>
        <div className="text-center">
          <h3 className="font-bold text-[#73af00]">Carbs</h3>
          <p>
            <span className="font-semibold">
              {Math.round(
                (isFoodItemRecipe(item)
                  ? getNutrient(item, "Carbs", portion) / item.NbServing
                  : getNutrient(item, "Carbs", portion)) * multiplier
              ) || 0}
            </span>
            g
          </p>
        </div>
        <div className="text-center">
          <h3 className="font-bold text-[#d7ff8a]">Fat</h3>
          <p>
            <span className="font-semibold">
              {Math.round(
                (isFoodItemRecipe(item)
                  ? getNutrient(item, "Fat", portion) / item.NbServing
                  : getNutrient(item, "Fat", portion)) * multiplier
              ) || 0}
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
            step=".1"
            className="w-16 h-auto md:w-20 rounded-lg text-center"
            value={multiplier || NaN}
            onChange={(e) => handleQuantityChange(e.target.valueAsNumber)}
          />
        </div>
        {/** Remove if selectable */}

        <div className="flex flex-col lg:items-center justify-self-end sm:justify-self-auto lg:justify-self-end">
          <h3 className="font-bold">Meal</h3>
          <select
            value={meal}
            className={`w-fit rounded-lg h-auto ${
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
      <div className="flex items-center space-x-4 h-10 lg:h-16 w-full lg:w-32 col-span-2 sm:col-span-3 md:col-span-4 lg:col-span-1 lg:justify-self-end lg:justify-end">
        {/** Edit and delete recipes only if recipe */}
        {isFoodItemRecipe(item) && (
          <>
            <button
              onClick={() =>
                router.push(`?modal=editrecipe&index=1&recipeId=${item.Id}`, {
                  scroll: false,
                })
              }
            >
              <Image
                src={"/edit.svg"}
                height={30}
                width={30}
                alt="Delete icon"
              />
            </button>
            <button onClick={handleDeletion}>
              <Image
                src={"/trash.svg"}
                height={30}
                width={30}
                alt="Delete icon"
              />
            </button>
          </>
        )}
        {/** Delete button only if library item */}
        {isFoodItem(item) && (
          <button onClick={handleDeletion}>
            <Image
              src={"/trash.svg"}
              height={30}
              width={30}
              alt="Delete icon"
            />
          </button>
        )}
        <button
          className="disabled:opacity-50 bg-black text-white rounded-xl text-2xl h-10 lg:h-16 w-full lg:w-12 col-span-2 sm:col-span-3 md:col-span-4 lg:col-span-1 lg:justify-self-end"
          onClick={() => handleSubmit(item, multiplier)}
          disabled={disableButton}
        >
          +
        </button>
      </div>
    </div>
  );
};

export default FoodCard;
