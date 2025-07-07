"use client";
import { useRouter } from "next/navigation";
import Image from "next/image";

const FoodModalNavigation = ({
  page,
  setPage,
}: {
  page: string;
  setPage: (newIndex: string) => void;
}) => {
  const router = useRouter();

  return (
    <div className="grid grid-cols-3 text-center text-neutral-600 text-md md:text-lg lg:text-xl font-semibold">
      <button
        className={`border border-neutral-200 py-2 md:py-6 transition-all duration-300 ease-in-out flex items-center justify-center space-x-2 ${
          page === "search" ? "bg-custom-green opacity-100" : "opacity-80"
        }`}
        onClick={() => setPage("search")}
      >
        <Image src="/search.svg" width={20} height={20} alt="Search icon" />
        <p>Search</p>
      </button>
      <button
        className={`border border-neutral-200 py-2 md:py-6 transition-all duration-300 ease-in-out flex items-center justify-center space-x-2 ${
          page === "library" ? "bg-custom-green opacity-100" : "opacity-80"
        }`}
        onClick={() => setPage("library")}
      >
        <Image src="/library.svg" width={20} height={20} alt="Search icon" />
        <p>Library</p>
      </button>
      <button
        className={`border border-neutral-200 py-2 md:py-6 transition-all duration-300 ease-in-out flex items-center justify-center space-x-2 ${
          page === "recipe" ? "bg-custom-green opacity-100" : "opacity-80"
        }`}
        onClick={() => setPage("recipe")}
      >
        <Image src="/recipe.svg" width={20} height={20} alt="Search icon" />
        <p>Recipes</p>
      </button>
    </div>
  );
};

export default FoodModalNavigation;
