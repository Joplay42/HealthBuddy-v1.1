"use client";
import {
  Modal,
  FoodModalNavigation,
  FoodSearch,
  RecipeSearch,
} from "@/components";
import { UserRecipesProvider } from "@/context/UserRecipesContext";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const FoodModal = () => {
  // Hooks for the navigation
  const pathName = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();
  // Get the params
  const index = searchParams.get("index") || "search";

  // Function to update the params state
  const updateParams = (newIndex: string) => {
    const params = new URLSearchParams(searchParams);

    // Set the new index
    if (newIndex) params.set("index", newIndex);

    // Redirect the route
    router.replace(`${pathName}?${params.toString()}`, { scroll: false });
  };

  return (
    <Modal title="Add food +">
      <FoodModalNavigation page={index} setPage={updateParams} />
      {index === "search" && <FoodSearch />}
      {index === "recipe" && (
        <UserRecipesProvider>
          <RecipeSearch />
        </UserRecipesProvider>
      )}
    </Modal>
  );
};

export default FoodModal;
