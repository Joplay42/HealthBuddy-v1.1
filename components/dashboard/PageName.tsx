"use client";
// Constant import
import { navLinksDashboard } from "@/constant";
// NextJs navigation hooks
import { usePathname } from "next/navigation";

/**
 * This component is used to display the current page name in the dashbaord header
 *
 * @returns
 */
const PageName = () => {
  // pathName hook
  const pathName = usePathname();

  return (
    <>
      {/** Maps the links of the dashboard */}
      {navLinksDashboard.map((link, index) =>
        // if the current page is the link
        pathName === link.link ? (
          // Display only the current page link
          <h1 key={index} className="text-2xl font-bold">
            {link.text}
          </h1>
        ) : null
      )}
    </>
  );
};

export default PageName;
