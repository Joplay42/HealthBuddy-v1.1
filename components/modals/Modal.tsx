"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

/**
 * This component is the baseFrame of a modal window. This component can be entirely reutilizable
 * by using the children to put the data inside.
 *
 * @param children The information that will be displayed in the modal window
 * @param isOpen The boolean to check is the modal window is open
 * @param onClose The useState hook that can change if the window is open or not
 * @returns
 */
const Modal = ({ children }: { children: React.ReactNode }) => {
  // The router hooks to handle the navigation
  const router = useRouter();

  // Function to handle navigation
  const handleClosing = () => {
    // Get the current params
    const currentParams = new URLSearchParams(window.location.search);
    // Delete the current param
    currentParams.delete("modal");
    // Push the router to the route without params
    router.replace(window.location.pathname);
  };

  return (
    // This is the background of the modal window which is darker
    <div className="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%)] max-h-full bg-opacity-30 bg-black transition duration-150">
      {/** This is the modal window which is centered and with a max width */}
      <div className="relative p-4 container max-h-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <div className="relative bg-white rounded-lg shadow-md border border-neutral-300">
          {/** This is the header of the modal window which has a close button that changes the states of the modal window */}
          <div className="flex items-center justify-between pt-4 pr-4 md:pr-5 md:pt-5 rounded-t">
            <button
              type="button"
              className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
              data-modal-hide="default-modal"
              onClick={handleClosing}
            >
              {/** The svg icon for the close button */}
              <svg
                className="w-3 h-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                />
              </svg>
            </button>
          </div>
          <div className="space-y-4">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
