"use client";
// React hooks import
import { useEffect } from "react";
// Component import
import { Custombutton, Tag } from "@/components";
// NextJs image import
import Image from "next/image";
// Library animate-on-scroll imports
import AOS from "aos";
import "aos/dist/aos.css";

/**
 * This component is the hero section of the website
 *
 * @returns
 */
const HeroSection = () => {
  // Hooks to initialize the library
  useEffect(() => {
    AOS.init();
    AOS.refresh();
  }, []);

  return (
    // Section container
    <section id="hero" className="bg-custom-dark relative">
      <div
        data-aos="fade-up"
        data-aos-delay="500"
        data-aos-duration="1000"
        className=" pt-40 lg:pt-60 section-layout z-50"
      >
        {/** The title, text and button section */}
        <div className="space-y-5">
          {/** The custom tag component */}
          <Tag text="Optimize your progress" />
          {/** title */}
          <h1 className="hero-title">
            Tracking your <span className="font-bold">progress</span> has never
            been this <span className="font-bold text-custom-green">easy</span>!
          </h1>
          {/** description */}
          <p className="lg:font-semibold text-neutral-300 lg:max-w-[35rem]">
            Seamlessly monitor your nutrition and fitness routines, set
            personalized goals.
          </p>
          {/** custom button */}
          <Custombutton
            text="Get started"
            link="signin"
            style="bg-custom-green font-bold"
          />
        </div>
        {/** Image */}
        <Image
          src="/Hero-image.png"
          height={800}
          width={800}
          alt="Hero Image"
        />
      </div>
    </section>
  );
};

export default HeroSection;
