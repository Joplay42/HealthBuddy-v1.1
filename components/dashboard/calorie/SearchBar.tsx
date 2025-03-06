// Props imports
import { SearchBarProps } from "@/types";
// NextJs image imports
import Image from "next/image";

/**
 * This component is a searchBar to search to food to fetch by the user. It uses
 * states to set the searchTerms.
 *
 * @param searchTerm the searchTerms to describe the food
 * @param setSearchTerm the searchTerms action to change the food
 * @returns
 */
const SearchBar = ({ searchTerm, setSearchTerm, onSubmit }: SearchBarProps) => {
  // The submit handling method
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit();
  };

  return (
    // The container
    <form
      onSubmit={handleSubmit}
      className="border-2 border-neutral-300 rounded-full flex items-center justify-between px-2 gap-x-2 "
    >
      {/** The search icon */}
      <button
        type="submit"
        className="hover:cursor-pointer focus:outline-none "
      >
        <Image
          src="/search-icon.svg"
          width={20}
          height={20}
          alt="Search icon"
          className="hover:cursor-pointer"
        />
      </button>
      {/** The input to search the food */}
      <input
        type="text"
        className="no-focus-styles"
        placeholder="Ex. Banana"
        value={searchTerm}
        // Set the searchTerms
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      {/** The cancel icon to reset the search */}
      <div
        className="group hover:cursor-pointer"
        onClick={() => {
          setSearchTerm("");
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="#909090"
          className="w-6 h-6 group-hover:stroke-red-600"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
          />
        </svg>
      </div>
    </form>
  );
};

export default SearchBar;
