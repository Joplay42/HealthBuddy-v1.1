"use client";
import Link from "next/link";
import { mobileMenuProps } from "@/types";

const navLinks = [
  { name: "About", href: "#about" },
  { name: "Calorie Tracker", href: "#calories" },
  { name: "Workout", href: "#workout" },
  { name: "Contact", href: "#contact" },
];

const MobileMenu = ({ setMenuOpen }: mobileMenuProps) => {
  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-ink-950/95 backdrop-blur-md">
      <div className="flex items-center justify-between px-4 pt-4 pb-4 border-b border-white/5">
        <span className="font-extrabold tracking-tight text-bone text-[15px]">
          HealthBuddy
        </span>
        <button
          className="p-2 rounded-lg text-white/70 hover:text-white hover:bg-white/5"
          onClick={() => setMenuOpen(false)}
          aria-label="Close menu"
        >
          <svg
            className="h-5 w-5"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
          >
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>
      </div>

      <nav className="flex flex-col gap-1 p-4 flex-1">
        {navLinks.map((link) => (
          <a
            key={link.name}
            href={link.href}
            onClick={() => setMenuOpen(false)}
            className="px-4 py-3 rounded-xl text-white/80 hover:text-white hover:bg-white/5 text-[15px] font-medium transition"
          >
            {link.name}
          </a>
        ))}
      </nav>

      <div className="p-4 border-t border-white/5 flex flex-col gap-3">
        <Link
          href="/login"
          onClick={() => setMenuOpen(false)}
          className="text-center text-lime font-semibold py-3 rounded-xl hover:bg-white/5 transition"
        >
          Log in
        </Link>
        <Link
          href="/signin"
          onClick={() => setMenuOpen(false)}
          className="text-center bg-lime hover:bg-lime-400 text-ink-950 font-semibold py-3 rounded-xl transition"
        >
          Get started
        </Link>
      </div>
    </div>
  );
};

export default MobileMenu;
