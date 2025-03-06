"use client";
// Component imports
import { FoodEntriesList, FoodEntriesSqueleton } from "@/components";
// constant imports
import { foodEntriesLabel } from "@/constant";
import { useUserConsumedFooodContext } from "@/context/UserConsumedFoodContext";
import { useRouter } from "next/navigation";

/**
 * This component is the component to display the current food list. This component
 * is using a foodList constant which will eventually become an api fecth.
 *
 * @param foodList this list will be the main food in the app
 * @returns
 */
const FoodEntries = () => {
  // Router hooks to manage navigation
  const router = useRouter();
  // Fetch the userConsumedFood
  const { userConsumedFood, loading } = useUserConsumedFooodContext();

  if (loading) {
    return <FoodEntriesSqueleton />;
  }

  return (
    // Food entries container

    <div className="bg-white p-5 rounded-3xl border border-neutral-400">
      <div className="flex items-center justify-between mb-10">
        {/** title */}
        <h1 className="font-bold text-xl">Food entries</h1>
        {/** Button to add  a new food item */}
        <button
          className="w-fit bg-black text-white px-3 py-2 rounded-2xl text-center hover:opacity-75 hover:cursor-pointer"
          onClick={() =>
            router.push("?modal=food", {
              scroll: false,
            })
          }
        >
          Add food +
        </button>
      </div>
      {/** This component fetches all the food and display it */}
      <FoodEntriesList label={foodEntriesLabel} data={userConsumedFood} />
    </div>
  );
};

export default FoodEntries;
