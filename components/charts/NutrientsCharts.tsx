"use client";
import { NutrientsChartsProps } from "@/types";
import { Pie } from "react-chartjs-2";
import { useTheme } from "@/context/ThemeContext";

/**
 * This component is used to display the nutrient information of the food
 * item using a chart by chartJs.
 *
 * @param Nutrient the foodItem nutrients to display
 * @returns
 */
const NutrientsCharts = ({
  Calories,
  Protein,
  Carbs,
  Fat,
  Empty,
  size,
  fontSize,
}: NutrientsChartsProps) => {
  const { theme } = useTheme();
  const isEmpty = Protein === 0 && Carbs === 0 && Fat === 0;
  const colors = theme === "dark"
    ? ["#C7F94C", "#86B61C", "#D6FF6B"]
    : ["#AFF921", "#73af00", "#d7ff8a"];
  const emptyColor = theme === "dark" ? "#2c2c30" : "#D1D5DB";

  const value = {
    datasets: [
      {
        label: "Calories",
        data: isEmpty ? [1] : [Protein, Carbs, Fat],
        backgroundColor: isEmpty ? [emptyColor] : colors,
        borderColor: "transparent",
        borderWidth: 0,
        cutout: "70%",
      },
    ],
  };
  // The options to not display the label
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

  return (
    <div className={`${size} relative`}>
      {/** The charts */}
      <Pie data={value} options={options} />
      {/** The calories amount */}
      <h1
        className={`m-0 absolute bottom-1/2 right-1/2 translate-x-1/2 translate-y-1/2 font-semibold ${fontSize}`}
      >
        {Calories}
      </h1>
    </div>
  );
};

export default NutrientsCharts;
