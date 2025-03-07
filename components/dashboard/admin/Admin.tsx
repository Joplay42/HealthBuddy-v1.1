"use client";
import React, { useEffect } from "react";
import { Live, Pending } from "@/components";
import { useFirebaseAuth } from "@/context/UserContext";
import { useRouter } from "next/navigation";

/**
 * This component is used to display the Admin page in the dashboard so I can use hooks
 * instead in a page react component.
 *
 * @returns
 */
const Admin = () => {
  // Check if admin
  const { user, isAdmin } = useFirebaseAuth();
  // Router
  const router = useRouter();

  // UseEffect to protect the route
  useEffect(() => {
    if (!isAdmin) {
      router.replace("/dashboard");
    }
  }, [isAdmin, router]);

  if (!isAdmin) return null;

  return (
    <>
      <div className="lg:grid grid-cols-3 py-5 lg:py-10 space-y-5 lg:space-y-0 lg:gap-10">
        <Pending />
        <Live />
      </div>
    </>
  );
};

export default Admin;
