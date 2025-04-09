"use client";
import { useRouter } from "next/navigation";
import { Dispatch, SetStateAction } from "react";

const FoodModalNavigation = ({
  page,
  setPage,
}: {
  page: string;
  setPage: (newIndex: string) => void;
}) => {
  const router = useRouter();

  return (
    <div className="grid grid-cols-2 text-center text-neutral-600 text-lg md:text-xl font-semibold">
      <button
        className={`border border-neutral-200 py-2 md:py-6 transition-all duration-300 ease-in-out ${
          page === "search" ? "bg-custom-green opacity-100" : "opacity-80"
        }`}
        onClick={() => setPage("search")}
      >
        Search
      </button>
      <button
        className={`border border-neutral-200 py-2 md:py-6 transition-all duration-300 ease-in-out ${
          page === "recipe" ? "bg-custom-green opacity-100" : "opacity-80"
        }`}
        onClick={() => setPage("recipe")}
      >
        My recipe
      </button>
    </div>
  );
};

export default FoodModalNavigation;
