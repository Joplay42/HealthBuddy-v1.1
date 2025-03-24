"use client";
import React, { ChangeEvent, useEffect, useState } from "react";
import Image from "next/image";
import { foodProps, macronutrients, recipeProps } from "@/types";
import NutrientsCharts from "@/components/charts/NutrientsCharts";
import { recipeTotalMacronutrients } from "@/utils";

const Summary = ({
  recipe,
  setRecipe,
  setIndex,
}: {
  recipe: recipeProps;
  setRecipe: React.Dispatch<React.SetStateAction<recipeProps>>;
  setIndex: (newIndex: string) => void;
}) => {
  //States for the error
  const [errors, setErrors] = useState<Partial<foodProps>>();
  // The button states
  const [buttonDisabled, setButtonDisabled] = useState(true);
  // Button loading states
  const [loading, setLoading] = useState(false);
  // Calculate the total macronutrient
  const total = recipeTotalMacronutrients(recipe.foods);
  // States for each macronutrients
  const [macronutrients, setMacronutrients] = useState<macronutrients>({
    Calories: Math.round(total.calories / recipe.NbServing),
    Proteins: Math.round(total.proteins / recipe.NbServing),
    Carbs: Math.round(total.carbs / recipe.NbServing),
    Fat: Math.round(total.fat / recipe.NbServing),
  });

  // Function to handle the form error
  const handleChange = (
    type: keyof recipeProps,
    e: ChangeEvent<HTMLInputElement>
  ) => {
    if (e.target.value.length === 0) {
      setErrors((prevItem) => ({
        ...prevItem,
        [type]: "This field cannot be empty",
      }));
    } else {
      setErrors((prevItem) => ({
        ...prevItem,
        [type]: "",
      }));
    }
    // Verify the event type
    if (e.target.type === "number") {
      setRecipe((prevItem) => ({
        ...prevItem,
        [type]: e.target.valueAsNumber,
      }));
    } else {
      setRecipe((prevItem) => ({ ...prevItem, [type]: e.target.value }));
    }
  };

  return (
    <div className="px-4 lg:px-10">
      <form>
        <div className="lg:grid grid-cols-2 gap-x-6">
          <div className="space-y-4 mt-6 lg:mt-10 flex flex-col">
            <label className="font-semibold text-lg">Name</label>
            <input
              type="text"
              value={recipe.Name}
              onChange={(e) => handleChange("Name", e)}
              className={`rounded-xl w-full ${
                errors?.Name &&
                `border-red-500 focus:ring-red-500 focus:border-black`
              }`}
              placeholder="ex. Banana"
            />
          </div>
          <div className="space-y-4 mt-6 lg:mt-10 flex flex-col">
            <label className="font-semibold text-lg">Amount of servings</label>
            <input
              type="number"
              value={recipe.NbServing}
              onChange={(e) => {
                if (e.target.valueAsNumber > 0) {
                  handleChange("NbServing", e);
                }
              }}
              className={`rounded-xl w-full ${
                errors?.Name &&
                `border-red-500 focus:ring-red-500 focus:border-black`
              }`}
              placeholder="ex. 1"
            />
          </div>
        </div>
        <div className="mt-6 lg:mt-10">
          <div className="my-6 grid md:grid-cols-2 gap-6 h-60">
            <div className="space-y-4">
              <h1 className="font-semibold text-lg">
                Macronutrient informations (per portions)
              </h1>
              <div className="flex flex-wrap gap-10">
                <div className="space-y-4">
                  <div className="flex items-center space-x-4 justify-self-end sm:justify-self-auto">
                    <NutrientsCharts
                      Calories={macronutrients.Calories}
                      Protein={macronutrients.Proteins}
                      Carbs={macronutrients.Carbs}
                      Fat={macronutrients.Fat}
                      size="h-28 w-28"
                      fontSize="text-2xl"
                    />
                    <p>Calories</p>
                  </div>
                </div>
                {/** Food nutrient informations */}
                <div className="flex items-center gap-x-10">
                  <div className="text-center">
                    <h3 className="font-bold text-[#AFF921]">Protein</h3>
                    <p>
                      <span className="font-semibold">
                        {macronutrients.Proteins}
                      </span>
                      g
                    </p>
                  </div>
                  <div className="text-center">
                    <h3 className="font-bold text-[#73af00]">Carbs</h3>
                    <p>
                      <span className="font-semibold">
                        {macronutrients.Carbs}
                      </span>
                      g
                    </p>
                  </div>
                  <div className="text-center">
                    <h3 className="font-bold text-[#d7ff8a]">Fat</h3>
                    <p>
                      <span className="font-semibold">
                        {macronutrients.Fat}
                      </span>
                      g
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col">
              <div className="space-y-4">
                <h1 className="font-semibold text-lg">List of ingredients</h1>
              </div>
              <div className="space-y-2 mt-2">
                {recipe.foods.map((foods, index) => (
                  <h1 key={index}>
                    {foods.Name} - {foods.Brand} ({foods.Quantity} {foods.Unit})
                  </h1>
                ))}
              </div>
            </div>
          </div>
        </div>
      </form>
      <button
        className=" my-10 flex items-center gap-2 justify-center py-4 px-3 rounded-xl hover:opacity-75 hover:transition ease-in-out duration-300 bg-black text-white w-full disabled:opacity-60"
        type="submit"
        disabled={loading}
        onClick={() => setIndex("4")}
      >
        Create a recipe
        {loading && (
          <Image src="/loading.gif" width={35} height={35} alt="Loading gif" />
        )}
      </button>
    </div>
  );
};

export default Summary;
