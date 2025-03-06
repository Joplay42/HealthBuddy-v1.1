const CalorieSqueleton = () => {
  return (
    <div className="flex flex-wrap justify-between items-center gap-x-6">
      <div className="flex flex-wrap gap-10 items-center">
        <div className="w-60 h-60 relative rounded-full overflow-hidden">
          {/* Skeleton placeholder for PieChart */}
          <div className="w-full h-full border-[24px] border-gray-200 rounded-full animate-pulse"></div>
          <div className="absolute bottom-1/2 right-1/2 translate-x-1/2 translate-y-1/2 text-center">
            {/* Placeholder for caloriesRemaining */}
            <h1 className="font-bold text-4xl text-gray-300">--</h1>
            <p className="text-gray-300">Remaining</p>
          </div>
        </div>
        <div className="flex flex-wrap gap-6 py-6 lg:flex-col lg:space-y-4">
          <div className="flex space-x-1">
            {/* Placeholder for objective */}
            <div className="w-6 h-6 rounded-full bg-gray-200 animate-pulse"></div>
            <p className="font-light text-lg text-gray-300">
              Objective:{" "}
              <span className="font-extrabold text-neutral-300 text-xl">
                --
              </span>
            </p>
          </div>
          <div className="flex space-x-1">
            {/* Placeholder for calories consumed */}
            <div className="w-6 h-6 rounded-full bg-gray-200 animate-pulse"></div>
            <p className="font-light text-lg text-gray-300">
              Consumed:{" "}
              <span className="font-extrabold text-neutral-300 text-xl">
                --
              </span>
            </p>
          </div>
        </div>
      </div>
      <div className="flex flex-col w-full 2xl:w-96 space-y-4">
        {/* Placeholders for BarChart with gradient shimmer */}
        <div className="h-6 bg-gray-200 animate-pulse rounded"></div>
        <div className="h-6 bg-gray-200 animate-pulse rounded"></div>
        <div className="h-6 bg-gray-200 animate-pulse rounded"></div>
      </div>
    </div>
  );
};

export default CalorieSqueleton;
