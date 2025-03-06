"use client";
import { MouseEventHandler, useState } from "react";

const Tablet = ({
  text,
  onClose,
}: {
  text: string;
  onClose: MouseEventHandler<HTMLDivElement>;
}) => {
  // State hooks
  const [hover, setHover] = useState(false);

  // Function to handle mouseEnter
  const handleMouseEnter = () => {
    setHover(true);
  };
  // Function to handle mouseleave
  const handleMouseLeave = () => {
    setHover(false);
  };

  return (
    <div
      className="bg-custom-dark text-white rounded-full w-fit px-4 py-2 flex items-center gap-2"
      onMouseOver={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {text}
      {hover && (
        <div onClick={onClose} className="hover:cursor-pointer">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18 18 6M6 6l12 12"
            />
          </svg>
        </div>
      )}
    </div>
  );
};

export default Tablet;
