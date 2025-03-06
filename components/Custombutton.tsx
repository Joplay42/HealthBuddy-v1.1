// Imports the props
import { custombuttonProps } from "@/types";
// NextJs Link import
import Link from "next/link";

/**
 * This component is the customButton class, you can custom the text, link and style of
 * the button. This component ensure the application button style integrity.
 *
 * @param text the text to display on the button
 * @param link the link when it is clicked
 * @param style the custom style for each button
 * @returns
 */
const Custombutton = ({ text, link, style }: custombuttonProps) => {
  return (
    // The button container
    <div>
      {/** The Link when the button is clicked, it redirects to the custom link */}
      <Link
        className={`py-2 px-3 rounded-xl hover:opacity-75 hover:transition ease-in-out duration-300 ${style}`}
        href={link}
      >
        {/** Displays the text */}
        {text}
      </Link>
    </div>
  );
};

export default Custombutton;
