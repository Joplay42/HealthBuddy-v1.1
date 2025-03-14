"use client";
import { FoodItem } from "@/components";
import { foodProps, recipeProps } from "@/types";
import { useState } from "react";
import Image from "next/image";

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
  const [foodList, setFoodList] = useState<foodProps[]>([
    {
      Id: "1",
      Name: "Test",
      Brand: "Unknown",
      Quantity: 1,
      Unit: "g",
      Calories: 100,
      Protein: 10,
      Carbs: 6,
      Fat: 2,
    },
    {
      Id: "2",
      Name: "Test",
      Brand: "Unknown",
      Quantity: 1,
      Unit: "g",
      Calories: 100,
      Protein: 10,
      Carbs: 6,
      Fat: 2,
    },
    {
      Id: "3",
      Name: "Test",
      Brand: "Unknown",
      Quantity: 1,
      Unit: "g",
      Calories: 100,
      Protein: 10,
      Carbs: 6,
      Fat: 2,
    },
  ]);

  // Loading states
  const [loading, setLoading] = useState(false);

  return (
    <div className="py-5">
      <button className="mx-4 lg:mx-10 my-4 text-lg w-fit bg-black text-white px-4 py-3 rounded-2xl text-center hover:opacity-75 hover:cursor-pointer">
        Select food
      </button>
      {foodList.map((item, index) => (
        <FoodItem
          style="odd:bg-white even:bg-gray-100"
          key={index}
          food={item}
        />
      ))}
      <button
        className="mx-4 lg:mx-10 my-8 flex items-center gap-2 justify-center py-4 px-3 rounded-xl hover:opacity-75 hover:transition ease-in-out duration-300 bg-black text-white w-[95%] disabled:opacity-60"
        type="submit"
        disabled={loading}
        onClick={() => setIndex("3")}
      >
        Next
        {loading && (
          <Image src="/loading.gif" width={35} height={35} alt="Loading gif" />
        )}
      </button>
    </div>
  );
};

export default SelectFood;
