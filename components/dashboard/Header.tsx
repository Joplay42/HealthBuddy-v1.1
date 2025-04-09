"use client";
// component import
import { HeaderSqueleton, PageName } from "@/components";
import { useFirebaseAuth } from "@/context/UserContext";
import { useRouter } from "next/navigation";

/**
 * This component is the dashboard header, it displays the current page and the
 * username
 *
 * @returns
 */
const Header = () => {
  // The context to get the currentUser
  const { user, isAdmin } = useFirebaseAuth();

  // Create router hooks
  const router = useRouter();

  // Manage the loading states
  const isLoading = !user;

  if (isLoading) {
    return <HeaderSqueleton />;
  }

  return (
    // Header container
    <div className="flex justify-between items-center pr-12">
      <div className="py-4 md:py-9 px-5 md:px-12 border-b border-neutral-300 space-y-2">
        {/** Displays the current page name */}
        <PageName />
        {/** Displays a nice greeting message */}
        <div className="sm:flex md:flex block sm:space-x-2 md:space-x-2 space-x-0">
          <p className="text-md">Welcome back</p>
          <p className="font-bold">{user.displayName}👋</p>
        </div>
      </div>
    </div>
  );
};

export default Header;
