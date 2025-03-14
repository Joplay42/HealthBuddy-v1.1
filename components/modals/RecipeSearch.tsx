"use client";
import { FoodItemCardSqueleton } from "@/components";
import { useRouter } from "next/navigation";

const RecipeSearch = () => {
  const router = useRouter();

  return (
    <div className="w-full p-5">
      <button
        className="my-4 text-lg w-fit bg-black text-white px-4 py-3 rounded-2xl text-center hover:opacity-75 hover:cursor-pointer"
        onClick={() =>
          router.push("?modal=addrecipe&index=1", {
            scroll: false,
          })
        }
      >
        New recipe +
      </button>
      <FoodItemCardSqueleton />
    </div>
  );
};

export default RecipeSearch;
