import { PendingItemProvider } from "@/context/PendingItemContext";
import React from "react";
import { PendingItemList } from "@/components";

/**
 *
 * This component is used in the admin page, it is used to accept or delete the pending food item in
 * the databse.
 *
 * @returns
 */
const Pending = () => {
  return (
    <>
      <div className="col-span-2 w-full h-full ">
        <div className="flex items-center justify-between pb-5">
          {/** Title of the container */}
          <h1 className="font-bold text-xl">Pending items</h1>
        </div>
        <div className="bg-white p-5 rounded-3xl border border-neutral-400">
          <PendingItemProvider>
            <PendingItemList />
          </PendingItemProvider>
        </div>
      </div>
    </>
  );
};

export default Pending;
