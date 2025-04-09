import React from "react";
import Image from "next/image";
import Link from "next/link";

const layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div className="lg:grid grid-cols-2 h-screen">
      <div className="pl-20 pt-10 bg-custom-dark text-white hidden lg:block relative">
        <Link href="/">
          <Image
            src="/Logo-mobile.png"
            height={90}
            width={90}
            alt="logo mobile"
          />
        </Link>
        <div className="mt-20 space-y-4">
          <h1 className="text-5xl">
            The simplest way to track your{" "}
            <span className="text-custom-green">progress</span>
          </h1>
          <p className="text-neutral-400 font-semibold text-lg max-w-[35rem]">
            HealthBuddy is the best training applications to track your
            progress.
          </p>
        </div>
        <Image
          src="/auth-image.png"
          width={600}
          height={600}
          alt="auth image"
          className="absolute right-0 bottom-0 w-3/4 h-auto"
        />
      </div>
      <div className="border-l border-l-neutral-300 p-10 flex flex-col">
        <Image
          src="/Logo-mobile.png"
          width={75}
          height={75}
          alt="log mobile"
          className="block lg:hidden"
        />
        <div className="m-auto">{children}</div>
      </div>
    </div>
  );
};

export default layout;
