"use client";
import {
  ConsumedLoading,
  FoodItemCard,
  FoodItemCardSqueleton,
  Pagination,
  SearchBar,
} from "@/components";
import { foodItemFetchedProps, foodProps } from "@/types";
import { useRouter, useSearchParams } from "next/navigation";
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";

const AddFood = ({
  setConsumedLoading,
}: {
  setConsumedLoading: Dispatch<SetStateAction<boolean>>;
}) => {
  // Naviagtion router
  const router = useRouter();

  // Search params hooks from next/navigation
  const searchParams = useSearchParams();
  // Get the params
  const searchQuery = searchParams.get("search");

  // Hooks for the search term
  const [searchTerm, setSearchTerm] = useState("");
  const [foodList, setFoodList] = useState<foodItemFetchedProps[]>([]);

  // No result found error
  const [error, setError] = useState("");

  // Loading state
  const [loading, setLoading] = useState(false);

  // Pagination states
  const [currentPage, setCurrentPage] = useState(0);
  // Calculate the total pages
  const [totalPages, setTotalPages] = useState(0);
  // Ref hooks to handle the scroll back
  const modalContentRef = useRef<HTMLDivElement>(null);

  // Function to handle previous and next
  const handlePageChange = async (newPage: number) => {
    if (searchQuery) {
      if (modalContentRef.current) {
        modalContentRef.current.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
      await getFood(searchQuery, newPage);
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
      const res = await fetch(`/api/foods?search=${term}`);

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message);
      }

      // Storing the data
      const data = await res.json();

      setFoodList(data.foodList);
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
            router.push(`?modal=food&index=search&search=${searchTerm}`);
          } else {
            router.push("?modal=food&index=search");
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
            <FoodItemCard
              setConsumedLoading={setConsumedLoading}
              food={item}
              key={index}
            />
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
