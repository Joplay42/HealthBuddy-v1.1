"use client";
import { DisplayRecipesList, FoodItemCardSqueleton } from "@/components";
import { useRouter } from "next/navigation";
import { Dispatch, SetStateAction } from "react";

const RecipeSearch = ({
  setConsumedLoading,
}: {
  setConsumedLoading: Dispatch<SetStateAction<boolean>>;
}) => {
  // Router hooks
  const router = useRouter();

  return (
    <div className="w-full px-5 pb-5">
      <button
        className="my-2 md:my-4 text-md md:text-lg w-fit bg-black text-white px-3 md:px-4 py-2 md:py-3 rounded-2xl text-center hover:opacity-75 hover:cursor-pointer"
        onClick={() =>
          router.push("?modal=addrecipe&index=1", {
            scroll: false,
          })
        }
      >
        New recipe +
      </button>
      <DisplayRecipesList setConsumedLoading={setConsumedLoading} />
    </div>
  );
};

export default RecipeSearch;
