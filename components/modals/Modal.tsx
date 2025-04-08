"use client";
import Image from "next/image";
import {
  useParams,
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation";
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
  // Hooks for the navigation
  const pathName = usePathname();

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
    // Get the current params
    const currentParams = new URLSearchParams(window.location.search);
    // Check if there is index params
    const indexParams = currentParams.get("index");

    if (indexParams) {
      let index = parseInt(indexParams);
      // Check if the user searched a term
      const isSearch =
        currentParams.get("search") ||
        currentParams.get("term") ||
        currentParams.get("id");

      if (!isSearch) {
        if (index != 1 && index != 4) {
          const newIndex = (index - 1).toString();
          currentParams.set("index", newIndex);

          router.push(`${pathName}?${currentParams.toString()}`, {
            scroll: false,
          });
        } else {
          router.push("?modal=food&index=recipe");
        }
      } else {
        currentParams.delete("id");
        currentParams.delete("search");
        currentParams.delete("term");
        currentParams.set("index", (2).toString());
        router.push(`${pathName}?${currentParams.toString()}`, {
          scroll: false,
        });
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
      />
      {/** This is the modal window which is centered and with a max width */}
      <div className="fixed inset-0 z-10 flex justify-center items-center px-4">
        <div className="bg-white max-h-[90vh] w-full max-w-6xl overflow-y-auto rounded-lg shadow-md border border-neutral-300">
          {/** This is the header of the modal window which has a close button that changes the states of the modal window */}
          <div className="grid grid-cols-3 items-center py-4 px-2 md:px-5 md:pt-8 md:pb-5 rounded-t">
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
              <div className="col-start-2 justify-self-center font-semibold text-2xl min-w-80 text-center">
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
      </div>
    </>
  );
};

export default Modal;
