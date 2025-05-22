"use client";
// NextJs image imports
import Image from "next/image";
// NextJs link import
import Link from "next/link";
// constant import
import { navLinksDashboard } from "@/constant";
// NextJs navigation import
import { usePathname, useRouter } from "next/navigation";
// utils function import
import { logoutUser } from "@/utils";
import { useFirebaseAuth } from "@/context/UserContext";

/**
 * This component displays the sideBar of the dashboard. The sidebar provides the main
 * navigation for the dashboard
 *
 * @returns
 */
const Sidebar = () => {
  // pathName nextJs hook
  const pathName = usePathname();
  // router NextJS hook
  const router = useRouter();

  // This arrow function handle the click
  const handleClick = () => {
    // Handle the errors
    try {
      // calls the logoutUser fonction from the utils
      logoutUser();
      // return to the website
      router.push("/");
    } catch (error: any) {
      // Display any error
      console.error(error.message);
    }
  };

  return (
    // The sideBAr
    <div className="h-screen fixed bg-custom-dark min-w-auto md:min-w-20 lg:min-w-32 flex flex-col">
      {/** The sideBar logo */}
      <Image
        src="/Logo-mobile.png"
        width={75}
        height={75}
        alt="mobile logo"
        className="mx-auto my-5 w-12 h-12 lg:w-20 lg:h-20"
      />
      {/** The navLinks */}
      <div className="flex flex-col mt-10 lg:mt-20">
        {navLinksDashboard.map((link, index) => {
          return (
            <Link
              key={index}
              href={link.link}
              className={` my-2 py-3 ${
                // handle the color if it is selected
                pathName === link.link &&
                "bg-custom-green lg:bg-custom-dark lg:border-l-4 lg:border-custom-green"
              }`}
            >
              {/** The icon of each links for larger screen */}
              <Image
                src={link.icon}
                width={35}
                height={35}
                alt={`Link ${link.icon}`}
                className={`mx-auto hidden lg:block hover:scale-125 transition-transform ease-in-out duration-300
                ${
                  // Changes the color if it is selected using css classes
                  pathName === link.link ? "aff921-filter" : "light-gray-filter"
                }
              `}
              />
              {/** The icon of each links for smaller screen */}
              <Image
                src={link.icon}
                width={25}
                height={25}
                alt={`Link ${link.icon}`}
                className="mx-auto light-gray-filter block lg:hidden"
              />
            </Link>
          );
        })}
      </div>
      {/** The log out section */}
      <div
        onClick={handleClick}
        className="absolute bottom-0 right-1/2 translate-x-1/2 cursor-pointer"
      >
        {/** The log out icon */}
        <Image
          src="/logout.svg"
          width={35}
          height={35}
          alt="logout icon"
          className="opacity-75 my-5 hover:scale-125 transition-transform ease-in-out duration-300"
        />
      </div>
    </div>
  );
};

export default Sidebar;
