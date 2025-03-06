"use client";
import { Calories } from "@/components";

/**
 * This component is used to display the home page in the dashboard so I can use hooks
 * instead in a page react component.
 *
 * @returns
 */
const Home = () => {
  return (
    <>
      <div className="lg:grid grid-cols-3 grid-rows-2 py-5 lg:py-10 space-y-5 lg:space-y-0 lg:gap-10">
        <Calories />
        <div className=" row-span-2 w-full h-full bg-white p-5 rounded-3xl border border-neutral-400"></div>
        <div className="col-span-2 w-full h-full bg-white p-5 rounded-3xl border border-neutral-400"></div>
      </div>
    </>
  );
};

export default Home;
