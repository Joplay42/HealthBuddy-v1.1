"use client";
import { Calories, Weight, Workout } from "@/components";

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
        <Workout />
        <Weight />
      </div>
    </>
  );
};

export default Home;
