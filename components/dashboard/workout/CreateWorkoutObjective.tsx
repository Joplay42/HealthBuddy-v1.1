"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { objectiveAlgorithmProps } from "@/types";

const CreateWorkoutObjective = ({
  objectiveAlgorithm,
  submit,
  setObjectiveAlgorithm,
}: {
  objectiveAlgorithm: objectiveAlgorithmProps;
  submit: (e: React.FormEvent<HTMLFormElement>) => void;
  setObjectiveAlgorithm: React.Dispatch<
    React.SetStateAction<objectiveAlgorithmProps>
  >;
}) => {
  // State for the loading
  const [loading, setLoading] = useState<boolean>(false);
  // States for the errors
  const [error, setError] = useState();
  // States to disable the button
  const [disableButton, setDisableButton] = useState<boolean>(true);

  // UseEffect to detect the button disability
  useEffect(() => {
    if (
      objectiveAlgorithm.weightObjective !== undefined &&
      objectiveAlgorithm.weightObjective > 0 &&
      objectiveAlgorithm.currentWeight !== undefined &&
      objectiveAlgorithm.currentWeight > 0
    ) {
      setDisableButton(false);
    } else {
      setDisableButton(true);
    }
  }, [objectiveAlgorithm.weightObjective, objectiveAlgorithm.currentWeight]);

  // Function to handle the range changes
  const handleChange = (nb: number, input: string, rawValue: string) => {
    // Input range
    if (input === "range") {
      setObjectiveAlgorithm((prev) => ({ ...prev, timeRange: nb }));
    } else if (input === "currentWeight") {
      // If the input is empty, store undefined instead of NaN
      if (rawValue === "") {
        setObjectiveAlgorithm((prev) => ({
          ...prev,
          currentWeight: undefined,
        }));
        setDisableButton(true);
        return;
      }
      // Set the amount to the right number
      setObjectiveAlgorithm((prev) => ({ ...prev, currentWeight: nb }));
      // Disable the button if 0 or negative number
      if (nb <= 0) {
        setObjectiveAlgorithm((prev) => ({ ...prev, currentWeight: 0 }));
        setDisableButton(true);
      } else if (Number.isNaN(nb)) {
        setDisableButton(true);
      } else {
        setDisableButton(false);
      }
    } else if (input === "weightObjective") {
      // If the input is empty, store undefined instead of NaN
      if (rawValue === "") {
        setObjectiveAlgorithm((prev) => ({
          ...prev,
          weightObjective: undefined,
        }));
        setDisableButton(true);
        return;
      }
      // Set the amount to the right number
      setObjectiveAlgorithm((prev) => ({ ...prev, weightObjective: nb }));
      // Disable the button if 0 or negative number
      if (nb <= 0) {
        setObjectiveAlgorithm((prev) => ({ ...prev, weightObjective: 0 }));
        setDisableButton(true);
      } else if (Number.isNaN(nb)) {
        setDisableButton(true);
      } else {
        setDisableButton(false);
      }
    }
  };

  return (
    <div className="px-5 pb-5 md:px-10 lg:pb-10 lg:px-20">
      <form onSubmit={submit}>
        <div className="space-y-2 lg:space-y-4">
          <h1 className="font-bold text-2xl lg:text-3xl">
            Choose your fitness{" "}
            <span className="text-custom-green">objectives!</span>
          </h1>
          <p className="text-neutral-600">
            Choosing a specific goal will help you structure your exercise
            routine effectively. It will also guide you in selecting the right
            exercises, sets, and repetitions tailored to your specific needs,
            bringing you closer to your fitness goals.
          </p>
        </div>
        <div className="space-y-4 mt-6 lg:mt-10">
          {/** Handle errors */}
          <label className="font-semibold text-lg">
            Overall weight objective
          </label>
          <div className="md:flex items-center justify-between space-y-4 md:space-y-0">
            <button
              type="button"
              className={`flex items-center justify-center w-full md:w-[30%] font-medium border-2 border-neutral-500 rounded-lg py-2 ${
                objectiveAlgorithm.objective === "Lose" &&
                "bg-neutral-500 text-white"
              }`}
              onClick={() =>
                setObjectiveAlgorithm((prev) => ({
                  ...prev,
                  objective: "Lose",
                }))
              }
            >
              <svg
                width="40"
                height="40"
                viewBox="0 2 39 39"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M28.0347 17.1557C27.7634 16.0207 27.4016 14.9084 26.9494 13.8415C26.8477 13.5918 26.7007 13.3761 26.5085 13.1832C25.8867 12.5702 25.1745 12.0708 24.4057 11.6736C23.7274 11.3331 23.0039 11.0834 22.269 10.9358C21.6585 10.811 21.0141 10.9926 20.5619 11.4125C20.268 11.6849 19.9966 11.98 19.7592 12.3092C19.1488 13.1264 18.7531 14.0685 18.5722 15.124C18.3913 16.1456 19.0131 17.133 20.0306 17.4168C20.5054 17.553 21.0254 17.6097 21.4889 17.6211L20.8559 20.1635C20.2906 19.8684 19.6349 19.6074 18.8887 19.4598C18.0974 19.3009 17.3625 19.3009 16.7181 19.3804C16.6955 19.3009 16.6729 19.2328 16.6277 19.1534C16.1868 18.5178 14.9319 16.9855 12.7047 16.5315C9.94623 15.9753 7.86606 17.5189 7.48168 17.8367C7.11991 18.1319 7.06338 18.6653 7.35732 19.0285C7.65126 19.3917 8.18261 19.4485 8.55568 19.1534C8.83831 18.915 10.3645 17.78 12.3769 18.1886C13.6996 18.461 14.5475 19.2669 14.9771 19.7776C14.7849 19.8457 14.604 19.9252 14.4571 19.9819C14.0275 20.1749 13.8466 20.6857 14.0388 21.1056C14.2309 21.5369 14.7284 21.7185 15.158 21.5369C15.7798 21.2532 17.0573 20.8219 18.5835 21.117C20.6184 21.5142 21.7829 22.9216 22.1899 23.5119C22.3595 23.7502 22.6195 23.8751 22.8908 23.8751C23.0604 23.8751 23.23 23.8297 23.3769 23.7275C23.7613 23.4551 23.8518 22.933 23.5917 22.5471C23.3656 22.2179 22.9473 21.6958 22.3368 21.1624C22.3708 21.1056 22.4047 21.0375 22.416 20.9694L23.3204 17.3487C23.637 17.2465 23.9422 17.133 24.2361 16.9855C24.6544 16.7698 24.824 16.2591 24.6092 15.8391C24.3944 15.4191 23.8857 15.2602 23.4674 15.4646C23.0604 15.6689 22.416 15.9186 21.602 15.9186C21.2289 15.9186 20.8672 15.8732 20.5054 15.771C20.3358 15.7256 20.2454 15.5781 20.268 15.4191C20.4036 14.636 20.6976 13.9323 21.1498 13.3307C21.3194 13.0924 21.5229 12.8767 21.7377 12.6724C21.8055 12.6156 21.8846 12.5929 21.9638 12.6043C22.563 12.7291 23.1395 12.9221 23.6822 13.1945C24.304 13.501 24.8692 13.9096 25.4232 14.4884C25.8302 15.4759 26.1693 16.5088 26.4181 17.553C27.1416 20.5722 27.1755 23.7162 26.5198 26.9056C24.1796 27.5979 21.7716 27.9157 19.3522 27.859C17.1251 27.8136 14.9319 27.439 12.8065 26.7694C12.5238 26.6786 12.2073 26.7467 11.9812 26.951C11.7551 27.1553 11.6646 27.4617 11.7212 27.7682C11.8568 28.3925 11.8568 29.0508 11.7212 29.6637C11.529 30.549 11.0994 31.1846 10.7715 31.5705C10.4663 31.9337 10.5115 32.4672 10.862 32.7736C11.0202 32.9098 11.2124 32.9779 11.4159 32.9779C11.6533 32.9779 11.8907 32.8758 12.0603 32.6828C12.7047 31.9224 13.1569 31.0144 13.3717 30.0382C13.4622 29.6183 13.5074 29.187 13.5187 28.7557C15.4067 29.2551 17.3512 29.5275 19.307 29.5729C22.0768 29.6296 24.8353 29.2437 27.4921 28.3925C27.7747 28.3017 28.0008 28.0633 28.0573 27.7682C28.8826 24.1588 28.8826 20.5949 28.0573 17.1671L28.0347 17.1557Z"
                  fill="currentColor"
                />
                <path
                  d="M18.7324 26.3824C19.4822 26.3824 20.1218 26.2656 20.607 26.1489C21.0481 26.0321 21.3127 25.597 21.1914 25.1725C21.0701 24.7479 20.618 24.4932 20.1769 24.61C19.5153 24.7798 18.4788 24.9177 17.2989 24.61C16.6041 24.4295 15.9646 24.1217 15.3801 23.6866C15.0163 23.4107 14.498 23.4743 14.2223 23.8246C13.9466 24.1748 14.0128 24.6736 14.3657 24.939C15.1155 25.5015 15.9536 25.9048 16.8578 26.1383C17.5194 26.3081 18.1479 26.3717 18.7213 26.3717L18.7324 26.3824Z"
                  fill="currentColor"
                />
              </svg>

              <p>Lose weight</p>
            </button>
            <button
              type="button"
              className={`flex items-center justify-center w-full md:w-[30%] font-medium border-2 border-neutral-500 rounded-lg py-2 ${
                objectiveAlgorithm.objective === "Gain" &&
                "bg-neutral-500 text-white"
              }`}
              onClick={() =>
                setObjectiveAlgorithm((prev) => ({
                  ...prev,
                  objective: "Gain",
                }))
              }
            >
              <svg
                width="40"
                height="40"
                viewBox="0 2 39 39"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M28.0347 17.1557C27.7634 16.0207 27.4016 14.9084 26.9494 13.8415C26.8477 13.5918 26.7007 13.3761 26.5085 13.1832C25.8867 12.5702 25.1745 12.0708 24.4057 11.6736C23.7274 11.3331 23.0039 11.0834 22.269 10.9358C21.6585 10.811 21.0141 10.9926 20.5619 11.4125C20.268 11.6849 19.9966 11.98 19.7592 12.3092C19.1488 13.1264 18.7531 14.0685 18.5722 15.124C18.3913 16.1456 19.0131 17.133 20.0306 17.4168C20.5054 17.553 21.0254 17.6097 21.4889 17.6211L20.8559 20.1635C20.2906 19.8684 19.6349 19.6074 18.8887 19.4598C18.0974 19.3009 17.3625 19.3009 16.7181 19.3804C16.6955 19.3009 16.6729 19.2328 16.6277 19.1534C16.1868 18.5178 14.9319 16.9855 12.7047 16.5315C9.94623 15.9753 7.86606 17.5189 7.48168 17.8367C7.11991 18.1319 7.06338 18.6653 7.35732 19.0285C7.65126 19.3917 8.18261 19.4485 8.55568 19.1534C8.83831 18.915 10.3645 17.78 12.3769 18.1886C13.6996 18.461 14.5475 19.2669 14.9771 19.7776C14.7849 19.8457 14.604 19.9252 14.4571 19.9819C14.0275 20.1749 13.8466 20.6857 14.0388 21.1056C14.2309 21.5369 14.7284 21.7185 15.158 21.5369C15.7798 21.2532 17.0573 20.8219 18.5835 21.117C20.6184 21.5142 21.7829 22.9216 22.1899 23.5119C22.3595 23.7502 22.6195 23.8751 22.8908 23.8751C23.0604 23.8751 23.23 23.8297 23.3769 23.7275C23.7613 23.4551 23.8518 22.933 23.5917 22.5471C23.3656 22.2179 22.9473 21.6958 22.3368 21.1624C22.3708 21.1056 22.4047 21.0375 22.416 20.9694L23.3204 17.3487C23.637 17.2465 23.9422 17.133 24.2361 16.9855C24.6544 16.7698 24.824 16.2591 24.6092 15.8391C24.3944 15.4191 23.8857 15.2602 23.4674 15.4646C23.0604 15.6689 22.416 15.9186 21.602 15.9186C21.2289 15.9186 20.8672 15.8732 20.5054 15.771C20.3358 15.7256 20.2454 15.5781 20.268 15.4191C20.4036 14.636 20.6976 13.9323 21.1498 13.3307C21.3194 13.0924 21.5229 12.8767 21.7377 12.6724C21.8055 12.6156 21.8846 12.5929 21.9638 12.6043C22.563 12.7291 23.1395 12.9221 23.6822 13.1945C24.304 13.501 24.8692 13.9096 25.4232 14.4884C25.8302 15.4759 26.1693 16.5088 26.4181 17.553C27.1416 20.5722 27.1755 23.7162 26.5198 26.9056C24.1796 27.5979 21.7716 27.9157 19.3522 27.859C17.1251 27.8136 14.9319 27.439 12.8065 26.7694C12.5238 26.6786 12.2073 26.7467 11.9812 26.951C11.7551 27.1553 11.6646 27.4617 11.7212 27.7682C11.8568 28.3925 11.8568 29.0508 11.7212 29.6637C11.529 30.549 11.0994 31.1846 10.7715 31.5705C10.4663 31.9337 10.5115 32.4672 10.862 32.7736C11.0202 32.9098 11.2124 32.9779 11.4159 32.9779C11.6533 32.9779 11.8907 32.8758 12.0603 32.6828C12.7047 31.9224 13.1569 31.0144 13.3717 30.0382C13.4622 29.6183 13.5074 29.187 13.5187 28.7557C15.4067 29.2551 17.3512 29.5275 19.307 29.5729C22.0768 29.6296 24.8353 29.2437 27.4921 28.3925C27.7747 28.3017 28.0008 28.0633 28.0573 27.7682C28.8826 24.1588 28.8826 20.5949 28.0573 17.1671L28.0347 17.1557Z"
                  fill="currentColor"
                />
                <path
                  d="M18.7324 26.3824C19.4822 26.3824 20.1218 26.2656 20.607 26.1489C21.0481 26.0321 21.3127 25.597 21.1914 25.1725C21.0701 24.7479 20.618 24.4932 20.1769 24.61C19.5153 24.7798 18.4788 24.9177 17.2989 24.61C16.6041 24.4295 15.9646 24.1217 15.3801 23.6866C15.0163 23.4107 14.498 23.4743 14.2223 23.8246C13.9466 24.1748 14.0128 24.6736 14.3657 24.939C15.1155 25.5015 15.9536 25.9048 16.8578 26.1383C17.5194 26.3081 18.1479 26.3717 18.7213 26.3717L18.7324 26.3824Z"
                  fill="currentColor"
                />
              </svg>

              <p>Gain muscle</p>
            </button>
            <button
              type="button"
              className={`flex items-center justify-center w-full md:w-[30%] font-medium border-2 border-neutral-500 rounded-lg py-2 ${
                objectiveAlgorithm.objective === "Maintain" &&
                "bg-neutral-500 text-white"
              }`}
              onClick={() =>
                setObjectiveAlgorithm((prev) => ({
                  ...prev,
                  objective: "Maintain",
                }))
              }
            >
              <svg
                width="40"
                height="40"
                viewBox="0 2 39 39"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M28.0347 17.1557C27.7634 16.0207 27.4016 14.9084 26.9494 13.8415C26.8477 13.5918 26.7007 13.3761 26.5085 13.1832C25.8867 12.5702 25.1745 12.0708 24.4057 11.6736C23.7274 11.3331 23.0039 11.0834 22.269 10.9358C21.6585 10.811 21.0141 10.9926 20.5619 11.4125C20.268 11.6849 19.9966 11.98 19.7592 12.3092C19.1488 13.1264 18.7531 14.0685 18.5722 15.124C18.3913 16.1456 19.0131 17.133 20.0306 17.4168C20.5054 17.553 21.0254 17.6097 21.4889 17.6211L20.8559 20.1635C20.2906 19.8684 19.6349 19.6074 18.8887 19.4598C18.0974 19.3009 17.3625 19.3009 16.7181 19.3804C16.6955 19.3009 16.6729 19.2328 16.6277 19.1534C16.1868 18.5178 14.9319 16.9855 12.7047 16.5315C9.94623 15.9753 7.86606 17.5189 7.48168 17.8367C7.11991 18.1319 7.06338 18.6653 7.35732 19.0285C7.65126 19.3917 8.18261 19.4485 8.55568 19.1534C8.83831 18.915 10.3645 17.78 12.3769 18.1886C13.6996 18.461 14.5475 19.2669 14.9771 19.7776C14.7849 19.8457 14.604 19.9252 14.4571 19.9819C14.0275 20.1749 13.8466 20.6857 14.0388 21.1056C14.2309 21.5369 14.7284 21.7185 15.158 21.5369C15.7798 21.2532 17.0573 20.8219 18.5835 21.117C20.6184 21.5142 21.7829 22.9216 22.1899 23.5119C22.3595 23.7502 22.6195 23.8751 22.8908 23.8751C23.0604 23.8751 23.23 23.8297 23.3769 23.7275C23.7613 23.4551 23.8518 22.933 23.5917 22.5471C23.3656 22.2179 22.9473 21.6958 22.3368 21.1624C22.3708 21.1056 22.4047 21.0375 22.416 20.9694L23.3204 17.3487C23.637 17.2465 23.9422 17.133 24.2361 16.9855C24.6544 16.7698 24.824 16.2591 24.6092 15.8391C24.3944 15.4191 23.8857 15.2602 23.4674 15.4646C23.0604 15.6689 22.416 15.9186 21.602 15.9186C21.2289 15.9186 20.8672 15.8732 20.5054 15.771C20.3358 15.7256 20.2454 15.5781 20.268 15.4191C20.4036 14.636 20.6976 13.9323 21.1498 13.3307C21.3194 13.0924 21.5229 12.8767 21.7377 12.6724C21.8055 12.6156 21.8846 12.5929 21.9638 12.6043C22.563 12.7291 23.1395 12.9221 23.6822 13.1945C24.304 13.501 24.8692 13.9096 25.4232 14.4884C25.8302 15.4759 26.1693 16.5088 26.4181 17.553C27.1416 20.5722 27.1755 23.7162 26.5198 26.9056C24.1796 27.5979 21.7716 27.9157 19.3522 27.859C17.1251 27.8136 14.9319 27.439 12.8065 26.7694C12.5238 26.6786 12.2073 26.7467 11.9812 26.951C11.7551 27.1553 11.6646 27.4617 11.7212 27.7682C11.8568 28.3925 11.8568 29.0508 11.7212 29.6637C11.529 30.549 11.0994 31.1846 10.7715 31.5705C10.4663 31.9337 10.5115 32.4672 10.862 32.7736C11.0202 32.9098 11.2124 32.9779 11.4159 32.9779C11.6533 32.9779 11.8907 32.8758 12.0603 32.6828C12.7047 31.9224 13.1569 31.0144 13.3717 30.0382C13.4622 29.6183 13.5074 29.187 13.5187 28.7557C15.4067 29.2551 17.3512 29.5275 19.307 29.5729C22.0768 29.6296 24.8353 29.2437 27.4921 28.3925C27.7747 28.3017 28.0008 28.0633 28.0573 27.7682C28.8826 24.1588 28.8826 20.5949 28.0573 17.1671L28.0347 17.1557Z"
                  fill="currentColor"
                />
                <path
                  d="M18.7324 26.3824C19.4822 26.3824 20.1218 26.2656 20.607 26.1489C21.0481 26.0321 21.3127 25.597 21.1914 25.1725C21.0701 24.7479 20.618 24.4932 20.1769 24.61C19.5153 24.7798 18.4788 24.9177 17.2989 24.61C16.6041 24.4295 15.9646 24.1217 15.3801 23.6866C15.0163 23.4107 14.498 23.4743 14.2223 23.8246C13.9466 24.1748 14.0128 24.6736 14.3657 24.939C15.1155 25.5015 15.9536 25.9048 16.8578 26.1383C17.5194 26.3081 18.1479 26.3717 18.7213 26.3717L18.7324 26.3824Z"
                  fill="currentColor"
                />
              </svg>
              <p>Maintain muscle</p>
            </button>
          </div>
        </div>
        <div className="md:flex items-center justify-between space-x-4">
          <div className="flex items-center space-x-4">
            <div className="space-y-4 mt-6 lg:mt-10 w-full md:w-1/3">
              {/** Handle errors */}
              <label className="font-semibold text-lg">Current weight</label>
              <input
                value={objectiveAlgorithm.currentWeight ?? ""}
                onChange={(e) =>
                  handleChange(
                    e.target.valueAsNumber,
                    "currentWeight",
                    e.target.value
                  )
                }
                type="number"
                name="weight"
                className="border-black rounded-xl w-full"
                placeholder="ex. 175"
              />
            </div>
            <div className="space-y-4 mt-6 lg:mt-10 w-full md:w-1/3">
              {/** Handle errors */}
              <label className="font-semibold text-lg">Weight goal</label>
              <input
                value={objectiveAlgorithm.weightObjective ?? ""}
                onChange={(e) =>
                  handleChange(
                    e.target.valueAsNumber,
                    "weightObjective",
                    e.target.value
                  )
                }
                type="number"
                name="weight"
                className="border-black rounded-xl w-full"
                placeholder="ex. 175"
              />
            </div>
          </div>
          <div className="space-y-4 mt-6 lg:mt-10 w-full">
            {/** Handle errors */}
            <label className="font-semibold text-lg">Amount of time</label>
            <div className="flex items-center space-x-2">
              <input
                type="range"
                min={1}
                max={12}
                value={objectiveAlgorithm.timeRange}
                onChange={(e) =>
                  handleChange(e.target.valueAsNumber, "range", e.target.value)
                }
                name="time"
                className="w-full"
              />
              <p className="min-w-24 font-semibold">
                {objectiveAlgorithm.timeRange} month
                {objectiveAlgorithm.timeRange !== 1 && "s"}
              </p>
            </div>
          </div>
        </div>
        <div className="space-y-4 mt-6">
          {/** Handle errors */}
          <label className="font-semibold text-lg">Intensity</label>
          <div className="flex items-center justify-between space-x-2 sm:space-x-4">
            <div className="w-full text-center space-y-2">
              <button
                type="button"
                className={`flex items-center justify-center w-full font-medium border-2 border-neutral-500 rounded-lg py-2 ${
                  objectiveAlgorithm.objectiveIntensity === "Low" &&
                  "bg-neutral-500 text-white"
                }`}
                onClick={() =>
                  setObjectiveAlgorithm((prev) => ({
                    ...prev,
                    objectiveIntensity: "Low",
                  }))
                }
              >
                <p>Low</p>
              </button>
              <p className="w-full text-neutral-500 font-semibold">
                1-2 days a week
              </p>
            </div>
            <div className="w-full text-center space-y-2">
              <button
                type="button"
                className={`flex items-center justify-center w-full font-medium border-2 border-neutral-500 rounded-lg py-2 ${
                  objectiveAlgorithm.objectiveIntensity === "Moderate" &&
                  "bg-neutral-500 text-white"
                }`}
                onClick={() =>
                  setObjectiveAlgorithm((prev) => ({
                    ...prev,
                    objectiveIntensity: "Moderate",
                  }))
                }
              >
                <p>Moderate</p>
              </button>
              <p className="w-full text-neutral-500 font-semibold">
                3-5 days a week
              </p>
            </div>
            <div className="w-full text-center space-y-2">
              <button
                type="button"
                className={`flex items-center justify-center w-full font-medium border-2 border-neutral-500 rounded-lg py-2 ${
                  objectiveAlgorithm.objectiveIntensity === "High" &&
                  "bg-neutral-500 text-white"
                }`}
                onClick={() =>
                  setObjectiveAlgorithm((prev) => ({
                    ...prev,
                    objectiveIntensity: "High",
                  }))
                }
              >
                <p>High</p>
              </button>
              <p className="w-full text-neutral-500 font-semibold">
                6-7 days a week
              </p>
            </div>
          </div>
        </div>
        <div className="space-y-4 mt-6 mb-20">
          {/** Handle errors */}
          <label className="font-semibold text-lg">Experience level</label>
          <div className="flex items-center justify-between space-x-1 sm:space-x-4">
            <div className="w-full text-center space-y-2">
              <button
                type="button"
                className={`flex items-center justify-center w-full font-medium border-2 border-neutral-500 rounded-lg py-2 ${
                  objectiveAlgorithm.experienceLevel === "Beginner" &&
                  "bg-neutral-500 text-white"
                }`}
                onClick={() =>
                  setObjectiveAlgorithm((prev) => ({
                    ...prev,
                    experienceLevel: "Beginner",
                  }))
                }
              >
                <p>Beginner</p>
              </button>
            </div>
            <div className="w-full text-center space-y-2">
              <button
                type="button"
                className={`flex items-center justify-center w-full font-medium border-2 border-neutral-500 rounded-lg py-2 ${
                  objectiveAlgorithm.experienceLevel === "Intermediate" &&
                  "bg-neutral-500 text-white"
                }`}
                onClick={() =>
                  setObjectiveAlgorithm((prev) => ({
                    ...prev,
                    experienceLevel: "Intermediate",
                  }))
                }
              >
                <p>Intermediate</p>
              </button>
            </div>
            <div className="w-full text-center space-y-2">
              <button
                type="button"
                className={`flex items-center justify-center w-full font-medium border-2 border-neutral-500 rounded-lg py-2 ${
                  objectiveAlgorithm.experienceLevel === "Advanced" &&
                  "bg-neutral-500 text-white"
                }`}
                onClick={() =>
                  setObjectiveAlgorithm((prev) => ({
                    ...prev,
                    experienceLevel: "Advanced",
                  }))
                }
              >
                <p>Advanced</p>
              </button>
            </div>
          </div>
        </div>
        <button
          className="mt-8 flex items-center gap-2 justify-center py-4 px-3 rounded-xl hover:opacity-75 hover:transition ease-in-out duration-300 bg-black text-white w-full disabled:opacity-60"
          type="submit"
          disabled={loading || disableButton}
        >
          Next
          {loading && (
            <Image
              src="/loading.gif"
              width={25}
              height={25}
              alt="Loading gif"
            />
          )}
        </button>
      </form>
    </div>
  );
};

export default CreateWorkoutObjective;
