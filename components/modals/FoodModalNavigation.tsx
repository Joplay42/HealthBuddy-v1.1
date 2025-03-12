"use client";
import { useRouter } from "next/navigation";
import { Dispatch, SetStateAction } from "react";

const FoodModalNavigation = ({
  page,
  setPage,
}: {
  page: string;
  setPage: Dispatch<SetStateAction<string>>;
}) => {
  const router = useRouter();

  return (
    <div className="grid grid-cols-2 text-center text-neutral-600 text-xl font-semibold">
      <button
        className={`border border-neutral-200 py-6 ${
          page === "food" && `bg-custom-green`
        }`}
        onClick={() => router.push("?modal=food", { scroll: false })}
      >
        Search
      </button>
      <button
        className={`border border-neutral-200 py-6 ${
          page === "recipe" && `bg-custom-green`
        }`}
        onClick={() => router.push("?modal=recipe", { scroll: false })}
      >
        My recipe
      </button>
    </div>
  );
};

export default FoodModalNavigation;
