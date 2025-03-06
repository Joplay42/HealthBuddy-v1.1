"use client";
// Components import
import { DisplayCalories } from "@/components";
import { useRouter } from "next/navigation";

/**
 * This component is used to display the content in the calories page. It assembles many
 * component to make the view stable and easy to use.
 *
 * @param goal user goal
 * @param data user data
 * @returns
 */
const Calories = () => {
  // Router hooks to manage navigation
  const router = useRouter();

  return (
    // The calorie container
    <div className="col-span-2 w-full h-full ">
      <div className="flex items-center justify-between pb-5">
        {/** Title of the container */}
        <h1 className="font-bold text-xl">Calories</h1>
        {/** If the user has no objective */}
        <button
          className="w-fit bg-black text-white px-3 py-2 rounded-2xl text-center hover:opacity-75 hover:cursor-pointer"
          onClick={() => router.push("?modal=food", { scroll: false })}
        >
          Add food +
        </button>
      </div>
      <div className="bg-white p-10 rounded-3xl border border-neutral-400">
        <DisplayCalories />
      </div>
    </div>
  );
};

export default Calories;
