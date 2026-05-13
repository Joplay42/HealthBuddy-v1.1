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
  Empty,
  size,
  fontSize,
}: NutrientsChartsProps) => {
  const isEmpty = Protein === 0 && Carbs === 0 && Fat === 0;

  const value = {
    datasets: [
      {
        label: "Calories",
        data: isEmpty ? [1] : [Protein, Carbs, Fat],
        backgroundColor: isEmpty
          ? ["#D1D5DB"]
          : ["#AFF921", "#73af00", "#d7ff8a"],
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
