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
import { Line } from "react-chartjs-2";

const DisplayWeight = ({ weight, objective, loading }: DisplayWeightProps) => {
  // Hooks for the router
  const router = useRouter();

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
        min: objective.objectiveWeight - 6,
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

  const data = {
    labels,
    datasets: [
      {
        fill: true,
        data: weightData,
        borderColor: "#AFF921",
        backgroundColor: "#ffffff00",
        tension: 0.3,
      },
      {
        label: "objective",
        fill: true,
        data: objectiveData,
        borderColor: "#656565",
        backgroundColor: "#ffffff00",
        borderDash: [5, 5],
      },
    ],
  };

  if (weight.length === 0 || !objective.objectiveWeight)
    return (
      <div className="py-16">
        <h1 className="text-2xl font-bold text-center">
          Start tracking your <span className="text-custom-green">Weight</span>{" "}
          gain or loss Today!
          <span className="text-3xl"> 🎉</span>
        </h1>
        <div className="flex justify-center mt-5">
          <button
            onClick={() => {
              router.push("?modal=weight", { scroll: false });
            }}
            className="w-fit bg-black text-white px-5 py-2 rounded-2xl text-center hover:opacity-75"
          >
            Track my weights
          </button>
        </div>
      </div>
    );

  if (loading) return <DisplayWeightSqueleton />;

  return (
    <div className={`relative h-full w-full`}>
      <Line options={options} data={data} />
    </div>
  );
};

export default DisplayWeight;
