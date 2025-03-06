// Imports the variant class
import { variantClasses } from "@/constant";
// Imports de props
import { alertBoxProps } from "@/types";
// NextJS Image imports
import Image from "next/image";

/**
 * This component is for different type of alert all throughout the application.
 * It returns an alert box.
 *
 * @param children the text to display
 * @param variant the alert variant
 * @param setVisibility useState hook to set the visibility
 * @returns
 */
const AlertBox = ({ children, variant, setVisibility }: alertBoxProps) => {
  return (
    // Container for the alert box
    <div className={`flex justify-between ${variantClasses[variant]}`}>
      {/** Each variant has a specific style  */}
      {children}
      {/** The icon to dismiss the alert box */}
      <Image
        onClick={() => setVisibility(false)}
        src="/close.svg"
        width={20}
        height={20}
        alt="close icon"
        className="opacity-75 cursor-pointer"
      />
    </div>
  );
};

export default AlertBox;
