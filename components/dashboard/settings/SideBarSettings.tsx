"use client";
// Constant imports
import { settingsSideBar } from "@/constant";

/**
 * This component is used to navigate in the settings page. All the different settings
 * is displayed there.
 *
 * @returns
 */
const SideBarSettings = () => {
  // Function to handle the navigation to scroll into view
  const handleNavigation = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      {/** Desktop sidebar */}
      <div className="hidden lg:block w-60 border-r border-neutral-400 ">
        {/** Mapping the settings in the dispplay */}
        {settingsSideBar.map((item, index) => (
          <div key={index}>
            {/** title */}
            <h1 className="text-lg text-neutral-500 py-3 mt-10">
              {item.title}
            </h1>
            <div className="flex flex-col space-y-3">
              {/** Display the category of the settings */}
              {item.category.map((category, index) => (
                // A anchor to go directly to the section clicked
                <button
                  key={index}
                  onClick={() => handleNavigation(category.link)}
                  className="text-lg font-semibold py-3"
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
      {/** Mobile sideBar */}
      <div className="lg:hidden overflow-x-auto whitespace-nowrap">
        <div className="flex">
          {/** Mapping the settings in the dispplay */}
          {settingsSideBar.map((item, index) => (
            <div key={index} className="flex">
              {item.category.map((category, index) => (
                <div
                  key={index}
                  className="p-5 border border-neutral-400 hover:bg-neutral-300"
                >
                  <button
                    key={index}
                    onClick={() => handleNavigation(category.link)}
                    className="font-semibold"
                  >
                    {category.name}
                  </button>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default SideBarSettings;
