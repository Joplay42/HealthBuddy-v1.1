// Import the navLinks from the website constant
import { navLinksWebsite } from "@/constant";
// NextJs image import
import Image from "next/image";
// NextJs link import
import Link from "next/link";

/**
 * This component is the footer of the website
 *
 * @returns
 */
const Footer = () => {
  return (
    // Container of the footer
    <div className="max-w-[1440px] mx-auto py-10">
      {/** Flex container */}
      <div className="flex justify-between items-center">
        {/** Logo */}
        <Link href="#home">
          <Image
            src="/Logo-mobile.png"
            width={120}
            height={120}
            alt="logo mobile"
          />
        </Link>
        {/** The right section */}
        <div className="flex space-x-4 lg:space-x-8 font-normal text-md">
          {/** Display the links of the website */}
          {navLinksWebsite.map((link) => (
            // Anchor to navigate in the website
            <a
              key={link.name}
              className="link hover:font-bold"
              href={`/#${link.url}`}
            >
              {link.name}
            </a>
          ))}
        </div>
      </div>
      {/** The under section of the footer (Copyright, privacy policy and terms and condition)*/}
      <div className=" space-y-4 lg:space-y-0 lg:flex justify-between items-center pt-10 text-neutral-400">
        <p>© 2024 HealthBuddy All rights reserved</p>
        <div className="flex gap-x-10">
          <Link href="/Policy">Privacy policy</Link>
          <Link href="/Conditions">Terms and condition</Link>
        </div>
      </div>
    </div>
  );
};

export default Footer;
