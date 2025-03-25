"use client";
import Image from "next/image";
import { useParams, useRouter, useSearchParams } from "next/navigation";
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
const Modal = ({
  children,
  title,
  backButton,
  route,
}: {
  children: React.ReactNode;
  title?: string;
  backButton?: boolean;
  route?: string;
}) => {
  // The router hooks to handle the navigation
  const router = useRouter();
  // Get the params
  const searchParams = useSearchParams();

  // Function to handle navigation
  const handleClosing = () => {
    // Get the current params
    const currentParams = new URLSearchParams(window.location.search);
    // Delete the current param
    currentParams.delete("modal");
    // Push the router to the route without params
    router.replace(window.location.pathname);
  };

  // Function to handle the back navigation
  const handleBack = () => {
    // Check if there is index params
    const indexParams = searchParams.get("index");

    if (indexParams) {
      let index = parseInt(indexParams);
      // Check if the user searched a term
      const isSearch =
        searchParams.get("search") ||
        searchParams.get("term") ||
        searchParams.get("id");

      if (!isSearch) {
        if (index != (1 || 4)) {
          router.push(`?modal=addrecipe&index=${index - 1}`);
        } else {
          router.push("?modal=food&index=recipe");
        }
      } else {
        router.push("?modal=addrecipe&index=2");
      }
    } else {
      router.back();
    }
  };

  return (
    // This is the background of the modal window which is darker
    <>
      <div
        className="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-0 justify-center items-center w-full md:inset-0 h-screen max-h-full bg-opacity-30 bg-black transition duration-150 hover:cursor-pointer"
        onClick={handleClosing}
      ></div>
      {/** This is the modal window which is centered and with a max width */}
      <div className="fixed container max-h-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 bg-white rounded-lg shadow-md border border-neutral-300">
        {/** This is the header of the modal window which has a close button that changes the states of the modal window */}
        <div className="grid grid-cols-3 items-center pt-4 px-4 md:px-5 md:pt-8 md:pb-5 rounded-t">
          {backButton && (
            <button
              onClick={handleBack}
              className="text-black bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 19.5 8.25 12l7.5-7.5"
                />
              </svg>
            </button>
          )}
          {title && (
            <div className="col-start-2 justify-self-center font-semibold text-2xl">
              {title}
            </div>
          )}
          <button
            type="button"
            className="col-start-3 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
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
    </>
  );
};

export default Modal;
