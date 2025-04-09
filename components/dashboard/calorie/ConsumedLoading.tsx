import React from "react";
import Image from "next/image";

const ConsumedLoading = () => {
  return (
    <div className="fixed top-0 left-0 w-full h-screen bg-black bg-opacity-35 z-50 flex items-center justify-center">
      <div>
        <Image src="/loading.gif" width={50} height={50} alt="Loading" />
      </div>
    </div>
  );
};

export default ConsumedLoading;
