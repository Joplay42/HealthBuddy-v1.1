"use client";
import React, { ChangeEvent, useEffect, useState } from "react";
import Image from "next/image";
import { foodProps, macronutrients, recipeProps } from "@/types";
import NutrientsCharts from "@/components/charts/NutrientsCharts";
import { capitalize, recipeTotalMacronutrients } from "@/utils";
import { useSearchParams } from "next/navigation";
import { useFirebaseAuth } from "@/context/UserContext";

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
  const [errors, setErrors] = useState<Partial<recipeProps>>();
  // The button states
  const [buttonDisabled, setButtonDisabled] = useState(false);
  // Button loading states
  const [loading, setLoading] = useState(false);

  // Hooks to get the current params
  const searchParams = useSearchParams();
  const isUpdating = searchParams.get("recipeId");

  // Get teh current userId
  const { user } = useFirebaseAuth();

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

  useEffect(() => {
    if (recipe.Name && recipe.NbServing) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [recipe]);

  // Function to handle the form submit
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      // Define the response
      let res;

      if (!isUpdating) {
        // If a new recipe then post
        res = await fetch(`/api/foods/recipes?userid=${user?.uid}`, {
          method: "POST",
          body: JSON.stringify(recipe),
        });
      } else {
        // If updating recipe then patch
        res = await fetch(
          `/api/foods/recipes?userid=${user?.uid}&id=${isUpdating}`,
          {
            method: "PATCH",
            body: JSON.stringify(recipe),
          }
        );
      }

      if (res) {
        // Store the data
        const data = await res.json();
        // Error handling
        if (!res.ok) {
          throw new Error(data.error);
        }
        setIndex("4");
      }
    } catch (error: any) {
      console.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="px-4 lg:px-10">
      <form onSubmit={handleSubmit}>
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
                errors?.NbServing &&
                `border-red-500 focus:ring-red-500 focus:border-black`
              }`}
              placeholder="ex. 1"
            />
          </div>
        </div>
        <div className="mt-6 lg:mt-10 grid md:grid-cols-2">
          <div className="my-6 gap-6 h-auto">
            <div className="space-y-4">
              <h1 className="font-semibold text-lg">
                Macronutrient informations (per portions)
              </h1>
              <div className="flex flex-wrap gap-10">
                <div className="space-y-4">
                  <div className="flex items-center space-x-4 justify-self-end sm:justify-self-auto">
                    <NutrientsCharts
                      Calories={Math.round(
                        recipe.macronutrients.Calories / recipe.NbServing
                      )}
                      Protein={Math.round(
                        recipe.macronutrients.Protein / recipe.NbServing
                      )}
                      Carbs={Math.round(
                        recipe.macronutrients.Carbs / recipe.NbServing
                      )}
                      Fat={Math.round(
                        recipe.macronutrients.Fat / recipe.NbServing
                      )}
                      Empty={buttonDisabled}
                      size="max-h-28 w-28"
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
                        {Math.round(
                          recipe.macronutrients.Protein / recipe.NbServing
                        )}
                      </span>
                      g
                    </p>
                  </div>
                  <div className="text-center">
                    <h3 className="font-bold text-[#73af00]">Carbs</h3>
                    <p>
                      <span className="font-semibold">
                        {Math.round(
                          recipe.macronutrients.Carbs / recipe.NbServing
                        )}
                      </span>
                      g
                    </p>
                  </div>
                  <div className="text-center">
                    <h3 className="font-bold text-[#d7ff8a]">Fat</h3>
                    <p>
                      <span className="font-semibold">
                        {Math.round(
                          recipe.macronutrients.Fat / recipe.NbServing
                        )}
                      </span>
                      g
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col my-6 h-auto">
            <div className="space-y-4">
              <h1 className="font-semibold text-lg">List of ingredients</h1>
            </div>
            <div className="space-y-2 mt-2">
              {recipe.foods.map((foods, index) => (
                <p key={index}>
                  {capitalize(foods.Name)} - {capitalize(foods.Brand)} (
                  {foods.Quantity} {foods.Unit})
                </p>
              ))}
            </div>
          </div>
        </div>
        <button
          className=" my-10 flex items-center gap-2 justify-center py-4 px-3 rounded-xl hover:opacity-75 hover:transition ease-in-out duration-300 bg-black text-white w-full disabled:opacity-60"
          type="submit"
          disabled={buttonDisabled || loading}
        >
          Create a recipe
          {loading && (
            <Image
              src="/loading.gif"
              width={35}
              height={35}
              alt="Loading gif"
            />
          )}
        </button>
      </form>
    </div>
  );
};

export default Summary;
