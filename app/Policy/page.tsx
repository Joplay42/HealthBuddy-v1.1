import { Footer, HeaderPage } from "@/components";
import React from "react";

const page = () => {
  return (
    <>
      <HeaderPage />
      <div className="bg-custom-dark  pt-40 min-h-screen text-white">
        <div className="container mx-auto p-4 text-center max-w-[40rem] space-y-10">
          <h1 className="text-3xl font-bold">Privacy Policy</h1>
          <p className="mt-2 text-gray-300">
            HealthBuddy is committed to protecting your privacy. This Privacy
            Policy explains how we collect, use, and protect your personal data.
          </p>

          <h2 className="mt-4 text-xl font-semibold">
            1. Information We Collect
          </h2>
          <p className="text-gray-300">
            We collect personal data such as your email address, password, and
            any health-related information you input, such as your weight,
            exercise routine, or nutrition details.
          </p>

          <h2 className="mt-4 text-xl font-semibold">
            2. How We Use Your Data
          </h2>
          <p className="text-gray-300">
            We use your data to provide and improve our services, including
            creating a personalized experience for your health and fitness
            journey.
          </p>

          <h2 className="mt-4 text-xl font-semibold">3. Data Protection</h2>
          <p className="text-gray-300">
            We implement reasonable security measures to protect your data from
            unauthorized access or disclosure. However, no method of
            transmission over the internet is 100% secure.
          </p>

          <h2 className="mt-4 text-xl font-semibold">4. Sharing Your Data</h2>
          <p className="text-gray-300">
            We do not share your personal data with third parties except as
            required by law or to provide necessary services related to your
            account.
          </p>

          <h2 className="mt-4 text-xl font-semibold">5. User Rights</h2>
          <p className="text-gray-300">
            You have the right to access, correct, or delete your personal data
            at any time by contacting us through the app or our support.
          </p>

          <h2 className="mt-4 text-xl font-semibold">
            6. Changes to Privacy Policy
          </h2>
          <p className="text-gray-300">
            We may update this Privacy Policy from time to time. Any significant
            changes will be communicated through the app or via email.
          </p>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default page;
