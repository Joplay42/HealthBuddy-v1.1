"use client";
// import the cards constant
import { cardsWebsite } from "@/constant";
// NextJs image import
import Image from "next/image";
// hooks import
import { useEffect } from "react";
// animate-on-scroll library import
import AOS from "aos";
import "aos/dist/aos.css";

/**
 * This component is the fourth section from the website
 *
 * @returns
 */
const SectionFour = () => {
  // library initialisation
  useEffect(() => {
    AOS.init();
    AOS.refresh();
  }, []);
  return (
    // Section container
    <section className="bg-white">
      <div
        data-aos="fade-up"
        data-aos-delay="500"
        data-aos-duration="1000"
        className="card-layout justify-center max-w-[1440px] mx-auto py-10 lg:py-20 gap-10 px-5"
      >
        {/** Map of the card from the constant */}
        {cardsWebsite.map((card, index) => (
          // Card container
          <div
            key={index}
            className="w-full lg:max-w-[26rem] bg-custom-light p-10 rounded-xl flex flex-col justify-between space-y-4"
          >
            {/** Icon from the card */}
            <Image
              src={card.icon}
              height={50}
              width={50}
              alt={`Icon ${card.icon}`}
            />
            {/** Title */}
            <h1 className="text-2xl font-bold">{card.title}</h1>
            {/** Description */}
            <p>{card.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default SectionFour;
