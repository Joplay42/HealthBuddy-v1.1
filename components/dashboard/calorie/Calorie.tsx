"use client";
import { FoodEntries, Objective, Overview } from "@/components";
import { useUserInformationContext } from "@/context/UserInformationContext";
import { UserConsumedFoodProvider } from "@/context/UserConsumedFoodContext";
import { useRouter } from "next/navigation";

const Calorie = () => {
  // Fetch the user information
  const { userGoal, userCalorieInfo, loading } = useUserInformationContext();
  // Router hooks to manage the navigation
  const router = useRouter();

  // Display a text to set an objective if the user doesnt have one
  if (userGoal.calorie === 0 && !loading) {
    return (
      <div
        className="py-5 md:py-10 space-y-5 md:space-y-0 md:gap-10"
        data-aos="fade-up"
        data-aos-delay="200"
        data-aos-duration="300"
      >
        <div className="bg-white p-5 rounded-3xl border border-neutral-400 w-full py-40">
          <h1 className="text-3xl font-bold text-center">
            Welcome to <span className="text-custom-green">HealthBuddy</span>{" "}
            calorie tracker!
            <span className="text-5xl"> 🎉</span>
          </h1>
          <div className="flex justify-center mt-5">
            <button
              className="w-fit bg-black text-white px-5 py-2 rounded-2xl text-center hover:opacity-75"
              // Open the modal
              onClick={() =>
                router.push("/dashboard/calorie-tracking?modal=objective", {
                  scroll: false,
                })
              }
            >
              Set objective
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className={
        "py-5 md:py-10 md:grid grid-cols-3 grid-rows-[minmax(150px,auto)_auto] space-y-5 md:space-y-0 md:gap-10"
      }
    >
      <div className=" col-span-2">
        <Overview goal={userGoal} data={userCalorieInfo} loading={loading} />
      </div>
      <div>
        <Objective goal={userGoal} data={userCalorieInfo} loading={loading} />
      </div>
      <div className="col-span-3">
        <UserConsumedFoodProvider>
          <FoodEntries />
        </UserConsumedFoodProvider>
      </div>
    </div>
  );
};

export default Calorie;
