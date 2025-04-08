"use client";
import NutrientsCharts from "@/components/charts/NutrientsCharts";
import { foodProps } from "@/types";
import { ChangeEvent, useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { capitalize } from "@/utils";

const FoodDesc = ({
  food,
  setFood,
  update,
}: {
  food: foodProps;
  setFood: React.Dispatch<React.SetStateAction<foodProps>>;
  update: (updatedData: foodProps) => void;
}) => {
  // Router hooks
  const router = useRouter();
  // Loading states
  const [loading, setLoading] = useState(false);
  // Multiplier state
  const [multiplier, setMultiplier] = useState(food.multiplier || 1);

  // UseEffect hooks to reset the multiplier when the food item changes
  useEffect(() => {
    setMultiplier(food.multiplier ?? 1);
  }, [food]);

  // Handle multiplication
  const handleAmountChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newMultiplier = e.target.valueAsNumber;
    if (newMultiplier > 0) {
      setMultiplier(newMultiplier);
      setFood((prevFood) => ({
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

  return (
    <div className="flex flex-wrap md:justify-center gap-y-8 gap-x-10 lg:gap-x-20 mx-4 lg:mx-10 my-10 md:my-5">
      {/** Food calorie chart */}
      <div className="flex flex-col items-center space-y-4 mx-auto md:mx-0">
        <NutrientsCharts
          Calories={food.Calories || 0}
          Protein={food.Protein || 0}
          Carbs={food.Carbs || 0}
          Fat={food.Fat || 0}
          size="h-60 w-auto"
          fontSize="text-3xl"
        />
        <p className="text-2xl font-semibold">Calories</p>
      </div>
      {/** Quantity input and label */}
      <div className="flex flex-col space-y-10 md:space-y-2 w-full md:w-auto justify-around mx-4 lg:mx-10 ">
        <div className="flex flex-col space-y-4">
          <h1 className="text-2xl font-semibold">
            {capitalize(food.Name ?? "")} - {capitalize(food.Brand ?? "")}
          </h1>
          <p className="text-xl font-semibold">
            Quantity ({food.Quantity + food.Unit})
          </p>
          <input
            value={multiplier}
            onChange={handleAmountChange}
            type="number"
            className="border-black rounded-xl w-full md:w-40"
            placeholder="ex. 4"
          />
        </div>
        <div className="flex space-x-16 md:space-x-8 ">
          <div className="text-2xl">
            <p>
              <span className="font-semibold">
                {Math.round(food.Protein) || 0}
              </span>
              g
            </p>
            <h3 className="font-bold text-[#AFF921]">Protein</h3>
          </div>
          <div className="text-2xl">
            <p>
              <span className="font-semibold">
                {Math.round(food.Carbs) || 0}
              </span>
              g
            </p>
            <h3 className="font-bold text-[#73af00]">Carbs</h3>
          </div>
          <div className="text-2xl">
            <p>
              <span className="font-semibold">{Math.round(food.Fat) || 0}</span>
              g
            </p>
            <h3 className="font-bold text-[#d7ff8a]">Fat</h3>
          </div>
        </div>
      </div>
      <button
        onClick={() => {
          router.back();
          if (food) {
            if (!food.multiplier) {
              food.multiplier = 1;
            }
            update(food);
          }
        }}
        className="mx-4 lg:mx-10 my-8 flex items-center gap-2 justify-center py-4 px-3 rounded-xl hover:opacity-75 hover:transition ease-in-out duration-300 bg-black text-white w-[95%] disabled:opacity-60"
        type="submit"
        disabled={loading}
      >
        Save
        {loading && (
          <Image src="/loading.gif" width={35} height={35} alt="Loading gif" />
        )}
      </button>
    </div>
  );
};

export default FoodDesc;
