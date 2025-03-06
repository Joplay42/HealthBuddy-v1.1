import Image from "next/image";

const FoodEntriesListSqueleton = () => {
  return (
    <>
      {/** A table to display the category and foods */}
      {/** The large screen table */}
      <table className="hidden lg:table lg:table-fixed w-full text-left">
        <thead>
          {/** The head of the table */}
          <tr className="font-semibold text-neutral-400">
            <td className="pr-10">
              <div className="h-6 w-10 bg-gray-200 animate-pulse rounded mb-2"></div>
            </td>
            <td className="pr-10">
              <div className="h-6 w-20 bg-gray-200 animate-pulse rounded mb-2"></div>
            </td>
            <td className="pr-10">
              <div className="h-6 w-10 bg-gray-200 animate-pulse rounded mb-2"></div>
            </td>
            <td className="pr-10">
              <div className="h-6 w-10 bg-gray-200 animate-pulse rounded mb-2"></div>
            </td>
            <td className="pr-10">
              <div className="h-6 w-10 bg-gray-200 animate-pulse rounded mb-2"></div>
            </td>
            <td className="pr-10">
              <div className="h-6 w-10 bg-gray-200 animate-pulse rounded mb-2"></div>
            </td>
            <td>
              <div className="h-6 w-full bg-gray-200 animate-pulse rounded mb-2"></div>
            </td>
          </tr>
        </thead>
        {/** The body of the table for the food list */}
        <tbody>
          {/** A single row */}
          <tr className="font-semibold text-neutral-400">
            <td className="pr-10">
              <div className="h-6 w-10 bg-gray-200 animate-pulse rounded mb-2"></div>
            </td>
            <td className="pr-10">
              <div className="h-6 w-20 bg-gray-200 animate-pulse rounded mb-2"></div>
            </td>
            <td className="pr-10">
              <div className="h-6 w-10 bg-gray-200 animate-pulse rounded mb-2"></div>
            </td>
            <td className="pr-10">
              <div className="h-6 w-10 bg-gray-200 animate-pulse rounded mb-2"></div>
            </td>
            <td className="pr-10">
              <div className="h-6 w-10 bg-gray-200 animate-pulse rounded mb-2"></div>
            </td>
            <td className="pr-10">
              <div className="h-6 w-10 bg-gray-200 animate-pulse rounded mb-2"></div>
            </td>
            <td>
              <div className="h-6 w-full bg-gray-200 animate-pulse rounded mb-2"></div>
            </td>
          </tr>
        </tbody>
      </table>
      {/** The mobile tabble */}
      <table className="lg:hidden w-full text-left">
        {/** The header of the table */}
        <thead>
          {/** A single row */}
          <tr className="font-semibold text-neutral-400">
            {/** Display of only the first and second categories */}
            <td className="h-6 w-20 bg-gray-200 animate-pulse rounded"></td>
          </tr>
        </thead>
        {/** Body of the table */}
        <tbody>
          {/** The food display */}
          <tr className="border-y border-neutral-300 font-bold relative">
            {/** Display the information */}
            <td className="h-6 w-20 bg-gray-200 animate-pulse rounded"></td>
          </tr>
        </tbody>
      </table>
    </>
  );
};

export default FoodEntriesListSqueleton;
