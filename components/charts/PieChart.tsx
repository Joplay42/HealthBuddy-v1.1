"use client";
import { chartProps } from "@/types";
import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart, ArcElement, Tooltip, Legend } from "chart.js";
import { useTheme } from "@/context/ThemeContext";

Chart.register(ArcElement, Tooltip, Legend);

const PieChart = ({ data, remaining }: chartProps) => {
  const { theme } = useTheme();
  const accentColor = theme === "dark" ? "#C7F94C" : "#AFF921";
  const emptyColor = theme === "dark" ? "#2c2c30" : "#D1D5DB";
  const safeRemaining = Math.max(0, remaining);
  const isEmpty = data === 0 && safeRemaining === 0;

  const value = {
    labels: isEmpty ? ["empty"] : ["consumed", "remaining"],
    datasets: [
      {
        label: "Calories",
        data: isEmpty ? [1] : [data, safeRemaining],
        backgroundColor: isEmpty ? [emptyColor] : [accentColor, "#656565"],
        borderColor: "transparent",
        borderWidth: 0,
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
