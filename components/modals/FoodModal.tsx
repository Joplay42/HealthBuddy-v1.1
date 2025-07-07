"use client";
import {
  Modal,
  FoodModalNavigation,
  FoodSearch,
  RecipeSearch,
  ConsumedLoading,
  LibrarySearch,
} from "@/components";
import { UserFoodProvider } from "@/context/UserFoodContext";
import { UserRecipesProvider } from "@/context/UserRecipesContext";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

const FoodModal = () => {
  // Hooks for the navigation
  const pathName = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();
  // Get the params
  const index = searchParams.get("index") || "search";

  // Loading state for the consuming food
  const [consumeLoading, setConsumedLoading] = useState(false);

  // Function to update the params state
  const updateParams = (newIndex: string) => {
    const params = new URLSearchParams(searchParams);

    // Set the new index
    if (newIndex) params.set("index", newIndex);

    // Redirect the route
    router.replace(`${pathName}?${params.toString()}`, { scroll: false });
  };

  return (
    <>
      {consumeLoading && <ConsumedLoading />}
      <Modal title="Add food +">
        <FoodModalNavigation page={index} setPage={updateParams} />
        {index === "search" && (
          <FoodSearch setConsumedLoading={setConsumedLoading} />
        )}
        {index === "library" && (
          <UserFoodProvider>
            <LibrarySearch setConsumedLoading={setConsumedLoading} />
          </UserFoodProvider>
        )}
        {index === "recipe" && (
          <UserRecipesProvider>
            <RecipeSearch setConsumedLoading={setConsumedLoading} />
          </UserRecipesProvider>
        )}
      </Modal>
    </>
  );
};

export default FoodModal;
