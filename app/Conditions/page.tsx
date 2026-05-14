import { Footer, HeaderPage } from "@/components";
import React from "react";

const page = () => {
  return (
    <div className="min-h-screen bg-ink-950 text-bone font-sans overflow-x-hidden">
      <HeaderPage />
      <div className="pt-32 pb-20">
        <div className="container mx-auto px-4 max-w-[40rem] space-y-8">
          <h1 className="text-3xl font-black tracking-tightest text-bone">Terms and Conditions</h1>
          <p className="text-white/55">
            Welcome to HealthBuddy! By using our app, you agree to these terms
            and conditions. Please read them carefully.
          </p>

          <div className="space-y-2">
            <h2 className="text-lg font-extrabold text-bone">1. Account Registration</h2>
            <p className="text-white/55">
              In order to use HealthBuddy, you must create an account by providing
              a valid email and password. You agree to provide accurate and
              up-to-date information during the registration process.
            </p>
          </div>

          <div className="space-y-2">
            <h2 className="text-lg font-extrabold text-bone">2. User Data</h2>
            <p className="text-white/55">
              HealthBuddy collects personal data such as your email address,
              password, and any health-related data you input. We use this data to
              provide and personalize your experience.
            </p>
          </div>

          <div className="space-y-2">
            <h2 className="text-lg font-extrabold text-bone">3. User Responsibilities</h2>
            <p className="text-white/55">
              You are responsible for maintaining the confidentiality of your
              account credentials. You agree to notify us immediately if you
              suspect unauthorized access to your account.
            </p>
          </div>

          <div className="space-y-2">
            <h2 className="text-lg font-extrabold text-bone">4. Changes to Terms</h2>
            <p className="text-white/55">
              We reserve the right to update or modify these Terms and Conditions
              at any time. We will notify you of any significant changes through
              the app or via email.
            </p>
          </div>

          <div className="space-y-2">
            <h2 className="text-lg font-extrabold text-bone">5. Termination</h2>
            <p className="text-white/55">
              We may suspend or terminate your account if you violate these terms.
              You may also terminate your account by contacting us.
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default page;
