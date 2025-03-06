// The website links constant
import { navLinksWebsite } from "@/constant";
// props import
import { mobileMenuProps } from "@/types";
// CustomButton component import
import { Custombutton } from "@/components";

/**
 * This component is used for mobile when the navigation menu opens
 *
 * @param setMenuOpen handles the menu opening
 * @returns
 */
const MobileMenu = ({ setMenuOpen }: mobileMenuProps) => {
  return (
    // The screen containe
    <div className="text-light h-screen flex flex-col justify-center items-center">
      <div className="flex flex-col space-y-6 text-center">
        {/** Maps the link */}
        {navLinksWebsite.map((link) => (
          // Anchor to navigate to each section
          <a
            key={link.name}
            className="hover:text-green transition ease-in-out duration-300"
            // Set the id to the url of the link
            href={`#${link.url}`}
            // Make the menu close
            onClick={() => setMenuOpen(false)}
          >
            {link.name}
          </a>
        ))}
      </div>
      {/** The get started button on mobile to register and log in */}
      <div className="flex justify-center mt-10">
        <Custombutton text="Get started" link="" style="bg-black text-white" />
      </div>
    </div>
  );
};

export default MobileMenu;
