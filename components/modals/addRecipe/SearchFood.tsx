"use client";
import {
  FoodItemCard,
  DisplayPendingItemList,
  SearchBar,
  FoodItemCardSqueleton,
  RecipeFoodItemCard,
  DisplayRecipePendingItemList,
} from "@/components";
import { foodProps } from "@/types";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const SearchFood = ({ addFood }: { addFood: (food: foodProps) => void }) => {
  // Hooks for the search term
  const [searchTerm, setSearchTerm] = useState("");
  // No result found error
  const [error, setError] = useState("");
  // Loading state
  const [loading, setLoading] = useState(false);
  // Router hooks for navigation
  const router = useRouter();
  // Search params hooks from next/navigation
  const searchParams = useSearchParams();
  // PathName hooks
  const pathName = usePathname();
  // Get the params
  const searchQuery = searchParams.get("term");

  // Search results stored
  const [foodList, setFoodList] = useState<foodProps[]>([]);

  // UseEffect hooks to check if the url has params to fetch teh data
  useEffect(() => {
    if (searchQuery) {
      setSearchTerm(searchQuery);
      getFood(searchQuery);
    } else {
      setSearchTerm("");
      setError("");
      setFoodList([]);
    }
  }, [searchQuery]);

  // The new API food fetching with the custom API we created
  const getFood = async (term: string) => {
    setFoodList([]);
    setLoading(true);
    setError("");

    try {
      // Fetching the API
      const res = await fetch(`/api/foods?search=${term}`);

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message);
      }

      // Storing the data
      const data = await res.json();

      setFoodList(data);
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full p-5">
      <SearchBar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        onSubmit={() => {
          if (searchTerm) {
            // Get the current params
            const currentParams = new URLSearchParams(window.location.search);
            currentParams.set("term", searchTerm);
            router.push(`${pathName}?${currentParams.toString()}`, {
              scroll: false,
            });
          } else {
            // Get the current params
            const currentParams = new URLSearchParams(window.location.search);
            currentParams.delete("term");
            router.push(`${pathName}?${currentParams.toString()}`, {
              scroll: false,
            });
          }
        }}
      />
      <button
        className="my-4 text-lg w-fit bg-black text-white px-4 py-3 rounded-2xl text-center hover:opacity-75 hover:cursor-pointer"
        onClick={() =>
          router.push("?modal=addfood", {
            scroll: false,
          })
        }
      >
        New food +
      </button>
      <div className="mt-10">
        <DisplayRecipePendingItemList action={addFood} />
        {foodList && (
          <h4 className="font-bold text-lg text-neutral-500 my-4">
            Results ({foodList.length})
          </h4>
        )}
        {loading && <FoodItemCardSqueleton />}
        {!error ? (
          foodList?.map((item, index) => (
            <RecipeFoodItemCard food={item} key={index} action={addFood} />
          ))
        ) : (
          <p className="text-red-500">{error}</p>
        )}
      </div>
    </div>
  );
};

export default SearchFood;
