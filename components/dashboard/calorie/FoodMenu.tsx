// Props import
import { foodMenuProps } from "@/types";

/**
 * This component is for the foodMenu on mobile when it is display. It shows the rest
 * of the information of the food selected.
 *
 * @param label the categories to display
 * @param data the food List
 * @param food the index of the food
 * @returns
 */
const FoodMenu = ({ label, data, food }: foodMenuProps) => {
  const foodItem = data[food];

  return (
    // A new table
    <table className="w-full text-center bg-white shadow-lg border border-neutral-200">
      {/** The head to show the categories */}
      <thead>
        {/** A single row */}
        <tr className="font-semibold text-neutral-400">
          {/** Mapping label to display each */}
          {label.slice(2, 8).map((item, index) => (
            // Display the category
            <td key={index} className="pb-2 pt-4">
              {/** The abreviationn for it fit the menu */}
              {item == "Quantity" && "Qty"}
              {item == "Calories" && "Cal"}
              {item == "Protein" && "Pro"}
              {item == "Carbs" && "Car"}
              {item == "Fat" && "Fat"}
            </td>
          ))}
        </tr>
      </thead>
      {/** The body of the table */}
      <tbody>
        {/** A single row */}
        <tr className="font-bold">
          {/** Display of the information */}
          <td className="py-2">{foodItem.Quantity}</td>
          <td className="py-2">{foodItem.Calories}</td>
          <td className="py-2">{foodItem.Protein}</td>
          <td className="py-2">{foodItem.Carbs}</td>
          <td className="py-2">{foodItem.Fat}</td>
        </tr>
      </tbody>
    </table>
  );
};

export default FoodMenu;
