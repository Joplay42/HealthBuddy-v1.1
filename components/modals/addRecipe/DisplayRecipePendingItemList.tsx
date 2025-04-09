import { PendingItemListSqueleton, RecipeFoodItemCard } from "@/components";
import { useUserPendingItemContext } from "@/context/UserPendingItemContext";
import { foodProps } from "@/types";
import React from "react";

const DisplayRecipePendingItemList = ({
  action,
}: {
  action: (food: foodProps) => void;
}) => {
  // fetch the pending item using my api and context pprovider TO DO
  const { pendingItem, loading } = useUserPendingItemContext();

  if (loading) {
    return <PendingItemListSqueleton />;
  }

  return (
    <div>
      <h4 className="font-bold text-md md:text-lg text-neutral-500 my-1 md:my-4">
        pending approval ({pendingItem.length})
        <div className="group relative inline-block items-center">
          <button className="text-neutral-500">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="size-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z"
              />
            </svg>
          </button>
          <div className="font-normal w-60 bg-white absolute bottom-full mb-1 left-1/2 transform -translate-x-1/2 border border-neutral-300 text-neutral-500 text-sm rounded-lg px-3 py-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300  pointer-events-none">
            To maintain data integrity, an admin will review and approve new
            food entries before they are added.
          </div>
        </div>
      </h4>
      {pendingItem.map((item, index) => (
        <RecipeFoodItemCard food={item} key={index} action={action} />
      ))}
    </div>
  );
};

export default DisplayRecipePendingItemList;
