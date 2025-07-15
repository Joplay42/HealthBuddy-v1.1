import { WeightsGridProps } from "@/types";
import React from "react";

const WeightsGrid = ({ weight }: WeightsGridProps) => {
  return (
    <div className="max-h-96 overflow-y-auto">
      <table className="table-auto w-full text-left">
        <thead className="sticky top-0">
          {/** The head of the table */}
          <tr className="font-semibold text-neutral-400">
            <td className="pb-3">Weight</td>
            <td className="pb-3">Date</td>
          </tr>
        </thead>
        <tbody>
          {weight.weights.map((entry, index) => (
            <tr
              key={index}
              className="border-y border-neutral-300 font-medium text-[#797979] animate-fade-in"
            >
              <td className="py-2">{entry.number}</td>
              <td className="py-2">{entry.date.toDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default WeightsGrid;
