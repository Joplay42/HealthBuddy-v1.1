import React from "react";
import { Live, Pending } from "@/components";

/**
 * This component is used to display the Admin page in the dashboard so I can use hooks
 * instead in a page react component.
 *
 * @returns
 */
const Admin = () => {
  return (
    <>
      <div className="lg:grid grid-cols-3 py-5 lg:py-10 space-y-5 lg:space-y-0 lg:gap-10">
        <Pending />
        <Live />
      </div>
    </>
  );
};

export default Admin;
