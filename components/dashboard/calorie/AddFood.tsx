"use client";
import {
  DisplayPendingItemList,
  FoodItemCard,
  FoodItemCardSqueleton,
  Pagination,
  SearchBar,
} from "@/components";
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

  // Pagination states
  const [currentPage, setCurrentPage] = useState(0);
  // Calculate the total pages
  const [totalPages, setTotalPages] = useState(0);

  // Function to handle previous and next
  const handlePageChange = (newPage: number) => {
    if (searchQuery) {
      getFood(searchQuery, newPage);
    }
  };

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
    <div className="w-full p-5">
      <SearchBar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        onSubmit={() => {
          if (searchTerm) {
            router.push(`?modal=food&index=search&search=${searchTerm}`);
          } else {
            router.push("?modal=food&index=search");
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
        <DisplayPendingItemList />
        {foodList && (
          <h4 className="font-bold text-lg text-neutral-500 my-4">
            Results ({foodList.length})
          </h4>
        )}
        {loading && <FoodItemCardSqueleton />}
        {!error ? (
          foodList?.map((item, index) => (
            <FoodItemCard food={item} key={index} />
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

export default AddFood;
