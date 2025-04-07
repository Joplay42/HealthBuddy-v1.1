"use client";
import React, { useEffect, useState } from "react";
import {
  Item,
  Pagination,
  PendingItemListSqueleton,
  SearchBar,
} from "@/components";
import { useRouter, useSearchParams } from "next/navigation";
import { foodProps } from "@/types";

/**
 *
 * This components is used to for the Admin page, it is used to search for an element in the database
 * and then you can delete or modify it.
 *
 * @returns
 */
const Live = () => {
  // Hooks for the search term
  const [searchTerm, setSearchTerm] = useState("");

  const [foodList, setFoodList] = useState<foodProps[]>([]);
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

  // No result found error
  const [error, setError] = useState("");
  // Search params hooks from next/navigation
  const searchParams = useSearchParams();
  // Get the params
  const searchQuery = searchParams.get("search");
  // Naviagtion router
  const router = useRouter();

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
    <>
      <div className="w-full h-full ">
        <div className="flex items-center justify-between pb-5">
          {/** Title of the container */}
          <h1 className="font-bold text-xl">Live items</h1>
        </div>
        <div className="bg-white p-5 rounded-3xl border border-neutral-400">
          <SearchBar
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            onSubmit={() => {
              router.push(`?search=${searchTerm}`);
            }}
          />
          <div className="mt-10">
            {foodList && (
              <h4 className="font-bold text-lg text-neutral-500 my-4">
                Results ({foodList.length})
              </h4>
            )}
            {loading && <PendingItemListSqueleton />}
            {!error ? (
              foodList?.map((item, index) => (
                <Item
                  item={item}
                  key={index}
                  onApprove={() => {}}
                  onChange={(updatedItem: foodProps) => {}}
                  onDelete={() => {}}
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
      </div>
    </>
  );
};

export default Live;
