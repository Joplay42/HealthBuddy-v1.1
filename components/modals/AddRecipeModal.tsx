"use client";
import React, { useEffect, useState } from "react";
import { SelectFood, InitialForm, Modal, Final, Summary } from "@/components";
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
    foods: [],
  });

  // UseEffect to on refresh restart the recipe
  useEffect(() => {
    if (!recipe.Name) {
      // Redirect the route
      router.push("?modal=addrecipe&index=1", { scroll: false });
    }
  }, [recipe, router]);

  return (
    <>
      <Modal title={"New recipe + "} backButton={true} route="recipe">
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
        {index === "3" && (
          <Summary
            recipe={recipe}
            setRecipe={setRecipe}
            setIndex={updateParams}
          />
        )}
        {index === "4" && <Final />}
      </Modal>
    </>
  );
};

export default AddRecipeModal;
