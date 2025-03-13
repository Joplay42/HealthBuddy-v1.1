"use client";
import { recipeProps } from "@/types";
import Image from "next/image";
import { ChangeEvent, useEffect, useState } from "react";

const InitialForm = () => {
  // States for  the recipe object
  const [recipe, setRecipe] = useState<Partial<recipeProps>>({
    Name: "",
    NbServing: 0,
  });
  //States for the error
  const [errors, setErrors] = useState<Partial<recipeProps>>();
  // The button states
  const [buttonDisabled, setButtonDisabled] = useState(true);
  // Button loading states
  const [loading, setLoading] = useState(false);

  const handleSubmit = () => {
    // TO DO
  };

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

  return (
    <form onSubmit={handleSubmit} className="py-5 px-4 lg:px-10">
      <div className="space-y-4 mt-6 lg:mt-10 flex flex-col">
        <label className="font-semibold text-lg">Name</label>
        <input
          value={recipe.Name}
          onChange={(e) => handleChange("Name", e)}
          type="text"
          className={`rounded-xl w-full ${
            errors?.Name &&
            `border-red-500 focus:ring-red-500 focus:border-black`
          }`}
          placeholder="ex. Banana"
        />
      </div>
      <div className="space-y-4 mt-6 lg:mt-10 flex flex-col">
        <label className="font-semibold text-lg">Numbers of servings</label>
        <input
          value={recipe.NbServing}
          onChange={(e) => {
            if (e.target.valueAsNumber > 0) {
              handleChange("NbServing", e);
            }
          }}
          type="number"
          className="border-black rounded-xl w-40"
          placeholder="ex. 4"
        />
      </div>
      <button
        className="my-8 flex items-center gap-2 justify-center py-4 px-3 rounded-xl hover:opacity-75 hover:transition ease-in-out duration-300 bg-black text-white w-full disabled:opacity-60"
        type="submit"
        disabled={buttonDisabled || loading}
      >
        Next
        {loading && (
          <Image src="/loading.gif" width={35} height={35} alt="Loading gif" />
        )}
      </button>
    </form>
  );
};

export default InitialForm;
