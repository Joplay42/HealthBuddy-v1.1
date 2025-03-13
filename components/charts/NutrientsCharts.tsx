// The type imports
import { NutrientsChartsProps } from "@/types";
// Library improts
import { Pie } from "react-chartjs-2";

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
  size,
  fontSize,
}: NutrientsChartsProps) => {
  // Set the charts value options
  const value = {
    datasets: [
      {
        label: "Calories",
        data: [Protein, Carbs, Fat],
        backgroundColor: ["#AFF921", "#73af00", "#d7ff8a"],
        borderWidth: 1,
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
    <div className={`relative ${size}`}>
      {/** The charts */}
      <Pie data={value} options={options} />
      {/** The calories amount */}
      <h1
        className={`absolute bottom-1/2 right-1/2 translate-x-1/2 translate-y-1/2 font-semibold ${fontSize}`}
      >
        {Calories}
      </h1>
    </div>
  );
};

export default NutrientsCharts;
