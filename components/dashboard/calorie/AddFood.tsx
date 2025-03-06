"use client";
import { FoodItemCard, FoodItemCardSqueleton, SearchBar } from "@/components";
import { foodProps } from "@/types";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const AddFood = () => {
  // Naviagtion router
  const router = useRouter();

  // Search params hooks from next/navigation
  const searchParams = useSearchParams();
  // Get the params
  const searchQuery = searchParams.get("search");

  // Hooks for the search term
  const [searchTerm, setSearchTerm] = useState("");
  const [foodList, setFoodList] = useState<foodProps[]>([]);

  // No result found error
  const [error, setError] = useState("");

  // Loading state
  const [loading, setLoading] = useState(false);

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
      <h1 className="font-semibold text-2xl text-center mb-10">Add food +</h1>
      <SearchBar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        onSubmit={() => {
          router.push(`?modal=food&search=${searchTerm}`);
        }}
      />
      <button
        className="my-4 text-lg w-fit bg-black text-white px-4 py-3 rounded-2xl text-center hover:opacity-75 hover:cursor-pointer"
        onClick={() =>
          router.push("?modal=add", {
            scroll: false,
          })
        }
      >
        New food +
      </button>
      <div className="mt-10">
        {loading && <FoodItemCardSqueleton />}
        {!error ? (
          foodList?.map((item, index) => (
            <FoodItemCard food={item} key={index} />
          ))
        ) : (
          <p className="text-red-500">{error}</p>
        )}
      </div>
    </div>
  );
};

export default AddFood;
