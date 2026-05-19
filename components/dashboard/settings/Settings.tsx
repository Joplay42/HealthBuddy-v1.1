"use client";
// Component imports
import { SettingsCard, SideBarSettings } from "@/components";
// Constants import
import { settingCard } from "@/constant";
import { useUserProfileContext } from "@/context/UserProfileContext";
import HelpBubble from "@/components/onboarding/HelpBubble";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";

/**
 * This component returns the entire settings content using a constant to dynamically
 * render each section.
 *
 * @returns
 */
const Settings = () => {
  const { restartAllTours } = useUserProfileContext();
  const router = useRouter();
  const [resetting, setResetting] = useState(false);

  const handleRestart = async () => {
    try {
      setResetting(true);
      await restartAllTours();
      toast.success("Tutorial restarted — heading to the dashboard!");
      router.push("/dashboard");
    } catch (error: any) {
      toast.error("Couldn't restart the tutorial. Try again.");
    } finally {
      setResetting(false);
    }
  };

  return (
    <div className="lg:flex">
      {/** The sideBar component */}
      <SideBarSettings />
      <div className="lg:px-10 w-full">
        {/** Mapping each settings card using the constant */}
        {settingCard.map((card, index) => (
          <div key={index}>
            {/** Category of the setting */}
            <h1 className="text-3xl text-neutral-400 dark:text-white/40 my-10">{card.category}</h1>
            {/** The content of each category */}
            <div className="space-y-14">
              {card.cards.map((card, index) => (
                // The settings content component
                <SettingsCard key={index} card={card} />
              ))}
            </div>
          </div>
        ))}

        {/** Tutorial section */}
        <h1 className="text-3xl text-neutral-400 dark:text-white/40 my-10">
          Help
        </h1>
        <div className="bg-white dark:bg-ink-900 p-5 rounded-3xl border border-neutral-400 dark:border-white/10 flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-14">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="font-bold text-lg dark:text-bone">
                Restart the tutorial
              </h2>
              <HelpBubble
                id="restart-tutorial"
                placement="right"
                content="Replays the welcome tour and every per-feature walkthrough as if you were brand new."
              />
            </div>
            <p className="text-sm text-neutral-500 dark:text-white/55 mt-1">
              Replay the guided tour for the dashboard, calorie tracker,
              workout, and weight tracking.
            </p>
          </div>
          <button
            type="button"
            disabled={resetting}
            onClick={handleRestart}
            className="w-full md:w-auto bg-black dark:bg-lime text-white dark:text-ink-950 px-5 py-2 rounded-2xl text-center hover:opacity-75 disabled:opacity-50"
          >
            {resetting ? "Restarting…" : "Restart tutorial"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Settings;
