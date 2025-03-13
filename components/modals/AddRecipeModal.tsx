"use client";
import React, { useState } from "react";
import { SelectFood, InitialForm, Modal, Final } from "@/components";
import { recipeProps } from "@/types";

const AddRecipeModal = () => {
  const [index, setIndex] = useState<number>(1);
  // States for  the recipe object
  const [recipe, setRecipe] = useState<recipeProps>({
    Name: "",
    NbServing: 0,
  });

  return (
    <Modal
      title={recipe.Name || "New recipe + "}
      backButton={true}
      route="recipe"
    >
      {index === 1 ? (
        <InitialForm
          recipe={recipe}
          setRecipe={setRecipe}
          index={index}
          setIndex={setIndex}
        />
      ) : index === 2 ? (
        <SelectFood
          recipe={recipe}
          setRecipe={setRecipe}
          index={index}
          setIndex={setIndex}
        />
      ) : (
        <Final index={index} setIndex={setIndex} />
      )}
    </Modal>
  );
};

export default AddRecipeModal;
