"use client";
import Image from "next/image";
import React, { useState } from "react";

const Final = () => {
  // Loading states
  const [loading, setLoading] = useState(false);

  return (
    <div>
      <div className="flex flex-col items-center py-20">
        <Image src="/Final.svg" width={200} height={200} alt="Loading gif" />
        <h1 className="text-3xl text-custom-green font-bold">
          Congratulation!
        </h1>
        <p>Your new recipe has been created</p>
      </div>
      <button
        className="mx-4 lg:mx-10 my-8 flex items-center gap-2 justify-center py-4 px-3 rounded-xl hover:opacity-75 hover:transition ease-in-out duration-300 bg-black text-white w-[95%] disabled:opacity-60"
        type="submit"
        disabled={loading}
      >
        Go back
        {loading && (
          <Image src="/loading.gif" width={35} height={35} alt="Loading gif" />
        )}
      </button>
    </div>
  );
};

export default Final;
