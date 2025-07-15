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
import { Line } from "react-chartjs-2";

const DisplayWeight = ({ weight, objective }: DisplayWeightProps) => {
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

  const labels = weight.weights.map((entry) =>
    entry.date.toLocaleDateString("en-US", { month: "short", day: "numeric" })
  );

  const data = {
    labels,
    datasets: [
      {
        fill: true,
        data: weight.weights.map((entry) => entry.number),
        borderColor: "#AFF921",
        backgroundColor: "#ffffff00",
        tension: 0.3,
      },
      {
        label: "objective",
        fill: true,
        data: labels.map((entry) => objective.objectiveWeight),
        borderColor: "#656565",
        backgroundColor: "#ffffff00",
        borderDash: [5, 5],
      },
    ],
  };

  if (weight.weights.length === 0 || !objective.objectiveWeight)
    return (
      <div className="py-16">
        <h1 className="text-xl font-bold text-center">
          No data has been found
        </h1>
        <div className="flex justify-center mt-5">
          <button
            className="w-fit bg-black text-white px-5 py-2 rounded-2xl text-center hover:opacity-75"
            // Open the modal
            onClick={() => {}}
          >
            Add weight +
          </button>
        </div>
      </div>
    );

  return (
    <div className="relative h-[260px] w-full">
      <Line options={options} data={data} />
    </div>
  );
};

export default DisplayWeight;
