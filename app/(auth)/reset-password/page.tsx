import { ResetPasswordForm } from "@/components";
import React from "react";
import Image from "next/image";
import Link from "next/link";

const page = () => {
  return (
    <div className="mt-10">
      <Link href="/login">
        <Image
          src="/back-arrow.svg"
          width={35}
          height={35}
          alt="back arrow icon"
          className="lg:absolute top-10"
        />
      </Link>
      <div className="mt-20 lg:mt-0">
        <h1 className="text-3xl font-bold pb-4">Reset password</h1>
        <p>Please enter your email adress to request a password reset</p>
        <ResetPasswordForm />
      </div>
    </div>
  );
};

export default page;
