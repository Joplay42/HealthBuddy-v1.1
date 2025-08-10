"use client";
import Image from "next/image";
import { useEffect, useState } from "react";

const WorkoutFindingLoading = () => {
  const messages = [
    "Finding the best workout for you...",
    "Analyzing your requirements...",
    "Optimizing your training plan...",
    "Finalizing your personalized routine...",
  ];

  const [index, setIndex] = useState(0);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false); // fade out
      setTimeout(() => {
        setIndex((prev) => (prev + 1) % messages.length);
        setFade(true); // fade in
      }, 300); // match fade-out duration
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center py-60 text-custom-dark">
      {/* GIF */}
      <Image
        src="/finding.gif"
        alt="Loading animation"
        width={100}
        height={100}
        priority
      />
      <p
        className={`mt-6 text-lg font-medium transition-opacity duration-300 ${
          fade ? "opacity-100" : "opacity-0"
        }`}
      >
        {messages[index]}
      </p>
    </div>
  );
};

export default WorkoutFindingLoading;
