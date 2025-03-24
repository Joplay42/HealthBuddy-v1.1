"use client";
import NutrientsCharts from "@/components/charts/NutrientsCharts";
import { foodProps } from "@/types";
import { useRouter } from "next/navigation";
import React, { ChangeEvent, useEffect, useState } from "react";

const RecipeFoodItemCard = ({
  food,
  action,
}: {
  food: foodProps;
  action: (updatedData: foodProps) => void;
}) => {
  // Food states
  const [foodItem, setFoodItem] = useState<foodProps>(food);
  // Multiplier state
  const [multiplier, setMultiplier] = useState(food.multiplier ?? 1);
  // Router hooks to handle the navigation
  const router = useRouter();

  // UseEffect to set the states of the food
  useEffect(() => {
    setFoodItem(food);
  }, [food]);

  // Handle multiplication
  const handleAmountChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newMultiplier = e.target.valueAsNumber;
    if (newMultiplier > 0) {
      setMultiplier(newMultiplier);
      setFoodItem((prevFood) => ({
        ...prevFood,
        multiplier: newMultiplier,
        Quantity: (prevFood.Quantity / multiplier) * newMultiplier,
        Calories: (prevFood.Calories / multiplier) * newMultiplier,
        Protein: (prevFood.Protein / multiplier) * newMultiplier,
        Carbs: (prevFood.Carbs / multiplier) * newMultiplier,
        Fat: (prevFood.Fat / multiplier) * newMultiplier,
      }));
    }
  };

  // Handle the addition to the list food
  const handleSubmit = () => {
    action(foodItem);
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
    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-y-6 lg:gap-y-0 items-center justify-between py-5 border-neutral-300 border-t">
      {/** Food name */}
      <div className="text-lg w-40">
        <h3 className="font-semibold">{foodItem.Name.toLocaleLowerCase()}</h3>
        <p>{(foodItem.Quantity || 0) + " " + foodItem.Unit}</p>
      </div>
      {/** Food calorie chart */}
      <div className="flex items-center space-x-4 justify-self-auto">
        <NutrientsCharts
          Calories={foodItem.Calories || 0}
          Protein={foodItem.Protein || 0}
          Carbs={foodItem.Carbs || 0}
          Fat={foodItem.Fat || 0}
          size="h-20 w-auto"
          fontSize="text-lg"
        />
        <p>Calories</p>
      </div>
      {/** Food nutrient informations */}
      <div className="flex items-center justify-between md:gap-x-10 col-span-1 md:col-span-2 md:justify-self-center">
        <div className="text-center">
          <h3 className="font-bold text-[#AFF921]">Protein</h3>
          <p>
            <span className="font-semibold">{foodItem.Protein || 0}</span>g
          </p>
        </div>
        <div className="text-center">
          <h3 className="font-bold text-[#73af00]">Carbs</h3>
          <p>
            <span className="font-semibold">{foodItem.Carbs || 0}</span>g
          </p>
        </div>
        <div className="text-center">
          <h3 className="font-bold text-[#d7ff8a]">Fat</h3>
          <p>
            <span className="font-semibold">{foodItem.Fat || 0}</span>g
          </p>
        </div>
      </div>
      {/** Food qty input */}
      <div className="flex space-x-4 lg:items-center justify-self-center md:justify-self-start lg:justify-self-center">
        <div className="flex flex-col lg:items-center justify-self-end sm:justify-self-auto lg:justify-self-end">
          <h3 className="font-bold">Qty</h3>
          <input
            type="number"
            className="w-16 rounded-lg text-center"
            value={multiplier}
            onChange={handleAmountChange}
          />
        </div>
      </div>
      {/** Add button */}
      <button
        className="disabled:opacity-50 bg-black text-white rounded-xl text-2xl h-10 lg:h-16 w-full lg:w-12 col-span-2 md:col-span-3 lg:col-span-1 lg:justify-self-end"
        onClick={handleSubmit}
      >
        +
      </button>
    </div>
  );
};

export default RecipeFoodItemCard;
