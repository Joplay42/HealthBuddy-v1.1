"use client";
import { chartProps } from "@/types";
import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart, ArcElement, Tooltip, Legend } from "chart.js";

Chart.register(ArcElement, Tooltip, Legend);

const PieChart = ({ data, remaining }: chartProps) => {
  const value = {
    labels: ["consumed", "remaining"],
    datasets: [
      {
        label: "Calories",
        data: [data, remaining],
        backgroundColor: ["#AFF921", "#656565"],
        borderWidth: 1,
        cutout: "60%",
      },
    ],
  };

  const options = {
    plugins: {
      tooltip: {
        enabled: false, // Disable tooltips
      },
      legend: {
        display: false, // Hide legend
      },
    },
    events: [] as Array<keyof HTMLElementEventMap>, // Disable all events
  };

  return <Pie data={value} options={options} />;
};

export default PieChart;
