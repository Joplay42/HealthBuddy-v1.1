"use client";
import { barChartProps, chartProps } from "@/types";
import React from "react";
import {
  Chart,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { calculateNutriantDaily } from "@/utils";

Chart.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const BarChart = ({ data, goal, nutrient }: barChartProps) => {
  if (data && goal) {
    const dailyGoalGrams = calculateNutriantDaily({
      dailyCalories: goal.calorie,
      nutrientPercentage: goal[nutrient],
      nutrientType: nutrient,
    });

    const consumedGrams = data[nutrient];
    const remaininGrams = Math.max(dailyGoalGrams - consumedGrams, 0); // Prevents negative numbers

    const totalGrams = consumedGrams + remaininGrams;

    const value = {
      labels: ["Calories"], // Single label for the horizontal bar
      datasets: [
        {
          label: "Consumed",
          data: [(consumedGrams / totalGrams) * 100],
          backgroundColor: "#AFF921",
          borderRadius: {
            topRight: 0,
            bottomRight: 0,
            topLeft: 25,
            bottomLeft: 25,
          }, // Only round the right side
          borderSkipped: false, // Ensures borderRadius is applied correctly
        },
        {
          label: "Remaining",
          data: [(remaininGrams / totalGrams) * 100],
          backgroundColor: "#656565",
          borderRadius: {
            topRight: 25,
            bottomRight: 25,
            topLeft: 0,
            bottomLeft: 0,
          }, // Only round the left side
          borderSkipped: false, // Ensures borderRadius is applied correctly
        },
      ],
    };

    const options = {
      indexAxis: "y" as const, // Horizontal bar chart
      plugins: {
        tooltip: {
          enabled: false, // Disable tooltips
        },
        legend: {
          display: false, // Hide legend
        },
      },
      events: [] as Array<keyof HTMLElementEventMap>, // Disable all events
      scales: {
        x: {
          display: false, // Hide the x-axis
          stacked: true,
        },
        y: {
          display: false, // Hide the y-axis
          stacked: true,
        },
      },
      responsive: true,
      maintainAspectRatio: false,
    };

    return (
      <div className="w-full">
        <div className="flex items-center justify-between">
          <h1 className="capitalize">{nutrient}</h1>
          <h1>
            {consumedGrams}g / {dailyGoalGrams}g
          </h1>
        </div>
        <Bar className="max-h-5" data={value} options={options} />
      </div>
    );
  }
};

export default BarChart;
