// Component imports
import { SettingsCard, SideBarSettings } from "@/components";
// Constants import
import { settingCard } from "@/constant";

/**
 * This component returns the entire settings content using a constant to dynamically
 * render each section.
 *
 * @returns
 */
const Settings = () => {
  return (
    <div className="lg:flex">
      {/** The sideBar component */}
      <SideBarSettings />
      <div className="lg:px-10 w-full">
        {/** Mapping each settings card using the constant */}
        {settingCard.map((card, index) => (
          <div key={index}>
            {/** Category of the setting */}
            <h1 className="text-3xl text-neutral-400 my-10">{card.category}</h1>
            {/** The content of each category */}
            <div className="space-y-14">
              {card.cards.map((card, index) => (
                // The settings content component
                <SettingsCard key={index} card={card} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Settings;
