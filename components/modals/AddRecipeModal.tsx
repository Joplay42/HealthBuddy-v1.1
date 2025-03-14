"use client";
import React, { useEffect, useState } from "react";
import { SelectFood, InitialForm, Modal, Final } from "@/components";
import { recipeProps } from "@/types";
import { useRouter, useSearchParams } from "next/navigation";

const AddRecipeModal = () => {
  // States for  the recipe object
  const [recipe, setRecipe] = useState<recipeProps>({
    Name: "",
    NbServing: 0,
  });
  // Params hooks from Next/Navigation
  const searchParams = useSearchParams();
  // Router hooks
  const router = useRouter();

  // Makes sure to preserve the existing params
  const params = new URLSearchParams(searchParams.toString());

  // Set the initial index
  const indexParams = searchParams.get("index");

  // States for the index
  const [index, setIndex] = useState<number>(1);

  // Keep the params sync with the index
  useEffect(() => {
    if (indexParams !== null) {
      const parsedIndex = parseInt(indexParams);
      setIndex(parsedIndex);
    }
  }, [indexParams]);

  // Function to update the index
  const updateIndex = (newIndex: number) => {
    if (newIndex <= 3) {
      setIndex(newIndex);
      params.set("index", newIndex.toString());
      router.push(`?${params.toString()}`, { scroll: false });
    } else {
      setIndex(0);
      params.delete("index");
      params.set("modal", "recipe");
      router.push(`?${params.toString()}`, { scroll: false });
    }
  };

  return (
    <>
      {index !== 0 && (
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
              setIndex={updateIndex}
            />
          ) : index === 2 ? (
            <SelectFood
              recipe={recipe}
              setRecipe={setRecipe}
              index={index}
              setIndex={updateIndex}
            />
          ) : (
            <Final index={index} setIndex={updateIndex} />
          )}
        </Modal>
      )}
    </>
  );
};

export default AddRecipeModal;
