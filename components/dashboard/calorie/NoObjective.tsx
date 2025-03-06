"use client";
import { AddObjective, DashboardButton, Modal } from "@/components";
import { useState } from "react";

const NoObjective = () => {
  // The states to open the modalMenu
  const [openModal, setModal] = useState(false);

  return (
    <div className="flex items-center justify-center flex-col gap-y-6 my-10">
      <h1 className="text-3xl font-semibold w-2/3 text-center">
        You have no <span className="text-custom-green">objective</span> set at
        the moment!
      </h1>
      <DashboardButton text={"Create an objective? +"} action={setModal} />
      {/** This is the modal when the button set objective is clicked */}
    </div>
  );
};

export default NoObjective;
