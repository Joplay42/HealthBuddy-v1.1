import React from "react";

const PatchNote = () => {
  return (
    <div className="text-center pb-20 mx-auto bg-white shadow-md rounded-xl mt-8">
      <h1 className="text-2xl font-boldmb-4 text-gray-800">
        👋 Hello, dear users!
      </h1>
      <p className="text-gray-600 mb-6">
        We're excited to share with you the latest updates and improvements in
        this version.
      </p>

      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-2">
          🐞 Bug Fixes
        </h2>
        <ul className="list-disc list-inside text-gray-700 space-y-1">
          <li>Fixed mobile responsiveness for the quotes component</li>
          <li>Resolved visual issues with the charts</li>
          <li>Fixed width issue on the food card number input</li>
          <li>Added null value validation for food card inputs</li>
          <li>Enhanced food card design and usability</li>
          <li>Improved the search system for better results</li>
          <li>Performed code refactoring for better maintainability</li>
        </ul>
      </div>

      <div>
        <h2 className="text-xl font-semibold text-gray-800 mb-2">
          🚀 Improvements
        </h2>
        <ul className="list-disc list-inside text-gray-700 space-y-1">
          <li>New user food library to store your custom food items</li>
          <li>Integrated a brand new food database for better coverage</li>
        </ul>
      </div>
    </div>
  );
};

export default PatchNote;
