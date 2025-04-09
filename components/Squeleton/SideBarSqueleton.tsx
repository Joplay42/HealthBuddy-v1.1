import React from "react";
import Image from "next/image";
import { navLinksDashboard } from "@/constant";

const SideBarSqueleton = () => {
  return (
    // The sideBAr
    <div className="h-screen fixed bg-custom-dark min-w-auto md:min-w-20 lg:min-w-32 flex flex-col">
      {/** The sideBar logo */}
      <div className="bg-neutral-700 rounded-md animate-pulse mx-auto my-5 w-12 h-12 lg:w-20 lg:h-20"></div>
      {/** The navLinks */}
      <div className="flex flex-col mt-10 lg:mt-20">
        <div className="bg-neutral-700 rounded-md animate-pulse mx-auto my-5 w-5 h-5 lg:w-10 lg:h-10"></div>
        <div className="bg-neutral-700 rounded-md animate-pulse mx-auto my-5 w-5 h-5 lg:w-10 lg:h-10"></div>
      </div>
      {/** The log out section */}
      <div className="absolute bottom-0 right-1/2 translate-x-1/2 cursor-pointer">
        {/** The log out icon */}
        <div className="bg-neutral-700 rounded-md animate-pulse mx-auto my-5 w-5 h-5 lg:w-10 lg:h-10"></div>
      </div>
    </div>
  );
};

export default SideBarSqueleton;
