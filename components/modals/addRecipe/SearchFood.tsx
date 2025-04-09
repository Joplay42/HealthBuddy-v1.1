"use client";
import {
  FoodItemCard,
  DisplayPendingItemList,
  SearchBar,
  FoodItemCardSqueleton,
  RecipeFoodItemCard,
  DisplayRecipePendingItemList,
  Pagination,
} from "@/components";
import { foodProps } from "@/types";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";

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

  // Pagination states
  const [currentPage, setCurrentPage] = useState(0);
  // Calculate the total pages
  const [totalPages, setTotalPages] = useState(0);
  // Ref hooks to handle the scroll back
  const modalContentRef = useRef<HTMLDivElement>(null);

  // Function to handle previous and next
  const handlePageChange = (newPage: number) => {
    if (searchQuery) {
      if (modalContentRef.current) {
        modalContentRef.current.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
      getFood(searchQuery, newPage);
    }
  };

  // Search results stored
  const [foodList, setFoodList] = useState<foodProps[]>([]);

  // UseEffect hooks to check if the url has params to fetch teh data
  useEffect(() => {
    if (searchQuery) {
      setSearchTerm(searchQuery);
      getFood(searchQuery, 0);
    } else {
      setSearchTerm("");
      setError("");
      setFoodList([]);
      setCurrentPage(0);
      setTotalPages(0);
    }
  }, [searchQuery]);

  // The new API food fetching with the custom API we created
  const getFood = async (term: string, page: number) => {
    setFoodList([]);
    setLoading(true);
    setError("");

    try {
      // Fetching the API
      const res = await fetch(
        `/api/foods?search=${term}&page=${page}&limit=10`
      );

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message);
      }

      // Storing the data
      const data = await res.json();

      setFoodList(data.foodList);
      setCurrentPage(data.page);
      setTotalPages(data.totalPage);
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="relative w-full px-2 md:p-5 animate-fade-in"
      ref={modalContentRef}
    >
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
        className="my-2 md:my-4 text-md md:text-lg w-fit bg-black text-white px-3 md:px-4 py-2 md:py-3 rounded-2xl text-center hover:opacity-75 hover:cursor-pointer"
        onClick={() =>
          router.push("?modal=addfood", {
            scroll: false,
          })
        }
      >
        New food +
      </button>
      <div className="my-4 md:mt-5 lg:mt-10">
        <DisplayRecipePendingItemList action={addFood} />
        {foodList && (
          <h4 className="font-bold text-md md:text-lg text-neutral-500 my-1 md:my-4">
            Results ({foodList.length})
          </h4>
        )}
        {loading &&
          Array(10)
            .fill(0)
            .map((_, index) => <FoodItemCardSqueleton key={index} />)}
        {!error ? (
          foodList?.map((item, index) => (
            <RecipeFoodItemCard food={item} key={index} action={addFood} />
          ))
        ) : (
          <p className="text-red-500">{error}</p>
        )}
      </div>
      <Pagination
        handlePageChange={handlePageChange}
        totalPage={totalPages}
        currentPage={currentPage}
      />
    </div>
  );
};

export default SearchFood;
