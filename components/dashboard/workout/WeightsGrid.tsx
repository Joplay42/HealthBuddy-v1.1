"use client";
import WeightsGridSqueleton from "@/components/Squeleton/WeightsGridSqueleton";
import { useFirebaseAuth } from "@/context/UserContext";
import { userWeightProps, WeightsGridProps } from "@/types";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

const WeightsGrid = ({ weight, loading }: WeightsGridProps) => {
  // Fetch the user
  const { user } = useFirebaseAuth();

  // Router naviation hook
  const router = useRouter();

  // Loading states
  const [deletionLoading, setDeletionLoading] = useState(false);

  // Function to delete the weight
  const handleDeletion = async (weight: userWeightProps) => {
    try {
      // Enabled the deletion loading
      setDeletionLoading(true);
      // Check if there is id
      if (weight.Id) {
        // Call the library api DELETE method
        const res = await fetch(
          `/api/workouts/weight?userid=${user?.uid}&del=${weight.Id}`,
          {
            method: "DELETE",
          }
        );

        const data = await res.json();
        if (!res.ok) {
          throw new Error(data.error);
        }
      }
    } catch (error: any) {
      console.log(error.message);
    } finally {
      setDeletionLoading(false);
    }
  };

  if (loading) return <WeightsGridSqueleton />;

  return (
    <div className="max-h-96 overflow-y-auto">
      {/** Table for desktop */}
      <table className="hidden sm:table table-auto w-full text-left">
        <thead className="sticky top-0">
          {/** The head of the table */}
          <tr className="font-semibold text-neutral-400">
            <td className="pb-3">Weight</td>
            <td className="pb-3">Date</td>
          </tr>
        </thead>
        <tbody>
          {weight.length === 0 &&
            Array(9)
              .fill(0)
              .map((_, index) => (
                <tr
                  key={index}
                  className="border-y border-neutral-300 font-medium text-[#797979] animate-fade-in"
                >
                  <td className="py-2">---</td>
                  <td className="py-2">--/--/--</td>
                </tr>
              ))}
          {weight.map((entry, index) => (
            <tr
              key={index}
              className="border-y border-neutral-300 font-medium text-[#797979] animate-fade-in"
            >
              <td className="py-2">{entry.number} lb</td>
              <td className="py-2">{entry.date.toDateString()}</td>
              <td>
                <button
                  disabled={deletionLoading}
                  className={`${deletionLoading && `opacity-30`}`}
                  onClick={() =>
                    router.push(`?modal=weight&id=${entry.Id}`, {
                      scroll: false,
                    })
                  }
                >
                  <Image
                    src={"/edit.svg"}
                    height={20}
                    width={20}
                    alt="Delete icon"
                  />
                </button>
                <button
                  disabled={deletionLoading}
                  className={`${deletionLoading && `opacity-30`}`}
                  onClick={() => handleDeletion(entry)}
                >
                  <Image
                    src={"/trash.svg"}
                    height={20}
                    width={20}
                    alt="Delete icon"
                  />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {/** Table for mobile */}
      <table className="sm:hidden table-auto w-full text-left">
        <thead className="sticky top-0">
          {/** The head of the table */}
          <tr className="font-semibold text-neutral-400">
            <td className="pb-3">Weight</td>
            {weight.length === 0 && <td className="pb-3">Date</td>}
          </tr>
        </thead>
        <tbody>
          {weight.length === 0 &&
            Array(4)
              .fill(0)
              .map((_, index) => (
                <tr
                  key={index}
                  className="border-y border-neutral-300 font-medium text-[#797979] animate-fade-in"
                >
                  <td className="py-2">---</td>
                  <td className="py-2">--/--/--</td>
                </tr>
              ))}
          {weight.map((entry, index) => (
            <tr
              key={index}
              className="border-y border-neutral-300 font-medium text-[#797979] animate-fade-in"
            >
              <td className="py-2">
                <p>{entry.number} lb</p>
                <p>{entry.date.toDateString()}</p>
              </td>
              <td>
                <button
                  disabled={deletionLoading}
                  className={`${deletionLoading && `opacity-30`}`}
                  onClick={() =>
                    router.push(`?modal=weight&id=${entry.Id}`, {
                      scroll: false,
                    })
                  }
                >
                  <Image
                    src={"/edit.svg"}
                    height={20}
                    width={20}
                    alt="Delete icon"
                  />
                </button>
                <button
                  disabled={deletionLoading}
                  className={`${deletionLoading && `opacity-30`}`}
                  onClick={() => handleDeletion(entry)}
                >
                  <Image
                    src={"/trash.svg"}
                    height={20}
                    width={20}
                    alt="Delete icon"
                  />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default WeightsGrid;
