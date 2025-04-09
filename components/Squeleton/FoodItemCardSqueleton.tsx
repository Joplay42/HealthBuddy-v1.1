const FoodItemCardSqueleton = () => {
  return (
    // Grid container
    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-y-6 lg:gap-y-0 items-center justify-between py-5 border-neutral-300 border-t animate-fade-in">
      {/** Food name */}
      <div className="text-lg w-40 space-y-4">
        <div className="h-6 w-20 bg-gray-200 animate-pulse rounded"></div>
        <div className="h-6 w-10 bg-gray-200 animate-pulse rounded"></div>
      </div>
      {/** Food calorie chart */}
      <div className="flex items-center space-x-4 justify-self-end sm:justify-self-auto">
        <div className="w-16 h-16 border-[12px] border-gray-200 rounded-full animate-pulse"></div>
        <div className="h-6 w-20 bg-gray-200 animate-pulse rounded"></div>
      </div>
      {/** Food nutrient informations */}
      <div className="flex items-center gap-x-4 md:col-span-2 sm:justify-self-center">
        <div className="text-center space-y-2">
          <div className="h-6 w-16 bg-gray-200 animate-pulse rounded"></div>
          <div className="h-6 w-10 bg-gray-200 animate-pulse rounded"></div>
        </div>
        <div className="text-center space-y-2">
          <div className="h-6 w-16 bg-gray-200 animate-pulse rounded"></div>
          <div className="h-6 w-10 bg-gray-200 animate-pulse rounded"></div>
        </div>
        <div className="text-center space-y-2">
          <div className="h-6 w-16 bg-gray-200 animate-pulse rounded"></div>
          <div className="h-6 w-10 bg-gray-200 animate-pulse rounded"></div>
        </div>
      </div>
      {/** Food qty input */}
      <div className="flex flex-col lg:items-center justify-self-end sm:justify-self-auto lg:justify-self-end space-y-2">
        <div className="h-6 w-10 bg-gray-200 animate-pulse rounded"></div>
        <div className="h-10 w-20 bg-gray-200 animate-pulse rounded"></div>
      </div>
      {/** Add button */}
      <div className="bg-gray-200 animate-pulse rounded-xl text-2xl h-10 lg:h-16 w-full lg:w-12 col-span-2 sm:col-span-3 lg:col-span-1 lg:justify-self-end"></div>
    </div>
  );
};

export default FoodItemCardSqueleton;
