"use client";
import {
  FoodCard,
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
  const [currentPage, setCurrentPage] = useState(1);

  // Calculate the total pages
  const [totalPages, setTotalPages] = useState(0);
  // Ref hooks to handle the scroll back
  const modalContentRef = useRef<HTMLDivElement>(null);

  // function to handle the nextPage
  const handleNext = () => {
    if (currentPage < totalPages) {
      if (modalContentRef.current) {
        modalContentRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
      }
      getFood(searchQuery!, currentPage + 1);
    }
  };

  // Function to handle the previous page
  const handlePrev = () => {
    if (currentPage > 1) {
      if (modalContentRef.current) {
        modalContentRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
      }
      getFood(searchQuery!, currentPage - 1);
    }
  };

  // UseEffect hooks to check if the url has params to fetch teh data
  useEffect(() => {
    if (searchQuery) {
      setSearchTerm(searchQuery);
      getFood(searchQuery, 1);
    } else {
      setSearchTerm("");
      setError("");
      setFoodList([]);
      setCurrentPage(1);
      setTotalPages(0);
    }
  }, [searchQuery]);

  // The new API food fetching with the custom API we created
  const getFood = async (term: string, page: number = 1) => {
    setFoodList([]);
    setLoading(true);
    setError("");

    try {
      const res = await fetch(`/api/foods?search=${term}&page=${page}`);

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message);
      }

      const data = await res.json();

      setFoodList(data.foodList);
      setCurrentPage(data.currentPage);
      setTotalPages(data.totalPages);
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
        className="my-2 md:my-4 text-md md:text-lg w-fit bg-black dark:bg-lime text-white dark:text-ink-950 px-3 md:px-4 py-2 md:py-3 rounded-2xl text-center hover:opacity-75 hover:cursor-pointer"
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
          <h4 className="font-bold text-md md:text-lg text-neutral-500 dark:text-white/55 my-1 md:my-4">
            Results ({foodList.length})
          </h4>
        )}
        {loading &&
          Array(10)
            .fill(0)
            .map((_, index) => <FoodItemCardSqueleton key={index} />)}
        {!error ? (
          foodList?.map((item, index) => (
            <FoodCard
              item={item}
              key={index}
              setConsumedLoading={setConsumedLoading}
              isSelectable={false}
            />
          ))
        ) : (
          <p className="text-red-500">{error}</p>
        )}
      </div>
      <Pagination
        handlePrev={handlePrev}
        handleNext={handleNext}
        totalPage={totalPages}
        currentPage={currentPage}
      />
    </div>
  );
};

export default AddFood;
