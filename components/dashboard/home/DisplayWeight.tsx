"use client";
import DisplayWeightSqueleton from "@/components/Squeleton/DisplayWeightSqueleton";
import { DisplayWeightProps } from "@/types";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
} from "chart.js";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Line } from "react-chartjs-2";

const DisplayWeight = ({ weight, objective, loading }: DisplayWeightProps) => {
  // Hooks for the router
  const router = useRouter();

  // Hook for the objective view
  const [showObjective, setObjectiveDisplay] = useState<boolean>(false);

  if (loading || !weight || weight.length === 0)
    return <DisplayWeightSqueleton />;

  // Function to find the smallest weight number
  const findSmallest = () => {
    if (weight.length === 1) return -1;

    // Smallest
    let min = weight[0].number;

    weight.forEach((w) => {
      if (w.number < min) {
        min = w.number;
      }
    });

    return min;
  };

  const smallestIndex = findSmallest();

  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Filler,
    Legend
  );
  const options = {
    responsive: true,
    plugins: {
      tooltip: {
        font: {
          family: '"Montserrat", sans-serif', // your app font here
          size: 14,
          weight: "normal",
        },
        callbacks: {
          label: function (context: any) {
            const value = context.parsed.y;
            return `${value}lb`;
          },
        },
      },
      title: {
        display: false,
      },
      legend: {
        display: false,
      },
    },
    scales: {
      y: {
        min: Math.min(
          smallestIndex !== -1 ? smallestIndex - 2 : weight[0].number - 2,
          showObjective ? objective.objectiveWeight - 5 : smallestIndex - 2
        ),

        ticks: {
          font: {
            family: '"Montserrat", sans-serif',
            size: 12,
          },
          stepSize: 1,
          maxTicksLimit: 6,
        },
        beginAtZero: false,
      },
      x: {
        ticks: {
          font: {
            family: '"Montserrat", sans-serif',
            size: 12,
          },
        },
      },
    },
    maintainAspectRatio: false,
  };

  let labels = weight.map((entry) =>
    entry.date.toLocaleDateString("en-US", { month: "short", day: "numeric" })
  );

  // If only one weight, add a "future" label to make the chart wider
  if (labels.length === 1) {
    const firstDate = weight[0].date;
    const extraDate = new Date(firstDate);
    extraDate.setDate(extraDate.getDate() + 1); // add 1 day
    labels = [
      firstDate.toLocaleDateString("en-US", { month: "short", day: "numeric" }),
      extraDate.toLocaleDateString("en-US", { month: "short", day: "numeric" }),
    ];
  }

  // Weight data
  let weightData: number[];
  if (weight.length === 1) {
    // Duplicate value so a flat line is drawn
    weightData = [weight[0].number, weight[0].number];
  } else {
    weightData = weight.map((entry) => entry.number);
  }

  // Objective data (flat line)
  const objectiveData = labels.map(() => objective.objectiveWeight);

  // Dynamically display the objective
  const datasets: any[] = [
    {
      fill: true,
      data: weightData,
      borderColor: "#AFF921",
      backgroundColor: "#ffffff00",
    },
  ];

  if (showObjective) {
    datasets.push({
      label: "Objective",
      fill: true,
      data: objectiveData,
      borderColor: "#656565",
      backgroundColor: "#ffffff00",
      borderDash: [5, 5],
    });
  }

  const data = {
    labels,
    datasets,
  };

  return (
    <div className={`relative h-full w-full mt-6`}>
      <div className="absolute right-4 -top-10 space-x-2 font-semibold text-md flex items-center">
        <input
          type="checkbox"
          checked={showObjective}
          onChange={() => setObjectiveDisplay(!showObjective)}
          className="h-5 w-5"
        />
        <label>Show objective</label>
      </div>
      <Line options={options} data={data} />
    </div>
  );
};

export default DisplayWeight;
