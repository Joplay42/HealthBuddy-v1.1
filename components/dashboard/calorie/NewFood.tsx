"use client";
import { foodProps } from "@/types";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ChangeEvent, useEffect, useState } from "react";

const NewFood = () => {
  // States for the new foodItem
  const [foodItem, setFoodItem] = useState<Partial<foodProps>>({
    Name: "",
    Brand: "",
    Quantity: 0,
    Unit: "",
    Calories: 0,
    Protein: 0,
    Carbs: 0,
    Fat: 0,
  });
  //States for the error
  const [errors, setErrors] = useState<Partial<foodProps>>();
  // The button states
  const [buttonDisabled, setButtonDisabled] = useState(true);
  // Button loading states
  const [loading, setLoading] = useState(false);
  // Router navigation
  const router = useRouter();

  // Function to handle the form submit
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    // Prevent page reload
    e.preventDefault();
    console.log(foodItem);
    // Set the loading states to true
    setLoading(true);

    // Error handling
    try {
      // Call the api post method
      const res = await fetch("/api/foods/pending", {
        method: "POST",
        body: JSON.stringify(foodItem),
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
    } catch (error: any) {
      console.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  // Function to handle the form error
  const handleChange = (
    type: keyof foodProps,
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
      setFoodItem((prevItem) => ({
        ...prevItem,
        [type]: e.target.valueAsNumber,
      }));
    } else {
      setFoodItem((prevItem) => ({ ...prevItem, [type]: e.target.value }));
    }
  };

  // UseEffect hooks to enabled the button once all the inputs have been entered
  useEffect(() => {
    if (
      foodItem?.Name &&
      foodItem?.Brand &&
      foodItem?.Quantity &&
      foodItem?.Unit &&
      foodItem?.Calories
    ) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [foodItem]);

  return (
    <div className="py-5 px-4 lg:px-10">
      <form onSubmit={handleSubmit}>
        <div className="lg:grid grid-cols-2 gap-x-6">
          <div className="space-y-4 mt-6 lg:mt-10 flex flex-col">
            <label className="font-semibold text-lg">Name</label>
            <input
              type="text"
              value={foodItem?.Name}
              onChange={(e) => handleChange("Name", e)}
              className={`rounded-xl w-full ${
                errors?.Name &&
                `border-red-500 focus:ring-red-500 focus:border-black`
              }`}
              placeholder="ex. Banana"
            />
          </div>
          <div className="space-y-4 mt-6 lg:mt-10">
            <label className="font-semibold text-lg">Brand</label>
            <input
              type="text"
              value={foodItem?.Brand}
              onChange={(e) => handleChange("Brand", e)}
              className={`rounded-xl w-full border-black ${
                errors?.Brand &&
                `border-red-500 focus:ring-red-500 focus:border-black`
              }`}
              placeholder="ex. No name"
            />
          </div>
        </div>
        <div className="space-y-4 mt-6 lg:mt-10">
          <label className="font-semibold text-lg">Quantity</label>
          <div className="space-x-4">
            <input
              type="number"
              value={foodItem?.Quantity}
              onChange={(e) => {
                if (e.target.valueAsNumber > 0) {
                  handleChange("Quantity", e);
                }
              }}
              className="border-black rounded-xl w-40 md:w-fit"
              placeholder="ex. 1"
            />
            <select
              className="w-20 md:w-32 lg:w-fit rounded-lg border-2 border-black font-semibold"
              value={foodItem?.Unit || ""}
              onChange={(e) => {
                setFoodItem((prevItem) => ({
                  ...prevItem,
                  Unit: e.target.value,
                }));
              }}
            >
              <option disabled defaultChecked></option>
              <option value="portion">portion (custom)</option>
              <option value="g">g</option>
              <option value="cup">cup</option>
              <option value="oz">oz</option>
              <option value="ml">ml</option>
              <option value="l">l</option>
              <option value="lb">lb</option>
              <option value="kg">kg</option>
            </select>
          </div>
        </div>
        <div className="flex flex-wrap justify-between">
          <div className="flex space-x-4">
            <div className="space-y-4 mt-6 lg:mt-10">
              <label className="font-semibold text-lg">Protein (g)</label>
              <input
                type="number"
                value={foodItem?.Protein}
                onChange={(e) => {
                  if (e.target.valueAsNumber >= 0) {
                    handleChange("Protein", e);
                  }
                }}
                className="border-black rounded-xl w-full"
                placeholder="ex. 12"
              />
            </div>
            <div className="space-y-4 mt-6 lg:mt-10">
              <label className="font-semibold text-lg">Carbs (g)</label>
              <input
                type="number"
                value={foodItem?.Carbs}
                onChange={(e) => {
                  if (e.target.valueAsNumber >= 0) {
                    handleChange("Carbs", e);
                  }
                }}
                className="border-black rounded-xl w-full"
                placeholder="ex. 12"
              />
            </div>

            <div className="space-y-4 mt-6 lg:mt-10">
              <label className="font-semibold text-lg">Fat (g)</label>
              <input
                type="number"
                value={foodItem?.Fat}
                onChange={(e) => {
                  if (e.target.valueAsNumber >= 0) {
                    handleChange("Fat", e);
                  }
                }}
                className="border-black rounded-xl w-full"
                placeholder="ex. 12"
              />
            </div>
          </div>
          <div className="space-y-4 mt-6 lg:mt-10">
            <label className="font-semibold text-lg">
              calories per portions
            </label>
            <input
              type="number"
              value={foodItem?.Calories}
              onChange={(e) => {
                if (e.target.valueAsNumber > 0) {
                  handleChange("Calories", e);
                }
              }}
              className="border-black rounded-xl w-full"
              placeholder="ex. 250"
            />
          </div>
        </div>
        <button
          className="my-8 flex items-center gap-2 justify-center py-4 px-3 rounded-xl hover:opacity-75 hover:transition ease-in-out duration-300 bg-black text-white w-full disabled:opacity-60"
          type="submit"
          disabled={buttonDisabled || loading}
        >
          Add food
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

export default NewFood;
