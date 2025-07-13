"use client";
import { FoodCard, FoodItemCardSqueleton } from "@/components";
import { useUserRecipesContext } from "@/context/UserRecipesContext";
import React, { Dispatch, SetStateAction } from "react";

const DisplayRecipesList = ({
  setConsumedLoading,
}: {
  setConsumedLoading: Dispatch<SetStateAction<boolean>>;
}) => {
  // Fetch the currents user recipe
  const { recipes, loading } = useUserRecipesContext();

  if (loading) return <FoodItemCardSqueleton />;
  if (recipes.length === 0)
    return (
      <h1 className="my-10 font-semibold text-xl text-center">
        No recipes has been found
      </h1>
    );

  return (
    <>
      {recipes.map((item, index) => (
        <FoodCard
          item={item}
          key={index}
          setConsumedLoading={setConsumedLoading}
          isSelectable={false}
        />
      ))}
    </>
  );
};

export default DisplayRecipesList;
