"use client";
import { Modal } from "@/components";
import NutrientsCharts from "@/components/charts/NutrientsCharts";
import { foodProps } from "@/types";
import { useState } from "react";
import Image from "next/image";

const FoodDesc = ({ Id }: { Id: string }) => {
  // TO DO FETCH API FOODITEM USING ID

  const [food, setFood] = useState<foodProps>({
    Id: "1",
    Name: "Test",
    Brand: "Unknown",
    Quantity: 100,
    Unit: "g",
    Calories: 100,
    Protein: 10,
    Carbs: 6,
    Fat: 2,
  });

  //States for the multiplier
  const [multiplier, setMultiplier] = useState<number>(1);
  // Loading states
  const [loading, setLoading] = useState(false);

  return (
    <Modal
      title={food.Name + " " + food.Quantity + food.Unit}
      backButton={true}
      route="addrecipe"
    >
      <div className="flex flex-wrap md:justify-center gap-y-8 gap-x-10 lg:gap-x-20 mx-4 lg:mx-10 my-10 md:my-5">
        {/** Food calorie chart */}
        <div className="flex flex-col items-center space-y-4 mx-auto md:mx-0">
          <NutrientsCharts
            Calories={Math.round(food.Calories * multiplier) || 0}
            Protein={Math.round(food.Protein * multiplier) || 0}
            Carbs={Math.round(food.Carbs * multiplier) || 0}
            Fat={Math.round(food.Fat * multiplier) || 0}
            size="h-60 w-auto"
            fontSize="text-3xl"
          />
          <p className="text-2xl font-semibold">Calories</p>
        </div>
        {/** Quantity input and label */}
        <div className="flex flex-col space-y-10 md:space-y-2 w-full md:w-auto justify-around">
          <div className="flex flex-col space-y-4">
            <p className="text-xl font-semibold">
              Quantity ({food.Quantity + food.Unit})
            </p>
            <input
              value={multiplier}
              onChange={(e) => {
                if (e.target.valueAsNumber > 0) {
                  setMultiplier(e.target.valueAsNumber);
                }
              }}
              type="number"
              className="border-black rounded-xl w-full md:w-40"
              placeholder="ex. 4"
            />
          </div>
          <div className="flex space-x-16 md:space-x-8 ">
            <div className="text-2xl">
              <p>
                <span className="font-semibold">
                  {Math.round(food.Protein * multiplier) || 0}
                </span>
                g
              </p>
              <h3 className="font-bold text-[#AFF921]">Protein</h3>
            </div>
            <div className="text-2xl">
              <p>
                <span className="font-semibold">
                  {Math.round(food.Carbs * multiplier) || 0}
                </span>
                g
              </p>
              <h3 className="font-bold text-[#73af00]">Carbs</h3>
            </div>
            <div className="text-2xl">
              <p>
                <span className="font-semibold">
                  {Math.round(food.Fat * multiplier) || 0}
                </span>
                g
              </p>
              <h3 className="font-bold text-[#d7ff8a]">Fat</h3>
            </div>
          </div>
        </div>
        <button
          className="mx-4 lg:mx-10 my-8 flex items-center gap-2 justify-center py-4 px-3 rounded-xl hover:opacity-75 hover:transition ease-in-out duration-300 bg-black text-white w-[95%] disabled:opacity-60"
          type="submit"
          disabled={loading}
        >
          Save
          {loading && (
            <Image
              src="/loading.gif"
              width={35}
              height={35}
              alt="Loading gif"
            />
          )}
        </button>
      </div>
    </Modal>
  );
};

export default FoodDesc;
