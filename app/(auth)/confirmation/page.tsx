import React from "react";
import Link from "next/link";
import Image from "next/image";

const page = () => {
  return (
    <div className="mt-10 max-w-[35rem]">
      <Link href="/login">
        <Image
          src="/back-arrow.svg"
          width={35}
          height={35}
          alt="back arrow icon"
          className="lg:absolute top-10"
        />
      </Link>
      <div className="mt-20 lg:mt-0 text-center">
        <h1 className="text-8xl mb-5">🎉</h1>
        <h1 className="text-3xl font-bold pb-4">Email has been sent!</h1>
        <p>
          Check your inbox for the password reset email and follow the
          instruction to change your password.
        </p>
      </div>
    </div>
  );
};

export default page;
