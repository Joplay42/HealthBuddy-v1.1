"use client";
// UseEffect hook import
import { useEffect } from "react";
// NextJs Image imports
import Image from "next/image";
// The custom component import
import { Custombutton, Tag } from "@/components";
// animate-on-scroll library import
import AOS from "aos";
import "aos/dist/aos.css";

/**
 * This component is the third section of the website.
 *
 * @returns
 */
const SectionThree = () => {
  // Initialisation of the library
  useEffect(() => {
    AOS.init();
    AOS.refresh();
  }, []);

  return (
    // The section container
    <section id="calorie-tracker" className="bg-white">
      <div
        data-aos="fade-up"
        data-aos-delay="500"
        data-aos-duration="1000"
        className="section-layout items-center py-20 lg:py-0"
      >
        {/** The image  */}
        <Image
          src="/SectionThree.png"
          width={800}
          height={800}
          alt="Section Two image"
          className="order-2 lg:order-1"
        />
        {/** The title, description, button */}
        <div className=" space-y-5 max-w-[50rem] order-1 lg:order-2">
          <Tag text="Calorie Tracker" />
          <h1 className="title">
            Set your calorie objective depending on your{" "}
            <span className="font-bold text-custom-green">GOALS</span>.
          </h1>
          <p className="paragraph">
            The integrated calorie tracker for everyone is simple and makes
            progress seems easy!
          </p>
          <Custombutton
            text="Get started"
            link="signin"
            style="bg-black text-white"
          />
        </div>
      </div>
    </section>
  );
};

export default SectionThree;
