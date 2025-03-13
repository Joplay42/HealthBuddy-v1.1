"use client";
import NutrientsCharts from "@/components/charts/NutrientsCharts";
import { foodProps, pendingItemProps } from "@/types";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const Item = ({ item, onApprove, onChange, onDelete }: pendingItemProps) => {
  // States to edit the values
  const [edit, setEdit] = useState(false);
  // States of the item
  const [foodItem, setFoodItem] = useState(item);
  // States for the loading
  const [loading, setLoading] = useState(false);

  // Sync local state with updated item
  useEffect(() => {
    setFoodItem({
      Id: item.Id,
      Name: item.Name,
      Brand: item.Brand,
      Quantity: item.Quantity,
      Unit: item.Unit,
      Calories: item.Calories,
      Protein: item.Protein,
      Carbs: item.Carbs,
      Fat: item.Fat,
      Pending: item.Pending,
    });
  }, [item]); // Update whenever the item prop changes

  // Function to handle the edit mode and to reset the states
  const handleEdit = () => {
    setEdit(!edit);
  };

  // Function to handle the edit changes
  const handleChange = async () => {
    setLoading(true);
    // Error handling API call
    try {
      // Call teh PATCH foods api
      const res = await fetch(`/api/foods?id=${foodItem.Id}`, {
        method: "PATCH",
        body: JSON.stringify(foodItem),
      });

      // Store the data
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error);
      }

      onChange(foodItem);
    } catch (error: any) {
      console.error("Error updating the item: ", error.message);
    } finally {
      setLoading(false);
      setEdit(false);
    }
  };

  // Function to handle the item deletion
  const handleDeletion = async () => {
    setLoading(true);
    // Error handling
    try {
      // Call the api DELETE method
      const res = await fetch(`/api/foods?del=${item.Id}`, {
        method: "DELETE",
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error);
      }

      onDelete();
    } catch (error: any) {
      console.error("Error deleting the item: ", error);
    } finally {
      setLoading(false);
    }
  };

  // Function to handle the item update to confirm the item to the databse
  const handleUpdate = async () => {
    setLoading(true);
    try {
      // Call the PATCH method of the pending food api
      const res = await fetch(`/api/foods/pending?id=${item.Id}`, {
        method: "PATCH",
      });

      // Storing the data
      const data = await res.json();
      // Error handling
      if (!res.ok) {
        throw new Error(data.error);
      }

      onApprove();
    } catch (error: any) {
      console.error("Error updating the item: ", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="flex flex-wrap items-center justify-between space-y-4 py-5 border-neutral-300 border rounded-xl px-4">
      {/** Food name */}
      <div className="text-lg">
        <div className="flex flex-col">
          {/** Display input if it is editable */}
          {!edit ? (
            <h3 className="font-semibold">
              {foodItem.Name.toLocaleLowerCase()}
            </h3>
          ) : (
            <input
              type="text"
              className="border border-neutral-400 rounded-xl px-2 py-1 m-1 max-w-44"
              value={foodItem.Name}
              onChange={(e) =>
                setFoodItem((prevItem) => ({
                  ...prevItem,
                  Name: e.target.value,
                }))
              }
            />
          )}
          {/** Display input if it is editable */}
          {!edit ? (
            <h3 className="font-medium text-sm">
              {foodItem.Brand.toLocaleLowerCase()}
            </h3>
          ) : (
            <input
              type="text"
              className="text-sm border border-neutral-400 rounded-xl px-2 py-1 m-1 max-w-44"
              value={foodItem.Brand}
              onChange={(e) =>
                setFoodItem((prevItem) => ({
                  ...prevItem,
                  Brand: e.target.value,
                }))
              }
            />
          )}
        </div>
        <div className="flex items-center">
          {/** Handle the edit input change for the quantity */}
          {!edit ? (
            foodItem.Quantity
          ) : (
            <input
              type="number"
              className="border border-neutral-400 rounded-xl px-2 py-1 w-16 m-1"
              value={foodItem.Quantity}
              onChange={(e) => {
                if (e.target.valueAsNumber > 0) {
                  setFoodItem((prevItem) => ({
                    ...prevItem,
                    Quantity: e.target.valueAsNumber,
                  }));
                }
              }}
            />
          )}{" "}
          {/** Handle the edit input change for the unit */}
          {!edit ? (
            foodItem.Unit
          ) : (
            <select
              className="border border-neutral-400 rounded-xl px-2 py-2 m-1 w-10 md:w-20 lg:w-26 text-sm"
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
          )}
        </div>
      </div>
      {/** Food calorie chart */}
      <div className="flex items-center space-x-4">
        {/** Handle the edit for the calorie attribute */}
        {!edit ? (
          <NutrientsCharts
            Calories={foodItem.Calories}
            Protein={foodItem.Protein}
            Carbs={foodItem.Carbs}
            Fat={foodItem.Fat}
            size="h-20 w-auto"
            fontSize="text-lg"
          />
        ) : (
          <input
            type="number"
            className="border border-neutral-400 rounded-xl px-2 py-1 w-16 m-1"
            value={foodItem.Calories}
            onChange={(e) => {
              if (e.target.valueAsNumber > 0) {
                setFoodItem((prevItem) => ({
                  ...prevItem,
                  Calories: e.target.valueAsNumber,
                }));
              }
            }}
          />
        )}
        <p>Calories</p>
      </div>
      {/** Food nutrient informations */}
      <div className="flex flex-wrap gap-6">
        <div className="text-center">
          <h3 className="font-bold text-[#AFF921]">Protein</h3>
          <p>
            {!edit ? (
              <span className="font-semibold">{foodItem.Protein}</span>
            ) : (
              <input
                type="number"
                className="border border-neutral-400 rounded-xl px-2 py-1 w-[70px] m-1"
                value={foodItem.Protein}
                onChange={(e) => {
                  if (e.target.valueAsNumber > 0) {
                    setFoodItem((prevItem) => ({
                      ...prevItem,
                      Protein: e.target.valueAsNumber,
                    }));
                  }
                }}
              />
            )}
            g
          </p>
        </div>
        <div className="text-center">
          <h3 className="font-bold text-[#73af00]">Carbs</h3>
          <p>
            {!edit ? (
              <span className="font-semibold">{foodItem.Carbs}</span>
            ) : (
              <input
                type="number"
                className="border border-neutral-400 rounded-xl px-2 py-1 w-[70px] m-1"
                value={foodItem.Carbs}
                onChange={(e) => {
                  if (e.target.valueAsNumber > 0) {
                    setFoodItem((prevItem) => ({
                      ...prevItem,
                      Carbs: e.target.valueAsNumber,
                    }));
                  }
                }}
              />
            )}
            g
          </p>
        </div>
        <div className="text-center">
          <h3 className="font-bold text-[#d7ff8a]">Fat</h3>
          <p>
            {!edit ? (
              <span className="font-semibold">{foodItem.Fat}</span>
            ) : (
              <input
                type="number"
                className="border border-neutral-400 rounded-xl px-2 py-1 w-[70px] m-1"
                value={foodItem.Fat}
                onChange={(e) => {
                  if (e.target.valueAsNumber > 0) {
                    setFoodItem((prevItem) => ({
                      ...prevItem,
                      Fat: e.target.valueAsNumber,
                    }));
                  }
                }}
              />
            )}
            g
          </p>
        </div>
      </div>
      {/** Handle the edit states */}
      {!edit ? (
        <div className="flex space-x-2 min-w-40">
          <button onClick={handleEdit}>
            <Image src={"/edit.svg"} height={25} width={25} alt="Edit icon" />
          </button>
          <button onClick={handleDeletion}>
            <Image
              src={"/delete.svg"}
              height={25}
              width={25}
              alt="Delete icon"
            />
          </button>
          <button onClick={handleUpdate}>
            <Image src={"/save.svg"} height={25} width={25} alt="Save icon" />
          </button>
        </div>
      ) : (
        <div className="min-w-20">
          <button onClick={handleChange}>
            <Image src={"/ok.svg"} height={30} width={30} alt="Okay icon" />
          </button>
          <button onClick={() => setEdit(!edit)}>
            <Image
              src={"/cancel.svg"}
              height={30}
              width={30}
              alt="Cancel icon"
            />
          </button>
        </div>
      )}
    </div>
  );
};

export default Item;
