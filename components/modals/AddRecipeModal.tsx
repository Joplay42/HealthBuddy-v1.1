"use client";
import React, { useEffect, useState } from "react";
import { SelectFood, InitialForm, Modal, Final } from "@/components";
import { recipeProps } from "@/types";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const AddRecipeModal = () => {
  // Hooks for the navigation
  const pathName = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();
  // Get the params
  const index = searchParams.get("index") || "1";

  // Function to update the params state
  const updateParams = (newIndex: string) => {
    const params = new URLSearchParams(searchParams);

    // Set the new index
    if (newIndex) params.set("index", newIndex);

    // Redirect the route
    router.push(`${pathName}?${params.toString()}`, { scroll: false });
  };

  // States for  the recipe object
  const [recipe, setRecipe] = useState<recipeProps>({
    Name: "",
    NbServing: 0,
  });

  return (
    <>
      <Modal
        title={recipe.Name || "New recipe + "}
        backButton={true}
        route="recipe"
      >
        {index === "1" && (
          <InitialForm
            recipe={recipe}
            setRecipe={setRecipe}
            setIndex={updateParams}
          />
        )}
        {index === "2" && (
          <SelectFood
            recipe={recipe}
            setRecipe={setRecipe}
            setIndex={updateParams}
          />
        )}
        {index === "3" && <Final />}
      </Modal>
    </>
  );
};

export default AddRecipeModal;
