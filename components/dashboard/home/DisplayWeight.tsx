"use client";
import DisplayWeightSqueleton from "@/components/Squeleton/DisplayWeightSqueleton";
import { DisplayWeightProps, userWeightProps } from "@/types";
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
import { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";

const DisplayWeight = ({ weight, objective, loading }: DisplayWeightProps) => {
  // Hooks for the router
  const router = useRouter();

  // Hook for the objective view
  const [showObjective, setObjectiveDisplay] = useState<boolean>(false);
  // Hook for the timeDisplay
  const [timeDisplay, setTimeDisplay] = useState<number>(30);
  // Hooks for the weights filtering
  const [filteredWeight, setFilteredWeights] = useState<userWeightProps[]>([]);

  useEffect(() => {
    // Function to display the weights with the timeDisplay states
    const filterDates = (weight: userWeightProps[], days: number) => {
      // Get todays date
      const today = new Date();
      const pastLimit = new Date();
      pastLimit.setDate(today.getDate() - days);

      return weight.filter(
        (item) => item.date >= pastLimit && item.date <= today
      );
    };

    const newWeights = filterDates(weight, timeDisplay);

    setFilteredWeights(newWeights);
  }, [timeDisplay, weight]);

  // Handle loading ui
  if (loading) return <DisplayWeightSqueleton />;

  // Handle null values
  if (!filteredWeight || filteredWeight.length === 0) {
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
    // Empty chart data
    const emptyData = {
      labels: [], // no labels
      datasets: [
        {
          label: "Weight",
          data: [], // no points
          borderColor: "#AFF921",
          backgroundColor: "#ffffff00",
          fill: true,
        },
      ],
    };
    // Empty chart options
    const emptyOptions = {
      responsive: true,
      plugins: {
        tooltip: { enabled: false }, // no tooltips
        legend: { display: false }, // hide legend
        title: { display: false },
      },
      scales: {
        y: {
          min: 0,
          max: 200, // or any reasonable default range
          ticks: {
            font: {
              family: '"Montserrat", sans-serif',
              size: 12,
            },
            stepSize: 50,
          },
          grid: {
            color: "#e5e5e5",
          },
        },
        x: {
          ticks: {
            font: {
              family: '"Montserrat", sans-serif',
              size: 12,
            },
          },
          grid: {
            color: "#e5e5e5",
          },
        },
      },
      maintainAspectRatio: false,
    };
    // Render an empty chart or a placeholder grid
    return (
      <div className={`relative h-full w-full mt-6`}>
        <Line options={emptyOptions} data={emptyData} />
      </div>
    );
  }

  // Function to find the smallest weight number
  const findSmallest = () => {
    if (filteredWeight.length === 1) return -1;

    // Smallest
    let min = filteredWeight[0].number;

    filteredWeight.forEach((w) => {
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
          smallestIndex !== -1
            ? smallestIndex - 2
            : filteredWeight[0].number - 2,
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

  let labels = filteredWeight.map((entry) =>
    entry.date.toLocaleDateString("en-US", { month: "short", day: "numeric" })
  );

  // If only one weight, add a "future" label to make the chart wider
  if (labels.length === 1) {
    const firstDate = filteredWeight[0].date;
    const extraDate = new Date(firstDate);
    extraDate.setDate(extraDate.getDate() + 1); // add 1 day
    labels = [
      firstDate.toLocaleDateString("en-US", { month: "short", day: "numeric" }),
      extraDate.toLocaleDateString("en-US", { month: "short", day: "numeric" }),
    ];
  }

  // Weight data
  let weightData: number[];
  if (filteredWeight.length === 1) {
    // Duplicate value so a flat line is drawn
    weightData = [filteredWeight[0].number, filteredWeight[0].number];
  } else {
    weightData = filteredWeight.map((entry) => entry.number);
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
    <div className="relative h-full w-full mt-14 md:mt-6">
      <div className="absolute -top-20 md:-top-12 font-semibold text-md space-y-2 md:space-y-0 flex flex-wrap items-center justify-between w-full">
        <div className="inline-flex items-center space-x-2">
          <select
            value={timeDisplay}
            onChange={(e) => setTimeDisplay(parseInt(e.target.value))}
            className="w-fit rounded-lg h-9 text-sm"
          >
            <option value="7">1 week</option>
            <option value="30" defaultChecked>
              1 month
            </option>
            <option value="90">3 months</option>
            <option value="180">6 months</option>
            <option value="360">1 year</option>
          </select>
          <label className="font-semibold">Display</label>
        </div>
        <div className="inline-flex items-center space-x-2">
          <div className="flex items-center cursor-pointer relative">
            <input
              type="checkbox"
              checked={showObjective}
              onChange={() => setObjectiveDisplay(!showObjective)}
              className="peer h-5 w-5 cursor-pointer transition-all appearance-none rounded shadow hover:shadow-md border border-slate-300 checked:bg-slate-800 checked:border-slate-800"
              id="check"
            />
            <span className="absolute text-white opacity-0 peer-checked:opacity-100 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-3.5 w-3.5"
                viewBox="0 0 20 20"
                fill="currentColor"
                stroke="currentColor"
                strokeWidth="1"
              >
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </span>
          </div>
          <label>Show objective</label>
        </div>
      </div>
      <Line options={options} data={data} />
    </div>
  );
};

export default DisplayWeight;
