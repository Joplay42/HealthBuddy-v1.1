"use client";
// Hooks import
import { useEffect, useState } from "react";
// NextJs image import
import Image from "next/image";
// Quotes constant import
import { quotes } from "@/constant";
// Utils function for the quotesTimer
import { quotesTimer } from "@/utils";

/**
 * This component is used to display quotes from the constant. It requires a timer
 * that changes the quotes automatically
 *
 * @returns
 */
const Quotes = () => {
  // index hook
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  // animdation hook
  const [isFading, setIsFading] = useState(false);

  // useEffect hook
  useEffect(() => {
    // call the util function where it executes a timer to change the index
    const cleanUp = quotesTimer({
      setCurrentIndex: setCurrentIndex,
      setIsFading: setIsFading,
    });
    return cleanUp;
  }, [quotes.length]);

  return (
    // The quotes card container
    <div className="bg-custom-green rounded-2xl relative min-h-80">
      {/** The quotation icon */}
      <Image
        className="absolute top-5 left-5"
        src="/quotes.svg"
        height={50}
        width={50}
        alt="quotes"
      />
      {/** The quotes text */}
      <div className="h-full flex items-center justify-center">
        <p
          className={`p-5 max-w-[32rem] font-semibold text-2xl text-custom-dark transition-opacity duration-500 ease-in-out ${
            // handles the animation of the quotes
            isFading ? "opacity-0" : "opacity-100"
          }`}
        >
          {/** Displays the text */}
          {quotes[currentIndex].text}
        </p>
      </div>
      {/** Displays the athor of the quotes */}
      <p
        className={`absolute bottom-10 left-5 md:left-20 font-semibold text-xl transition-opacity duration-500 ease-in-out ${
          // handles the animation
          isFading ? "opacity-0" : "opacity-100"
        }`}
      >
        {/** The author */}- {quotes[currentIndex].author}
      </p>
      {/** The dots to display which index */}
      <div className="flex space-x-2 absolute bottom-5 left-5 md:left-auto md:bottom-12 md:right-10">
        {quotes.map((dots) => (
          <div
            key={dots.text}
            className={
              // Declare the size of the dot if the current index is selected
              quotes[currentIndex].text == dots.text
                ? `border-2 border-black bg-black transition-width ${
                    isFading ? "w-5" : "w-20"
                  }`
                : `border-1 border-neutral-500 bg-neutral-500 w-5`
            }
          ></div>
        ))}
      </div>
    </div>
  );
};

export default Quotes;
