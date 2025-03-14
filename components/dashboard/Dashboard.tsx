"use client";
// Component import
import {
  Sidebar,
  Header,
  FoodModal,
  ObjectiveModals,
  AdminModal,
  AddFoodModal,
  AddRecipeModal,
  FoodItem,
  FoodDesc,
} from "@/components";
import { DashboardProps } from "@/types";
import { FireBaseAuthProvider, useFirebaseAuth } from "@/context/UserContext";
import { UserInformationProvider } from "@/context/UserInformationContext";
import { useSearchParams } from "next/navigation";

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
  const isRecipeModalOpen = searchParams.get("modal") === "recipe";
  const isAddFoodModalOpen = searchParams.get("modal") == "addfood";
  const isAddRecipeModalOpen = searchParams.get("index") === "1" || "2" || "3";
  const isObjectiveModalOpen = searchParams.get("modal") === "objective";
  const isAdminModalOpen = searchParams.get("modal") == "admin";
  // detect if a foodId Params is there
  const foodIdParams = searchParams.get("Id");
  const isFoodItemModalOpen =
    typeof foodIdParams === "string" && foodIdParams.trim().length > 0;

  return (
    // The custom context to pass the user
    <FireBaseAuthProvider>
      {/** The custom context to pass the userInformation */}
      <UserInformationProvider>
        <div>
          {/** Sidebar component */}
          <Sidebar />
          <div className="ml-[80px] lg:ml-[128px]">
            {/** Header container */}
            <Header />
            {/** The content of the dashboard */}
            <div className="bg-neutral-200 min-h-screen px-5 md:px-12">
              {children}
            </div>
          </div>
          {/** Handle the foodMoal opening with url params */}
          {isFoodModalOpen && <FoodModal />}
          {isRecipeModalOpen && <FoodModal />}
          {isObjectiveModalOpen && <ObjectiveModals />}
          {isAdminModalOpen && <AdminModal />}
          {isAddFoodModalOpen && <AddFoodModal />}
          {isAddRecipeModalOpen && <AddRecipeModal />}
          {isFoodItemModalOpen && <FoodDesc Id={foodIdParams} />}
        </div>
      </UserInformationProvider>
    </FireBaseAuthProvider>
  );
};

export default Dashboard;
