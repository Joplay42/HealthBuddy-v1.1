"use client";
// Hooks import
import { useEffect } from "react";
// Component imports
import { Tag, Custombutton, Quotes } from "@/components";
// animate-on-scroll library import
import AOS from "aos";
import "aos/dist/aos.css";

/**
 * This component is the fifth section from the website.
 *
 * @returns
 */
const SectionFive = () => {
  // Initialise the library
  useEffect(() => {
    AOS.init();
    AOS.refresh();
  }, []);

  return (
    // Section container
    <section id="workout" className="bg-white">
      <div
        data-aos="fade-up"
        data-aos-delay="500"
        data-aos-duration="1000"
        className="section-layout pt-20 pb-40"
      >
        {/** The text section */}
        <div className="space-y-5">
          <Tag text="Workout" />
          <h1 className="title">
            Track efficiently your workout to reach your{" "}
            <span className="font-bold text-custom-green">objective</span>!
          </h1>
          <p className="paragraph">
            Whatever your goal is, Healthbuddy is your perfect workout
            companion.
          </p>
          <Custombutton
            text="Get started"
            link="signin"
            style="bg-black text-white"
          />
        </div>
        {/** The custom quotes component */}
        <Quotes />
      </div>
    </section>
  );
};

export default SectionFive;
