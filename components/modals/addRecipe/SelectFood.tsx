"use client";
import { FoodDesc, FoodItem, SearchFood } from "@/components";
import { foodProps, recipeProps } from "@/types";
import { useEffect, useState } from "react";
import Image from "next/image";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { recipeTotalMacronutrients } from "@/utils";

const SelectFood = ({
  recipe,
  setRecipe,
  setIndex,
}: {
  recipe: recipeProps;
  setRecipe: React.Dispatch<React.SetStateAction<recipeProps>>;
  setIndex: (newIndex: string) => void;
}) => {
  // Single food item
  const [food, setFood] = useState<foodProps>({} as foodProps);
  // Total calories
  const [caloriesPerPortions, setCaloriesPerPortions] = useState(0);

  // Disable states for the button
  const [disabled, setDisabled] = useState(true);
  // Loading states
  const [loading, setLoading] = useState(false);

  // Get the current params using nextJs hooks
  const searchParams = useSearchParams();
  // Router hooks
  const router = useRouter();
  // PathName hooks
  const pathName = usePathname();

  // Value to detect which page to display
  const isDescription = searchParams.get("id");
  const isSearching = searchParams.get("search");

  useEffect(() => {
    // Function to find a food index in the list
    const findFood = () => {
      if (isDescription) {
        // Find the food in the recipe
        const foundFood = recipe.foods.find(
          (food) => food.Id === isDescription
        );
        if (foundFood) setFood(foundFood);
      }
    };

    // enable the button if the foods list is not empty
    if (recipe.foods.length > 0) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
    findFood(); // Call findFood when the component mounts or when `isDescription` changes
  }, [isDescription, recipe]);

  // Update the total macronutrients of the recipe
  useEffect(() => {
    // Calculate the total macronutrient
    const total = recipeTotalMacronutrients(recipe.foods);
    setRecipe((prevItem) => ({
      ...prevItem,
      macronutrients: total,
    }));
  }, [recipe.foods, setRecipe]);

  // Function to delete a food index in the list
  const deleteFood = (id: string | undefined) => {
    setRecipe((prev) => ({
      ...prev,
      foods: prev.foods.filter((food) => food.Id !== id),
    }));
  };

  // Function to update a food item
  const updateFoodItem = (food: foodProps) => {
    // Replace the right object
    setRecipe((prevRecipe) => ({
      ...prevRecipe,
      foods: prevRecipe.foods.map((item) =>
        item.Id === food.Id ? food : item
      ),
    }));
  };

  // Function to add food to list
  const addFoodList = (food: foodProps) => {
    setRecipe((prev) => ({
      ...prev,
      foods: [...prev.foods, { ...food, multiplier: food.multiplier ?? 1 }],
    }));
  };

  return (
    <div className="py-5">
      {isDescription && food ? (
        <FoodDesc food={food} setFood={setFood} update={updateFoodItem} />
      ) : isSearching ? (
        <SearchFood addFood={addFoodList} />
      ) : (
        <>
          <button
            className="mx-4 lg:mx-10 my-2 md:my-4 text-md md:text-lg w-fit bg-black text-white px-3 md:px-4 py-2 md:py-3 rounded-2xl text-center hover:opacity-75 hover:cursor-pointer"
            onClick={() => {
              // Get the current params
              const currentParams = new URLSearchParams(window.location.search);
              currentParams.set("search", "true");
              router.push(`${pathName}?${currentParams.toString()}`, {
                scroll: false,
              });
            }}
          >
            Select food
          </button>

          {recipe.foods?.length ? (
            recipe.foods.map((item, index) => (
              <FoodItem
                style="odd:bg-white even:bg-gray-100"
                key={index}
                food={item}
                action={deleteFood}
              />
            ))
          ) : (
            <div className="text-center font-semibold text-md md:text-xl py-10">
              <p>Add food to your recipe!</p>
            </div>
          )}
          <p className="text-center mt-4 mx-4">
            <span className="font-semibold">{recipe.Name} : </span>
            {Math.round(recipe.macronutrients.Calories / recipe.NbServing)}{" "}
            calories par portion - {recipe.NbServing} portion
            {recipe.NbServing > 1 ? "s" : ""}
          </p>
          <button
            className="mx-auto md:mx-4 lg:mx-10 my-8 flex items-center gap-2 justify-center py-4 px-3 rounded-xl hover:opacity-75 hover:transition ease-in-out duration-300 bg-black text-white w-[95%] disabled:opacity-60"
            type="submit"
            disabled={loading || disabled}
            onClick={() => setIndex("3")}
          >
            Next
            {loading && (
              <Image
                src="/loading.gif"
                width={35}
                height={35}
                alt="Loading gif"
              />
            )}
          </button>
        </>
      )}
    </div>
  );
};

export default SelectFood;
