"use client";
import { handleSubmitResetProps } from "@/types";
import { resetPassword } from "@/utils";
import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

const ResetPasswordForm = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  /**
   * This fonction is used when the submit button is clicked.
   * It passes 2 parameter :
   * email - the email of the account to send the password verification
   * event - the form event
   *
   * @param email
   * @param event
   */
  const handleSubmit = async ({ email, event }: handleSubmitResetProps) => {
    // Make the loading animation start
    setLoading(true);
    // Prevent the page refresh
    event.preventDefault();
    // Set the default value of the email in the form
    setEmail("");

    // Handle the errors when submitting
    try {
      // Calls the resetEmail function
      await resetPassword({ email });

      // The router redirects to the confirmation page
      router.push("/confirmation");

      // Stop the loading animation
      setLoading(false);

      // Catch any error
    } catch (error: any) {
      // Display the error message
      setError(error.message);

      // Make the loading animation stop
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={(e) => handleSubmit({ email: email, event: e })}
      className="mt-20 space-y-10"
    >
      <div className="flex flex-col space-y-4">
        <label className="text-neutral-500">EMAIL</label>
        <input
          className="border-b border-neutral-500 p-2"
          type="email"
          placeholder="Enter your email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          required
        />
      </div>
      {error && <p className="text-red-500">{error}</p>}
      <button
        className="flex items-center gap-2 justify-center py-4 px-3 rounded-xl hover:opacity-75 hover:transition ease-in-out duration-300 bg-black text-white w-full disabled:opacity-60"
        type="submit"
        disabled={loading}
      >
        Send verification email
        {loading && (
          <Image src="/loading.gif" width={40} height={40} alt="Loading gif" />
        )}
      </button>
    </form>
  );
};

export default ResetPasswordForm;
