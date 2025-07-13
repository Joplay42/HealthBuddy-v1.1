"use client";
import {
  Footer,
  HeaderPage,
  HeroSection,
  Modal,
  PatchNote,
  SectionFive,
  SectionFour,
  SectionSix,
  SectionThree,
  SectionTwo,
} from "@/components";
import React, { useEffect, useState } from "react";

// Function to check if the current week is happening
function useIsDateInThisWeek(targetDate: Date): boolean {
  const [isInCurrentWeek, setIsInCurrentWeek] = useState(false);

  useEffect(() => {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate()); // remove time

    // Adjust to start on Monday (getDay() === 1)
    const day = today.getDay() === 0 ? 7 : today.getDay(); // Sunday = 7
    const startOfWeek = new Date(today);
    startOfWeek.setDate(today.getDate() - (day - 1));
    startOfWeek.setHours(0, 0, 0, 0);

    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 6);
    endOfWeek.setHours(23, 59, 59, 999);

    const dateToCheck = new Date(targetDate);
    setIsInCurrentWeek(dateToCheck >= startOfWeek && dateToCheck <= endOfWeek);
  }, [targetDate]);

  return isInCurrentWeek;
}

const page = () => {
  // Check the current week
  const myDate = new Date("2025-07-13");
  const isThisWeek = useIsDateInThisWeek(myDate);

  return (
    <div>
      {isThisWeek && <Modal children={<PatchNote />} title="Patch note v1.1" />}
      <HeaderPage />
      <HeroSection />
      <SectionTwo />
      <SectionThree />
      <SectionFour />
      <SectionFive />
      <SectionSix />
      <div className="bg-custom-dark">
        <Footer />
      </div>
    </div>
  );
};

export default page;
