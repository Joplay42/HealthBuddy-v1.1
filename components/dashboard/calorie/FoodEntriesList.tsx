"use client";
// Components import
import { FoodMenu } from "@/components";
// Props import
import { foodEntriesListProps } from "@/types";
import { capitalize } from "@/utils";
// NextJs image imports
import Image from "next/image";
// Hooks import
import { useState } from "react";

/**
 * This component is the main food List display. It uses a list of food and a list of label.
 * The label is used to display the category of the list.
 *
 * @param label the category of the list
 * @param data the food List
 * @returns
 */
const FoodEntriesList = ({ label, data }: foodEntriesListProps) => {
  // useState to open the menu to see more
  const [openRow, setOpenRow] = useState<number | null>(null);
  // useState to set the foodItem selected
  const [food, setFood] = useState(0);

  return (
    <>
      {/** A table to display the category and foods */}
      {/** The large screen table */}
      <table className="hidden lg:table w-full text-left">
        <thead>
          {/** The head of the table */}
          <tr className="font-semibold text-neutral-400">
            {/** Mapping of the categories */}
            {label.map((label, index) => (
              // Display of the categories
              <td
                key={index}
                // Fix the width if the label == food
                className={`pb-5 ${label == "Food" && "xl:w-60 2xl:w-96"}`}
              >
                {label}
              </td>
            ))}
          </tr>
        </thead>
        {/** The body of the table for the food list */}
        <tbody>
          {/** Mapping of the foods */}
          {data.map((item, index) => (
            // A single row
            <tr key={index} className="border-y border-neutral-300 font-bold">
              {/** Display each item properties */}
              <td className="py-5">{item.Meal}</td>
              <td className="py-5">{capitalize(item.Name)}</td>
              <td className="py-5">
                {Math.round(item.Quantity) + " " + item.Unit}
              </td>
              <td className="py-5">{Math.round(item.Calories)}</td>
              <td className="py-5">{Math.round(item.Protein) + "g"}</td>
              <td className="py-5">{Math.round(item.Carbs) + "g"}</td>
              <td className="py-5">{Math.round(item.Fat) + "g"}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {/** The mobile tabble */}
      <table className="lg:hidden w-full text-left">
        {/** The header of the table */}
        <thead>
          {/** A single row */}
          <tr className="font-semibold text-neutral-400">
            {/** Display of only the first and second categories */}
            {label.slice(0, 2).map((item, index) => (
              // Display
              <td key={index} className="pb-5">
                {item}
              </td>
            ))}
          </tr>
        </thead>
        {/** Body of the table */}
        <tbody>
          {/** Mapping the data */}
          {data.map((item, index) => {
            // Arrow function to handle the button click
            const handleClick = (foodItem: number) => {
              // Set the menu open
              setOpenRow((prev) => (prev === foodItem ? null : foodItem));
              // Store the food item
              setFood(foodItem);
            };

            return (
              // The food display
              <tr
                key={index}
                className="border-y border-neutral-300 font-bold relative"
              >
                {/** Display the information */}
                <td className="py-5">{item.Meal}</td>
                <td className="py-5 truncate max-w-20 sm:max-w-auto">
                  {capitalize(item.Name)}
                </td>
                {/** The menu opening button */}
                <td>
                  <Image
                    src="/menu-open.svg"
                    width={20}
                    height={20}
                    alt="Open menu icon"
                    onClick={() => handleClick(index)}
                  />
                </td>
                {/** If the button is cliked */}
                {openRow === index && (
                  // pop up container
                  <td className="absolute left-0 -bottom-20 z-10 w-full">
                    {/** The Food Menu container to display the rest of the information */}
                    <FoodMenu label={label} data={data} food={food} />
                  </td>
                )}
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
};

export default FoodEntriesList;
