"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import MobileMenu from "./MobileMenu";

const navLinks = [
  { name: "About", href: "#about" },
  { name: "Calorie Tracker", href: "#calories" },
  { name: "Workout", href: "#workout" },
  { name: "Contact", href: "#contact" },
];

const HeaderPage = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <header className="relative z-30">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-10 pt-4 sm:pt-6">
          <nav className="flex items-center justify-between rounded-2xl bg-ink-900/70 backdrop-blur ring-soft px-3 py-3">
            <Link href="/" className="flex items-center pl-2">
              <Image
                className="hidden lg:block"
                src="/Logo-desktop-dark.png"
                width={160}
                height={80}
                alt="HealthBuddy logo"
              />
              <Image
                className="block lg:hidden"
                src="/Logo-mobile.png"
                width={80}
                height={80}
                alt="HealthBuddy logo"
              />
            </Link>

            <ul className="hidden md:flex items-center gap-1 text-[14px] text-white/70">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <a
                    className="px-4 py-2 rounded-lg hover:text-white hover:bg-white/5 transition"
                    href={link.href}
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>

            <div className="flex items-center gap-2">
              <Link
                href="/login"
                className="hidden sm:inline-flex text-lime hover:text-lime-400 text-sm font-semibold px-3 py-2 transition"
              >
                Log in
              </Link>
              <Link
                href="/signin"
                className="inline-flex items-center gap-2 bg-lime hover:bg-lime-400 text-ink-950 text-sm font-semibold px-4 py-2.5 rounded-xl transition"
              >
                Get started
                <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round">
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </Link>
              <button
                className="md:hidden ml-1 p-2 rounded-lg text-white/70 hover:text-white hover:bg-white/5"
                onClick={() => setMenuOpen(true)}
                aria-label="Open menu"
              >
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round">
                  <path d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </nav>
        </div>
      </header>

      {menuOpen && <MobileMenu setMenuOpen={setMenuOpen} />}
    </>
  );
};

export default HeaderPage;
