"use client";
// hooks import
import { useEffect } from "react";
// Component import
import { Tag } from "@/components";
// NextJs Image import
import Image from "next/image";
// animate-on-scroll imports
import AOS from "aos";
import "aos/dist/aos.css";

const SectionTwo = () => {
  // UseEffect hooks to use the custom library
  useEffect(() => {
    AOS.init();
    AOS.refresh();
  }, []);

  return (
    // The section
    <section id="about" className="bg-white">
      <div
        data-aos="fade-up"
        data-aos-delay="500"
        data-aos-duration="1000"
        className="w-full px-5 lg:mx-auto max-w-[1440px] py-20 lg:pt-40 lg:pb-[40rem] relative"
      >
        {/** The title, description and button */}
        <div className=" space-y-5 max-w-[50rem]">
          <Tag text="About" />
          <h1 className="title">
            The new and easy fitness app,{" "}
            <span className="font-bold text-custom-green">100% free</span>{" "}
          </h1>
          <p className="paragraph">
            Healthbuddy is made to be easy, to make tracking your progress
            simple. Making progress has never been easier.
          </p>
        </div>
        {/** The image */}
        <Image
          src="/SectionTwo.png"
          width={2000}
          height={2000}
          alt="Section Two image"
          className="w-full h-auto lg:absolute lg:bottom-32"
        />
      </div>
    </section>
  );
};

export default SectionTwo;
