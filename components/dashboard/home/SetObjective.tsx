"use client";
import { useFirebaseAuth } from "@/context/UserContext";
import { calculateNutriantDaily, setObjective } from "@/utils";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

/**
 * This component is used for the user to set a new objective. This component
 * ui has many inputs for the enter to select a new objective.
 *
 * @returns
 */
const SetObjective = () => {
  // router hooks for the navigation
  const router = useRouter();

  // Get the userId to set the objective
  const { user, isAdmin } = useFirebaseAuth();
  const userId = user?.uid;

  // Managing the button loading stats
  const [loading, setLoading] = useState(false);
  // Handling the error messages
  const [error, setError] = useState("");

  // The value the user need to change
  const [calorie, setCalorie] = useState(0);
  const [protein, setProtein] = useState(0);
  const [carb, setCarb] = useState(0);
  const [fat, setFat] = useState(0);

  // The nutrient converted to grams
  const [proteinGrams, setProteinGrams] = useState(0);
  const [carbgrams, setCarbGrams] = useState(0);
  const [fatGrams, setFatGrams] = useState(0);

  // Value to calculate the pourcentage
  const [pourcentage, setPourcentage] = useState(0);

  // Function to handle change to calculate the grams of nutrient with the pourcentage
  const handleOnChange = (type: string, value: number) => {
    // Input validation
    const validValue = isNaN(value) ? 0 : value;
    // The variable to calculate the new pourcentage
    let newProtein = protein;
    let newCarb = carb;
    let newFat = fat;

    if (type == "protein") {
      newProtein = validValue;
      setProtein(value);
      setProteinGrams(
        calculateNutriantDaily({
          dailyCalories: calorie,
          nutrientPercentage: validValue,
          nutrientType: type,
        })
      );
    } else if (type == "carbs") {
      newCarb = validValue;
      setCarb(value);
      setCarbGrams(
        calculateNutriantDaily({
          dailyCalories: calorie,
          nutrientPercentage: validValue,
          nutrientType: type,
        })
      );
    } else if (type == "fat") {
      newFat = validValue;
      setFat(value);
      setFatGrams(
        calculateNutriantDaily({
          dailyCalories: calorie,
          nutrientPercentage: validValue,
          nutrientType: type,
        })
      );
    }
    const newTotal = newProtein + newCarb + newFat;
    setPourcentage(newTotal);
  };

  // Function to handle the error when submiting the forms
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      // Clear the errors
      setError("");
      // Prevent page reload
      e.preventDefault();
      // enable the loading animation
      setLoading(true);

      // Validate if all field are completed
      if (calorie === 0 || protein === 0 || carb === 0 || fat === 0) {
        setError("Please ensure all fields are filled out.");
        setLoading(false);
        return;
      }
      // Validate if the pourcentage total is 100
      if (pourcentage != 100) {
        setError("Macronutrients should total 100%");
        setLoading(false);
        return;
      }

      // Check if a user was found
      if (userId) {
        const res = await fetch(`/api/objective?userid=${userId}`, {
          method: "POST",
          body: JSON.stringify({
            calorie,
            protein,
            carbs: carb,
            fat,
          }),
        });

        // Store the data
        const data = await res.json();
        if (!res.ok) {
          throw new Error(data.error);
        }

        // Closing the modal when the operation is done
        // Get the current params
        const currentParams = new URLSearchParams(window.location.search);
        // Delete the current param
        currentParams.delete("modal");
        // Push the router to the route without params
        router.replace(window.location.pathname);
      }

      // Disable the loading animation
      setLoading(false);
    } catch (error: any) {
      console.error(error);
      setError(error.message);
    }
  };

  return (
    <div className=" p-5 md:px-10 lg:px-20">
      <div className="lg:grid lg:grid-cols-2 lg:items-center">
        <form onSubmit={(e) => handleSubmit(e)}>
          <div className="space-y-2 lg:space-y-4">
            <h1 className="font-bold text-2xl lg:text-3xl">
              Set and <span className="text-custom-green">objective</span>
            </h1>
            <p className="text-neutral-600">
              Set your daily calories and nutrients to meet your health goals.
              Tracking these helps maintain a balanced diet and optimize energy
              levels. Adjust based on your activity level and dietary needs for
              the best results.
            </p>
          </div>
          <div className="space-y-4 mt-6 lg:mt-10">
            {error && <p className="text-red-500">{error}</p>}
            <label className="font-semibold text-lg">
              Daily calorie objective
            </label>
            <input
              type="number"
              name="calories"
              value={calorie}
              onChange={(e) => setCalorie(parseInt(e.target.value))}
              className="border-black rounded-xl w-full"
              placeholder="ex. 2000"
            />
          </div>
          <div className="md:flex justify-between md:space-x-4 lg:space-x-8">
            <div className="space-y-4 mt-4">
              <label className="font-semibold text-lg">Protein %</label>
              <div className="space-y-2">
                <input
                  type="number"
                  value={protein}
                  onChange={(e) =>
                    handleOnChange("protein", parseInt(e.target.value))
                  }
                  className="border-black rounded-xl w-full"
                  placeholder="40"
                />
                <p>{proteinGrams}g</p>
              </div>
            </div>
            <div className="space-y-4 mt-4">
              <label className="font-semibold text-lg">Carbs %</label>
              <div className="space-y-2">
                <input
                  type="number"
                  value={carb}
                  onChange={(e) =>
                    handleOnChange("carbs", parseInt(e.target.value))
                  }
                  className="border-black rounded-xl w-full"
                  placeholder="40"
                />
                <p>{carbgrams}g</p>
              </div>
            </div>
            <div className="space-y-4 mt-4">
              <label className="font-semibold text-lg">Fat %</label>
              <div className="space-y-2">
                <input
                  type="number"
                  value={fat}
                  onChange={(e) =>
                    handleOnChange("fat", parseInt(e.target.value))
                  }
                  className="border-black rounded-xl w-full"
                  placeholder="20"
                />
                <p>{fatGrams}g</p>
              </div>
            </div>
          </div>
          <h4 className="font-semibold text-lg mt-4">
            % Total :{" "}
            <span
              className={pourcentage == 100 ? `text-green-500` : `text-red-500`}
            >
              {pourcentage}
            </span>
          </h4>
          <p className="text-md text-neutral-500">
            Macronutrients should total 100%
          </p>
          <button
            className="mt-8 flex items-center gap-2 justify-center py-4 px-3 rounded-xl hover:opacity-75 hover:transition ease-in-out duration-300 bg-black text-white w-full disabled:opacity-60"
            type="submit"
            disabled={loading}
          >
            Start your journey!
            {loading && (
              <Image
                src="/loading.gif"
                width={25}
                height={25}
                alt="Loading gif"
              />
            )}
          </button>
        </form>
        <Image
          src="/set-objective.png"
          alt=""
          width={1000}
          height={1000}
          className="h-auto w-5/6 justify-self-end rounded-xl hidden lg:block"
        />
      </div>
    </div>
  );
};

export default SetObjective;
