// Props import
import { dashboardButtonProps } from "@/types";
// NextJs Link import
import Link from "next/link";
// NextJs Image import
import Image from "next/image";

/**
 * This component is the style for the dashboard button. Compared to the customButton component
 * this one is only for the dashboard.
 *
 * @param text the text in the button
 * @param link the link when clicked
 * @param full the width of the button as a boolean
 * @param icon optional icon image
 * @returns
 */
const DashboardButton = ({
  text,
  action,
  full,
  icon,
}: dashboardButtonProps) => {
  return (
    // The button container
    <div
      className={`bg-black text-white px-3 py-2 rounded-2xl text-center hover:opacity-75 hover:cursor-pointer ${
        // Handles if the button will be full
        !full ? `w-fit` : `w-full`
      }`}
    >
      {/** The link when it is clicked */}
      <div
        className={icon && "flex items-center gap-2"}
        onClick={() => action(true)}
      >
        {/** Display an icon if there is */}
        {icon && (
          <Image src={`/${icon}`} width={10} height={10} alt="Icon button" />
        )}
        {text}
      </div>
    </div>
  );
};

export default DashboardButton;
