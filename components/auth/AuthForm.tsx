"use client";
import { authFormProps, handleFormSubmitProps } from "@/types";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { createUser, loginUser } from "@/utils";
import { useRouter } from "next/navigation";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/config/firebase";

const AuthForm = ({ type }: authFormProps) => {
  // Set all the hooks for the form attributes
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Error and loading hooks
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Router hooks to make the navigation to the dashboard or back to home
  const router = useRouter();

  /**
   * This method is used when the submit button in the form is clicked.
   * It has 2 parameter :
   *
   * type - declare a type for the form so the component can be reused
   * event - the form event
   *
   * @param type
   * @param event
   */
  const handleSubmit = async ({ type, event }: handleFormSubmitProps) => {
    // Display the loading animation
    setLoading(true);
    // Prevent the reload when clicked
    event?.preventDefault();
    // Display no error
    setError("");

    // If authForm is signIn?
    if (type == "signin") {
      // Handle the signin errors
      try {
        const res = await fetch("/api/users", {
          method: "POST",
          body: JSON.stringify({
            firstName,
            lastName,
            email,
            password,
          }),
        });

        // Store the data
        const data = await res.json();
        if (!res.ok) {
          throw new Error(data.error);
        }

        // Set the default value
        setFirstName("");
        setLastName("");
        setEmail("");
        setPassword("");

        // Turn the loading animation off
        setLoading(false);

        // Sign in the user
        await signInWithEmailAndPassword(auth, email, password);

        // Make a new route
        router.push("/dashboard");
      } catch (error: any) {
        // Display the error
        setError(error.message);
        setLoading(false);
      }
      // If the authForm is login
    } else if (type == "login") {
      // Handle the errors
      try {
        // Call the logInUser fonction using email and password
        await loginUser({
          email: email,
          password: password,
        });

        // Reset the value of the form
        setEmail("");
        setPassword("");

        // Make the loading animation stop
        setLoading(false);

        // Push the route to the dashboard
        router.push("/dashboard");

        // Catch any error
      } catch (error: any) {
        // Display the error
        setError(error.message);
        // Make the loading animation stop
        setLoading(false);
      }
    }
  };

  return (
    <div className="mt-6 lg:mt-0 max-w-[40rem]">
      <h1 className="text-xl lg:text-3xl font-bold lg:pb-4">
        {type == "login" ? "Log in" : "Create a new account"}
      </h1>
      <p className="text-sm lg:text-base pb-4 lg:pb-0">
        {type == "login"
          ? "Welcome to your Healthbuddy Dashboard, please put your signin credentials below to begin using the app"
          : "Create your free HealthBuddy account now, please enter your new account credential to have access to the app."}
      </p>

      <form
        onSubmit={(e) => handleSubmit({ type: type, event: e })}
        className="mt-4 lg:mt-10 space-y-3 lg:space-y-8"
      >
        {type == "signin" && (
          <div className="flex flex-col space-y-4 lg:space-y-0 lg:flex-row lg:space-x-14">
            <div className="flex flex-col space-y-2 lg:space-y-4 w-full">
              <label className="text-neutral-500 text-sm">FIRST NAME</label>
              <input
                className="border-b border-neutral-500 p-2"
                type="text"
                placeholder="Enter your first name"
                onChange={(e) => setFirstName(e.target.value)}
                value={firstName}
                required
              />
            </div>
            <div className="flex flex-col space-y-4 w-full">
              <label className="text-neutral-500 text-sm">LAST NAME</label>
              <input
                className="border-b border-neutral-500 p-2"
                type="text"
                placeholder="Enter your last name"
                onChange={(e) => setLastName(e.target.value)}
                value={lastName}
                required
              />
            </div>
          </div>
        )}
        <div className="flex flex-col space-y-4">
          <label className="text-neutral-500 text-sm">EMAIL</label>
          <input
            className="border-b border-neutral-500 p-2"
            type="email"
            placeholder="Enter your email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            required
          />
        </div>
        <div className="flex flex-col space-y-4">
          <label className="text-neutral-500 text-sm">PASSWORD</label>
          <input
            className="border-b border-neutral-500 p-2"
            type="password"
            placeholder="Enter your password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            required
          />
        </div>
        {type == "login" && (
          <Link href="/reset-password" className="flex items-center gap-x-2">
            <Image src="/lock.svg" width={20} height={20} alt="lock image" />
            <p className="font-bold text-custom-green hover:text-lime-400">
              Forgot password?
            </p>
          </Link>
        )}
        <div className="sm:flex items-center gap-x-2">
          <p className="font-bold">
            {type == "login"
              ? "Don't have an account?"
              : "Already have an account?"}
          </p>
          <Link
            className="font-bold text-custom-green hover:text-lime-400"
            href={type == "login" ? "/signin" : "/login"}
          >
            {type == "login" ? "Sign up" : "Log in"}
          </Link>
        </div>
        {error && <p className="text-red-500">{error}</p>}
        <button
          className="flex items-center gap-2 justify-center py-4 px-3 rounded-xl hover:opacity-75 hover:transition ease-in-out duration-300 bg-black text-white w-full disabled:opacity-60"
          type="submit"
          disabled={loading}
        >
          {type == "login" ? "Log in" : "Create new account"}
          {loading && (
            <Image
              src="/loading.gif"
              width={40}
              height={40}
              alt="Loading gif"
            />
          )}
        </button>
      </form>
    </div>
  );
};

export default AuthForm;
