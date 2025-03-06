"use client";
// The hooks import
import { useEffect } from "react";
// components import
import { Custombutton } from "@/components";
// animate-on-scroll library import
import AOS from "aos";
import "aos/dist/aos.css";

/**
 * This component is the sixth section of the website.
 *
 * @returns
 */
const SectionSix = () => {
  // Library initialisation
  useEffect(() => {
    AOS.init();
    AOS.refresh();
  }, []);

  return (
    // The section container
    <section id="contact" className="bg-white pb-20">
      {/** The card */}
      <div
        data-aos="fade-up"
        data-aos-delay="500"
        data-aos-duration="1000"
        className="max-w-[1440px] mx-auto bg-custom-dark lg:rounded-2xl p-20"
      >
        {/** The text */}
        <h1 className="text-5xl font-bold text-center text-white">
          Starts seeing results from your workout{" "}
          <span className="text-custom-green">today!</span>
        </h1>
        <div className="flex justify-center mt-10">
          <Custombutton
            text="Get started"
            link="signin"
            style="bg-black text-white w-fit"
          />
        </div>
      </div>
    </section>
  );
};

export default SectionSix;
