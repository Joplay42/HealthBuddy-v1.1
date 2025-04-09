"use client";
// Component import
import {
  Sidebar,
  Header,
  FoodModal,
  ObjectiveModals,
  AddFoodModal,
  AddRecipeModal,
  EditRecipeModal,
} from "@/components";
import { DashboardProps } from "@/types";
import { FireBaseAuthProvider } from "@/context/UserContext";
import { UserInformationProvider } from "@/context/UserInformationContext";
import { useSearchParams } from "next/navigation";
import { Slide, ToastContainer } from "react-toastify";
import { useEffect } from "react";
import AOS from "aos";

/**
 * This component is the main baseFrame of the dashboard, it display the
 * header and sidebar.
 *
 * @param children the content of the dashboard
 * @returns
 */
const Dashboard = ({ children }: DashboardProps) => {
  // SearchParams hooks from next/navigation
  const searchParams = useSearchParams();
  // Get the params
  const isFoodModalOpen = searchParams.get("modal") === "food";
  const isAddFoodModalOpen = searchParams.get("modal") == "addfood";
  const isAddRecipeModalOpen = searchParams.get("modal") == "addrecipe";
  const isEditRecipeModalOpen = searchParams.get("modal") == "editrecipe";
  const isObjectiveModalOpen = searchParams.get("modal") === "objective";

  useEffect(() => {
    AOS.init();
    AOS.refresh();
  }, []);

  return (
    // The custom context to pass the user
    <FireBaseAuthProvider>
      {/** The custom context to pass the userInformation */}
      <UserInformationProvider>
        <div>
          {/** Sidebar component */}
          <Sidebar />
          <div className="ml-[49px] md:ml-[80px] lg:ml-[128px]">
            {/** Header container */}
            <Header />
            {/** The content of the dashboard */}
            <div className="bg-neutral-200 min-h-screen px-5 md:px-12">
              {children}
              <ToastContainer />
            </div>
          </div>
          {/** Handle the foodMoal opening with url params */}
          {isFoodModalOpen && <FoodModal />}
          {isObjectiveModalOpen && <ObjectiveModals />}
          {isAddFoodModalOpen && <AddFoodModal />}
          {isAddRecipeModalOpen && <AddRecipeModal />}
          {isEditRecipeModalOpen && <EditRecipeModal />}
        </div>
      </UserInformationProvider>
    </FireBaseAuthProvider>
  );
};

export default Dashboard;
