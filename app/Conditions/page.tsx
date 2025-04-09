import { Footer, HeaderPage } from "@/components";
import React from "react";

const page = () => {
  return (
    <>
      <HeaderPage />
      <div className="bg-custom-dark  pt-30 lg:pt-40 min-h-screen text-white">
        <div className="container mx-auto p-4 text-center w-[40rem] space-y-10">
          <h1 className="text-3xl font-bold">Terms and Conditions</h1>
          <p className="mt-2 text-gray-300">
            Welcome to HealthBuddy! By using our app, you agree to these terms
            and conditions. Please read them carefully.
          </p>

          <h2 className="mt-4 text-xl font-semibold">
            1. Account Registration
          </h2>
          <p className="text-gray-300">
            In order to use HealthBuddy, you must create an account by providing
            a valid email and password. You agree to provide accurate and
            up-to-date information during the registration process.
          </p>

          <h2 className="mt-4 text-xl font-semibold">2. User Data</h2>
          <p className="text-gray-300">
            HealthBuddy collects personal data such as your email address,
            password, and any health-related data you input. We use this data to
            provide and personalize your experience.
          </p>

          <h2 className="mt-4 text-xl font-semibold">
            3. User Responsibilities
          </h2>
          <p className="text-gray-300">
            You are responsible for maintaining the confidentiality of your
            account credentials. You agree to notify us immediately if you
            suspect unauthorized access to your account.
          </p>

          <h2 className="mt-4 text-xl font-semibold">4. Changes to Terms</h2>
          <p className="text-gray-300">
            We reserve the right to update or modify these Terms and Conditions
            at any time. We will notify you of any significant changes through
            the app or via email.
          </p>

          <h2 className="mt-4 text-xl font-semibold">5. Termination</h2>
          <p className="text-gray-300">
            We may suspend or terminate your account if you violate these terms.
            You may also terminate your account by contacting us.
          </p>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default page;
