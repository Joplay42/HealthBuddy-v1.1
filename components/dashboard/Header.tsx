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
      <div className="py-9 pl-12 border-b border-neutral-300">
        {/** Displays the current page name */}
        <PageName />
        {/** Displays a nice greeting message */}
        <p className="text-md">
          {/** TO DO - DISPLAY THE USERNAME */}
          Welcome back <span className="font-bold">{user.displayName}👋</span>
        </p>
      </div>
    </div>
  );
};

export default Header;
