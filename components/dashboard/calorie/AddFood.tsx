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
  const [currentPage, setCurrentPage] = useState(0);
  const [nextUrl, setNextUrl] = useState<string | null>(null);
  const [urlStack, setUrlStack] = useState<string[]>([]);

  // Calculate the total pages
  const [totalPages, setTotalPages] = useState(0);
  // Ref hooks to handle the scroll back
  const modalContentRef = useRef<HTMLDivElement>(null);

  // function to handle the nextPage
  const handleNext = () => {
    if (nextUrl) {
      if (modalContentRef.current) {
        modalContentRef.current.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
      getFood(searchQuery!, currentPage + 1, nextUrl, true);
    }
  };

  // Function to handle the previous page
  const handlePrev = () => {
    if (urlStack.length >= 2) {
      if (modalContentRef.current) {
        modalContentRef.current.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
      const prevUrl = urlStack[urlStack.length - 2]; // The page before the current
      getFood(searchQuery!, currentPage - 1, prevUrl, false, true);
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
  const getFood = async (
    term: string,
    page: number,
    url?: string,
    isNext = false,
    isPrev = false
  ) => {
    setFoodList([]);
    setLoading(true);
    setError("");

    try {
      let fetchUrl = `/api/foods?search=${term}`;
      if (url) fetchUrl += `&url=${encodeURIComponent(url)}`;

      const res = await fetch(fetchUrl);

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message);
      }

      // Storing the data
      const data = await res.json();

      setFoodList(data.foodList);
      setNextUrl(data.nextUrl || null);
      setCurrentPage(page);

      setUrlStack((prev) => {
        if (isNext) {
          return [...prev, url!];
        } else if (isPrev) {
          return prev.slice(0, -1);
        } else {
          return [url || ""];
        }
      });

      setTotalPages(Math.ceil(data.count / 20));
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
