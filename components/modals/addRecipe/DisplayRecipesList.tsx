"use client";
import { FoodItemCardSqueleton, RecipeItemCard } from "@/components";
import { useUserRecipesContext } from "@/context/UserRecipesContext";
import React from "react";

const DisplayRecipesList = () => {
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
        <RecipeItemCard recipe={item} key={index} />
      ))}
    </>
  );
};

export default DisplayRecipesList;
