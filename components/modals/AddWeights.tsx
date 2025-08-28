"use client";
import React, { FormEvent, useEffect, useState } from "react";
import Modal from "./Modal";
import Image from "next/image";
import { useFirebaseAuth } from "@/context/UserContext";
import { Slide, toast } from "react-toastify";
import { useRouter, useSearchParams } from "next/navigation";
import { Timestamp } from "firebase/firestore";

export type userWeightProps = {
  number: number | undefined;
  date: Date | undefined;
};

const AddWeights = () => {
  // Hooks for the weight object
  const [weight, setWeight] = useState<userWeightProps>({
    number: undefined,
    date: undefined,
  });
  // Loading state
  const [loading, setLoading] = useState(false);
  // Error state
  const [error, setError] = useState<string>();
  // Hooks for the button
  const [buttonDisabled, setButtonDisabled] = useState<boolean>(true);

  // Navigation params
  const router = useRouter();
  const searchParams = useSearchParams();

  // The context to get the currentUser
  const { user } = useFirebaseAuth();

  // Retrieve the url id
  const id = searchParams.get("id");

  // UseEFfect to detect the button disability
  useEffect(() => {
    if (weight?.number !== undefined && weight?.date !== undefined) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [weight]);

  // UseEffect to fetch the weight to update
  useEffect(() => {
    // Function to handle the item fetching if id in url
    const fetchWeight = async () => {
      try {
        if (user) {
          // Fetch the data
          const res = await fetch(
            `/api/workouts/weight?userid=${user.uid}&id=${id}`
          );
          const result = await res.json();

          if (!res.ok) {
            throw new Error(result.error || "Failed to fetch weight");
          }

          // Convert the date to a JS Date object
          const weightData = {
            ...result.data,
            date: result.data.date ? new Date(result.data.date) : null,
          };

          // Store in state
          setWeight(weightData);
        }
      } catch (error: any) {
        // Error handling
        console.error(error.message);
      }
    };
    if (id) {
      fetchWeight();
    }
  }, [user?.uid, id, router]);

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
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    try {
      // Clear the errors
      setError("");
      // Prevent page reload
      e.preventDefault();
      // enable the loading animation
      setLoading(true);

      // Check if a user was found
      if (user) {
        let payload = {
          ...weight,
          date:
            weight.date instanceof Date
              ? Timestamp.fromDate(weight.date)
              : weight.date
              ? Timestamp.fromDate(new Date(weight.date))
              : null, // fallback if undefined
        };

        let res = null;

        if (!id) {
          res = await fetch(`/api/workouts/weight?userid=${user.uid}`, {
            method: "POST",
            body: JSON.stringify(payload),
          });
        } else {
          res = await fetch(
            `/api/workouts/weight?userid=${user.uid}&id=${id}`,
            {
              method: "PATCH",
              body: JSON.stringify(payload),
            }
          );
        }

        // Store the data
        const data = await res.json();
        if (!res.ok) {
          throw new Error(data.error);
        }

        // Closing the modal when the operation is done
        // Get the current params
        const currentParams = new URLSearchParams(window.location.search);
        // Delete the current param
        currentParams.delete("modal");
        // Push the router to the route without params
        router.replace(window.location.pathname);
        // Succes messsage
        const message = !id
          ? "A new weight has been added!"
          : "Weight has been updated";

        setTimeout(() => {
          // Notify the user
          toast.success(message, {
            position: "bottom-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            transition: Slide,
          });
        }, 100);
      }

      // Disable the loading animation
      setLoading(false);
    } catch (error: any) {
      console.error(error);
      setError(error.message);
      setLoading(false);
    }
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
                value={
                  weight.date ? weight.date.toISOString().split("T")[0] : ""
                }
                onChange={(e) => {
                  const [year, month, day] = e.target.value
                    .split("-")
                    .map(Number);
                  const newDate = new Date(year, month - 1, day);
                  setWeight((prev) => ({ ...prev, date: newDate }));
                }}
              />
            </div>
            {error && <p className="text-red-500">{error}</p>}
            <button
              className="my-8 flex items-center gap-2 justify-center py-4 px-3 rounded-xl hover:opacity-75 hover:transition ease-in-out duration-300 bg-black text-white w-full disabled:opacity-60"
              type="submit"
              disabled={buttonDisabled}
            >
              Add weight
              {loading && (
                <Image
                  src="/loading.gif"
                  width={35}
                  height={35}
                  alt="Loading gif"
                />
              )}
            </button>
          </form>
        </div>
      </Modal>
    </div>
  );
};

export default AddWeights;
