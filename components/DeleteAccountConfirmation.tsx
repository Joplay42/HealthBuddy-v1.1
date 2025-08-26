"use client";
// Props import
import { DeleteAccountConfirmationProps } from "@/types";
// Utils function import
import { deleteAccount } from "@/utils";
import { useState } from "react";
import Image from "next/image";

/**
 * This component is used to show a confirmation when deleting the account. It can set the error
 * if something is wrong and it can set the state of visibility.
 *
 * @param setState Set the visibility
 * @param setError Set the error message
 * @returns
 */
const DeleteAccountConfirmation = ({
  setState,
  setError,
}: DeleteAccountConfirmationProps) => {
  // States for the user credentials
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  // States for the loading
  const [loading, setLoading] = useState(false);

  // This async arrow function is calling the deleteAccount method from utils
  const handleSubmit = async () => {
    // Handles all the error and displays it
    try {
      setLoading(true);
      // Delete the account from firebase
      await deleteAccount(credentials.email, credentials.password);
    } catch (error: any) {
      // The error code that arrives frequently
      if (error.code == "auth/requires-recent-login") {
        // Show the error
        setError(
          "You need to re-login to delete this account. (auth/requires-recent-login)"
        );
      } else {
        // Show another error
        setError(error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    // DeleteAccountConfirmation container
    <div className="justify-center items-center w-full ">
      <div className="w-full max-h-full">
        <div className="flex space-x-4">
          <div className="flex flex-col w-full gap-y-2">
            {/** Display the label above */}
            <label className="font-bold">Email</label>
            {/** Display the input */}
            <input
              className="border-black rounded-xl w-full"
              type="text"
              onChange={(e) =>
                setCredentials({ ...credentials, email: e.target.value })
              }
              value={credentials.email}
              required
            />
          </div>
          <div className="flex flex-col w-full gap-y-2">
            {/** Display the label above */}
            <label className="font-bold">Password</label>
            {/** Display the input */}
            <input
              className="border-black rounded-xl w-full"
              type="password"
              onChange={(e) =>
                setCredentials({ ...credentials, password: e.target.value })
              }
              value={credentials.password}
              required
            />
          </div>
        </div>
        <div className="relative">
          {/** Set the padding */}
          <div className="p-4 md:p-5 text-center">
            {/** Title */}
            <h3 className="mb-5 text-lg font-normal text-gray-500 ">
              Are you sure you want to delete this account?
            </h3>
            {/** Button to delete account */}
            <button
              className="items-center gap-2 justify-center py-4 px-3 rounded-xl hover:opacity-75 hover:transition ease-in-out duration-300 bg-black text-white disabled:opacity-60 inline-flex mx-3"
              onClick={handleSubmit}
              disabled={loading}
            >
              Yes, I&apos;m sure
              {loading && (
                <Image
                  src="/loading.gif"
                  width={25}
                  height={25}
                  alt="Loading gif"
                />
              )}
            </button>
            {/** Button to cancel */}
            <button
              onClick={() => setState(false)}
              className="items-center gap-2 justify-center py-4 px-3 rounded-xl hover:opacity-75 hover:transition ease-in-out duration-300 bg-neutral-700 text-white disabled:opacity-60 inline-flex"
              disabled={loading}
            >
              No, cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteAccountConfirmation;
