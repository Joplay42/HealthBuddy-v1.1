"use client";
import React, { Dispatch, SetStateAction } from "react";
import { useRouter } from "next/navigation";
import DisplayLibraryList from "../dashboard/calorie/DisplayLibraryList";

const LibrarySearch = ({
  setConsumedLoading,
}: {
  setConsumedLoading: Dispatch<SetStateAction<boolean>>;
}) => {
  // Router hooks
  const router = useRouter();

  return (
    <div className="w-full px-5 pb-5">
      <button
        className="my-2 md:my-4 text-md md:text-lg w-fit bg-black text-white px-3 md:px-4 py-2 md:py-3 rounded-2xl text-center hover:opacity-75 hover:cursor-pointer"
        onClick={() =>
          router.push("?modal=addfood", {
            scroll: false,
          })
        }
      >
        New food +
      </button>
      <DisplayLibraryList setConsumedLoading={setConsumedLoading} />
    </div>
  );
};

export default LibrarySearch;
