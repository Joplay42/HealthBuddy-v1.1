"use client";
// Hooks import
import { useEffect, useState } from "react";
// NextJs image import
import Image from "next/image";
// Constant links import
import { navLinksWebsite } from "@/constant";
// Component imports
import { Custombutton, MobileMenu } from "@/components";

/**
 * This component is the header of the website, it is responsive in mobile, tablet and computer
 *
 * @returns
 */
const HeaderPage = () => {
  // hooks for the mobile menu
  const [menuOpen, setMenuOpen] = useState(false);

  // UseEffect hook
  useEffect(() => {
    if (menuOpen) {
      document.body.classList.add("no-scroll");
    } else {
      document.body.classList.remove("no-scroll");
    }

    // Cleanup on component unmount
    return () => {
      document.body.classList.remove("no-scroll");
    };
  }, [menuOpen]);

  return (
    <>
      {/** The header container */}
      <div className="HeaderWrapper">
        {/** The logo with an anchor to navigate */}
        <a href="#home">
          {/** The logo for large screen */}
          <Image
            className="hidden lg:block"
            src="/Logo-desktop-dark.png"
            width={200}
            height={100}
            alt="Logo website"
          />
          {/** The logo for mobile */}
          <Image
            className="block lg:hidden"
            src="/Logo-mobile.png"
            width={100}
            height={100}
            alt="Logo website"
          />
        </a>
        {/** The wrapper for the links to navigate */}
        <div className="NavLinksWrapper">
          {/** Link map */}
          {navLinksWebsite.map((link) => (
            // Anchor to navigate to each section
            <a
              key={link.name}
              className="link hover:font-bold"
              href={`#${link.url}`}
            >
              {link.name}
            </a>
          ))}
        </div>
        {/** The log in and sign in button */}
        <div className="lg:flex space-x-6 hidden ">
          {/** The custom button component for the log in button */}
          <Custombutton
            text="Log in"
            link="login"
            style="text-custom-green font-semibold hover:transition-transform hover:-translate-y-2 ease-in-out duration-300 hover:text-opacity-75"
          />
          {/** The custom button component for the sign in button */}
          <Custombutton
            text="Get started"
            link="signin"
            style="text-white bg-black font-semibold hover:bg-neutral-900"
          />
        </div>
        {/** The mobile section */}
        <div className="block lg:hidden">
          {/** The mobile menu button */}
          <Image
            src="/menu-nav.svg"
            width={40}
            height={40}
            alt="Menu navigation icon"
            // On click make the menu open
            onClick={() => setMenuOpen(!menuOpen)}
          />
        </div>
      </div>
      {/** If the menu is open it displays the mobileMenu */}
      {menuOpen && <MobileMenu setMenuOpen={setMenuOpen} />}
    </>
  );
};

export default HeaderPage;
