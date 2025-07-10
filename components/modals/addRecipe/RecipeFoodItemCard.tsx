"use client";
import NutrientsCharts from "@/components/charts/NutrientsCharts";
import { foodItemFetchedProps, foodProps } from "@/types";
import { capitalize } from "@/utils";
import { useRouter } from "next/navigation";
import React, { ChangeEvent, useEffect, useState } from "react";

const RecipeFoodItemCard = ({
  food,
  action,
}: {
  food: foodItemFetchedProps;
  action: (updatedData: foodProps) => void;
}) => {
  // Food states
  const [foodItem, setFoodItem] = useState<foodItemFetchedProps>(food);
  // Multiplier state
  const [multiplier, setMultiplier] = useState(food.multiplier ?? 1);
  // states for the disablility of the button
  const [disableButton, setDisableButton] = useState(false);
  // Router hooks to handle the navigation
  const router = useRouter();
  // State for the portions
  const [portion, setPortion] = useState<number>(0);

  // UseEffect to set the states of the food
  useEffect(() => {
    setFoodItem(food);
  }, [food]);

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

  // Handle the addition to the list food
  const handleSubmit = () => {
    // Convert food item
    const parsedFood: foodProps = {
      Id: foodItem.Id,
      Brand: foodItem.Brand,
      Name: foodItem.Name,
      multiplier: multiplier,
      Quantity: foodItem.portions[portion].Quantity * multiplier,
      Unit: foodItem.portions[portion].Unit,
      Calories: foodItem.portions[portion].Calories * multiplier,
      Protein: foodItem.portions[portion].Protein * multiplier,
      Carbs: foodItem.portions[portion].Carbs * multiplier,
      Fat: foodItem.portions[portion].Fat * multiplier,
    };
    action(parsedFood);
    // Get the current params
    const currentParams = new URLSearchParams(window.location.search);
    // Delete the current param
    currentParams.delete("term");
    currentParams.delete("search");
    // Push the router to the route without params
    router.replace(window.location.pathname + "?" + currentParams);
  };

  return (
    // Grid container
    <div className="flex flex-wrap items-center justify-center sm:justify-between gap-6 md:gap-4 py-5 border-neutral-300 border-t animate-fade-in">
      {/** Food name */}
      <div className="text-md md:text-lg w-full md:w-40">
        <h3 className="font-semibold line-clamp-3">
          {capitalize(foodItem.Name)}
        </h3>
        <h3>{capitalize(food.Brand)}</h3>
        <select
          className={`w-fit rounded-lg h-8 md:h-auto `}
          onChange={(e) => {
            const selectedIndex = parseInt(e.target.value);
            setPortion(selectedIndex);
          }}
        >
          {food.portions.map((portion, index) => (
            <option key={index} value={index}>
              {portion.Unit +
                " (" +
                (Math.round(portion.Quantity * multiplier) || 0) +
                "g)"}
            </option>
          ))}
        </select>
      </div>
      {/** Food calorie chart */}
      <div className="flex items-center space-x-4">
        <NutrientsCharts
          Calories={
            Math.round(foodItem.portions[portion].Calories * multiplier) || 0
          }
          Protein={
            Math.round(foodItem.portions[portion].Protein * multiplier) || 0
          }
          Carbs={Math.round(foodItem.portions[portion].Carbs * multiplier) || 0}
          Fat={Math.round(foodItem.portions[portion].Fat * multiplier) || 0}
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
              {Math.round(foodItem.portions[portion].Protein * multiplier) || 0}
            </span>
            g
          </p>
        </div>
        <div className="text-center">
          <h3 className="font-bold text-[#73af00]">Carbs</h3>
          <p>
            <span className="font-semibold">
              {Math.round(foodItem.portions[portion].Carbs * multiplier) || 0}
            </span>
            g
          </p>
        </div>
        <div className="text-center">
          <h3 className="font-bold text-[#d7ff8a]">Fat</h3>
          <p>
            <span className="font-semibold">
              {Math.round(foodItem.portions[portion].Fat * multiplier) || 0}
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
            value={multiplier}
            onChange={(e) => handleQuantityChange(e.target.valueAsNumber)}
          />
        </div>
      </div>
      {/** Add button */}
      <button
        className="disabled:opacity-50 bg-black text-white rounded-xl text-2xl h-10 lg:h-16 w-full lg:w-12 col-span-2 md:col-span-3 lg:col-span-1 lg:justify-self-end"
        onClick={handleSubmit}
        disabled={disableButton}
      >
        +
      </button>
    </div>
  );
};

export default RecipeFoodItemCard;
