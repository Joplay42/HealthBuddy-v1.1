import React from "react";
import { HeaderSqueleton, SideBarSqueleton } from "@/components";

const DashboardSqueleton = () => {
  return (
    <div>
      {/** Sidebar component */}
      <SideBarSqueleton />
      <div className="ml-[49px] md:ml-[80px] lg:ml-[128px]">
        {/** Header container */}
        <HeaderSqueleton />
        {/** The content of the dashboard */}
        <div className="bg-neutral-200 min-h-screen px-5 md:px-12"></div>
      </div>
    </div>
  );
};

export default DashboardSqueleton;
