const HeaderSqueleton = () => {
  return (
    // Header container
    <div className="py-9 pl-12 border-b border-neutral-300 space-y-4">
      {/** Displays the current page name */}
      <div className="h-6 w-32 bg-gray-200 animate-pulse rounded"></div>
      {/** Displays a nice greeting message */}
      <div className="h-6 w-20 bg-gray-200 animate-pulse rounded"></div>
    </div>
  );
};

export default HeaderSqueleton;
