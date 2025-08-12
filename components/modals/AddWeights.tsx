"use client";
import React, { FormEvent, useEffect, useState } from "react";
import Modal from "./Modal";

export type userWeightProps = {
  number: number | undefined;
  date: string | undefined;
};

const AddWeights = () => {
  // Hooks for the weight object
  const [weight, setWeight] = useState<userWeightProps>({
    number: undefined,
    date: undefined,
  });
  // Hooks for the button
  const [buttonDisabled, setButtonDisabled] = useState<boolean>(true);

  // UseEFfect to detect the button disability
  useEffect(() => {
    if (weight?.number !== undefined && weight?.date !== undefined) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [weight]);

  // Function to handle the range changes
  const handleChange = (nb: number, input: string, rawValue: string) => {
    // If the input is empty, store undefined instead of NaN
    if (rawValue === "") {
      setWeight((prev) => ({
        ...prev,
        [input]: undefined,
      }));
      setButtonDisabled(true);
      return;
    }
    // Set the amount to the right number
    setWeight((prev) => ({ ...prev, [input]: nb }));
    // Disable the button if 0 or negative number
    if (nb <= 0) {
      setWeight((prev) => ({ ...prev, [input]: 0 }));
      setButtonDisabled(true);
    } else if (Number.isNaN(nb)) {
      setButtonDisabled(true);
    } else {
      setButtonDisabled(false);
    }
  };

  // Function to handle the form submit
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    // Prevent refresh
    e.preventDefault();
  };

  return (
    <div>
      <Modal title="Add weight">
        <div className="py-5 px-4 lg:px-10">
          <form onSubmit={handleSubmit}>
            <div className="space-y-4 mt-6 lg:mt-10 flex flex-col">
              <label className="font-semibold text-lg">Weight</label>
              <input
                type="number"
                value={weight?.number ?? ""}
                onChange={(e) =>
                  handleChange(e.target.valueAsNumber, "number", e.target.value)
                }
                className="rounded-xl w-full"
                placeholder="120"
              />
            </div>
            <div className="space-y-4 mt-6 lg:mt-10 flex flex-col">
              <label className="font-semibold text-lg">Date</label>
              <input
                type="date"
                value={weight?.date ?? ""}
                onChange={(e) =>
                  setWeight((prev) => ({ ...prev, date: e.target.value }))
                }
                className="rounded-xl w-full"
              />
            </div>
            <button
              className="my-8 flex items-center gap-2 justify-center py-4 px-3 rounded-xl hover:opacity-75 hover:transition ease-in-out duration-300 bg-black text-white w-full disabled:opacity-60"
              type="submit"
              disabled={buttonDisabled}
            >
              Add weight
              {/* {loading && (
                        <Image
                          src="/loading.gif"
                          width={35}
                          height={35}
                          alt="Loading gif"
                        />
                      )} */}
            </button>
          </form>
        </div>
      </Modal>
    </div>
  );
};

export default AddWeights;
