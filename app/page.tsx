import {
  Footer,
  HeaderPage,
  HeroSection,
  PatchNoteModal,
  SectionFive,
  SectionFour,
  SectionSix,
  SectionThree,
  SectionTwo,
} from "@/components";
import React, { Suspense } from "react";

const page = () => {
  return (
    <div>
      <Suspense fallback={null}>
        <PatchNoteModal />
      </Suspense>
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
