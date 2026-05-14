"use client";
import { HeaderSqueleton, PageName } from "@/components";
import { useFirebaseAuth } from "@/context/UserContext";
import { useTheme } from "@/context/ThemeContext";

const Header = () => {
  const { user } = useFirebaseAuth();
  const { theme, toggleTheme } = useTheme();
  const isLoading = !user;

  if (isLoading) {
    return <HeaderSqueleton />;
  }

  return (
    <div className="flex justify-between items-center pr-4 md:pr-12 border-b border-neutral-300 dark:border-white/10 bg-white dark:bg-ink-950">
      <div className="py-4 md:py-9 px-5 md:px-12 space-y-2">
        <PageName />
        <div className="sm:flex md:flex block sm:space-x-2 md:space-x-2 space-x-0">
          <p className="text-md dark:text-white/55">Welcome back</p>
          <p className="font-bold dark:text-bone">{user.displayName}👋</p>
        </div>
      </div>

      <button
        onClick={toggleTheme}
        aria-label="Toggle theme"
        className="p-2 rounded-lg text-neutral-500 dark:text-white/50 hover:bg-neutral-100 dark:hover:bg-ink-800 transition shrink-0"
      >
        {theme === "dark" ? (
          <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="5" />
            <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
          </svg>
        ) : (
          <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
          </svg>
        )}
      </button>
    </div>
  );
};

export default Header;
