"use client";
import { FoodDesc, FoodItem, SearchFood } from "@/components";
import { foodProps, recipeProps } from "@/types";
import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { UserPendingItemProvider } from "@/context/UserPendingItemContext";

const SelectFood = ({
  recipe,
  setRecipe,
  setIndex,
}: {
  recipe: recipeProps;
  setRecipe: React.Dispatch<React.SetStateAction<recipeProps>>;
  setIndex: (newIndex: string) => void;
}) => {
  // States for the foodList item
  const [foodList, setFoodList] = useState<foodProps[]>([]);

  // Single food item
  const [food, setFood] = useState<foodProps>({} as foodProps);

  // Loading states
  const [loading, setLoading] = useState(false);

  // Get the current params using nextJs hooks
  const searchParams = useSearchParams();
  // Router hooks
  const router = useRouter();
  // Value to detect which page to display
  const isDescription = searchParams.get("id");
  const isSearching = searchParams.get("search");

  useEffect(() => {
    // Function to find a food index in the list
    const findFood = () => {
      if (isDescription) {
        const foundFood = foodList.find((food) => food.Id == isDescription);
        if (foundFood) setFood(foundFood);
      }
    };
    findFood(); // Call findFood when the component mounts or when `isDescription` changes
  }, [isDescription, foodList]);

  // Function to delete a food index in the list
  const deleteFood = (id: string | undefined) => {
    setFoodList((prev) => prev.filter((food) => food.Id !== id));
  };

  // Function to update a food item
  const updateFoodItem = (food: foodProps) => {
    // Replace the right object
    setFoodList((prevItems) =>
      prevItems.map((item) => (item.Id === food.Id ? food : item))
    );
  };

  // Function to add food to list
  const addFoodList = (food: foodProps) => {
    setFoodList([...foodList, food]);
  };

  return (
    <div className="py-5">
      {isDescription && food ? (
        <FoodDesc food={food} setFood={setFood} update={updateFoodItem} />
      ) : isSearching ? (
        <UserPendingItemProvider>
          <SearchFood addFood={addFoodList} />
        </UserPendingItemProvider>
      ) : (
        <>
          <button
            className="mx-4 lg:mx-10 my-4 text-lg w-fit bg-black text-white px-4 py-3 rounded-2xl text-center hover:opacity-75 hover:cursor-pointer"
            onClick={() =>
              router.push(`?modal=addrecipe&index=2&search=true`, {
                scroll: false,
              })
            }
          >
            Select food
          </button>

          {foodList?.length ? (
            foodList.map((item, index) => (
              <FoodItem
                style="odd:bg-white even:bg-gray-100"
                key={index}
                food={item}
                action={deleteFood}
              />
            ))
          ) : (
            <div className="text-center font-semibold text-xl py-10">
              <p>Add food to your recipe!</p>
            </div>
          )}

          <button
            className="mx-4 lg:mx-10 my-8 flex items-center gap-2 justify-center py-4 px-3 rounded-xl hover:opacity-75 hover:transition ease-in-out duration-300 bg-black text-white w-[95%] disabled:opacity-60"
            type="submit"
            disabled={loading}
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
