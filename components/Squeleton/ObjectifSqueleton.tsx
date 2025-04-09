const ObjectifSqueleton = () => {
  return (
    // The objective cards container
    <div
      className="bg-white p-5 rounded-3xl border border-neutral-400 flex flex-col justify-between"
      data-aos="fade-up"
      data-aos-duration="300"
    >
      <div>
        {/** The title of the card */}
        <div className="h-6 bg-gray-200 animate-pulse rounded w-20 mb-10"></div>
        {/** A grid to display each info */}
        <div className="lg:grid grid-cols-2 gap-10 pb-7">
          {/** The first item display */}
          <div className="grid grid-cols-2 md:block items-center">
            <p className="font-light text-lg text-gray-300">Objective:</p>
            <div className="h-6 bg-gray-200 animate-pulse rounded w-20 mt-2"></div>
          </div>
          {/** The second item display */}
          <div className="grid grid-cols-2 md:block items-center">
            <p className="font-light text-lg text-gray-300">Protein:</p>
            <div className="h-6 bg-gray-200 animate-pulse rounded w-20 mt-2"></div>
          </div>
          {/** The third item display */}
          <div className="grid grid-cols-2 md:block items-center">
            <p className="font-light text-lg text-gray-300">Carbs:</p>
            <div className="h-6 bg-gray-200 animate-pulse rounded w-20 mt-2"></div>
          </div>
          {/** The last item display */}
          <div className="grid grid-cols-2 md:block items-center">
            <p className="font-light text-lg text-gray-300">Fat:</p>
            <div className="h-6 bg-gray-200 animate-pulse rounded w-20 mt-2"></div>
          </div>
        </div>
      </div>
      {/** Button to change the objective */}
      <div className="h-10 bg-gray-200 animate-pulse rounded"></div>
    </div>
  );
};

export default ObjectifSqueleton;
