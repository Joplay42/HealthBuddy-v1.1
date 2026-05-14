import { Footer, HeaderPage } from "@/components";
import React from "react";

const page = () => {
  return (
    <div className="min-h-screen bg-ink-950 text-bone font-sans overflow-x-hidden">
      <HeaderPage />
      <div className="pt-32 pb-20">
        <div className="container mx-auto px-4 max-w-[40rem] space-y-8">
          <h1 className="text-3xl font-black tracking-tightest text-bone">Privacy Policy</h1>
          <p className="text-white/55">
            HealthBuddy is committed to protecting your privacy. This Privacy
            Policy explains how we collect, use, and protect your personal data.
          </p>

          <div className="space-y-2">
            <h2 className="text-lg font-extrabold text-bone">1. Information We Collect</h2>
            <p className="text-white/55">
              We collect personal data such as your email address, password, and
              any health-related information you input, such as your weight,
              exercise routine, or nutrition details.
            </p>
          </div>

          <div className="space-y-2">
            <h2 className="text-lg font-extrabold text-bone">2. How We Use Your Data</h2>
            <p className="text-white/55">
              We use your data to provide and improve our services, including
              creating a personalized experience for your health and fitness journey.
            </p>
          </div>

          <div className="space-y-2">
            <h2 className="text-lg font-extrabold text-bone">3. Data Protection</h2>
            <p className="text-white/55">
              We implement reasonable security measures to protect your data from
              unauthorized access or disclosure. However, no method of
              transmission over the internet is 100% secure.
            </p>
          </div>

          <div className="space-y-2">
            <h2 className="text-lg font-extrabold text-bone">4. Sharing Your Data</h2>
            <p className="text-white/55">
              We do not share your personal data with third parties except as
              required by law or to provide necessary services related to your account.
            </p>
          </div>

          <div className="space-y-2">
            <h2 className="text-lg font-extrabold text-bone">5. User Rights</h2>
            <p className="text-white/55">
              You have the right to access, correct, or delete your personal data
              at any time by contacting us through the app or our support.
            </p>
          </div>

          <div className="space-y-2">
            <h2 className="text-lg font-extrabold text-bone">6. Changes to Privacy Policy</h2>
            <p className="text-white/55">
              We may update this Privacy Policy from time to time. Any significant
              changes will be communicated through the app or via email.
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default page;
