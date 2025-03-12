import { UserPendingItemProvider } from "@/context/UserPendingItemContext";
import React from "react";
import AddFood from "../dashboard/calorie/AddFood";

const FoodSearch = () => {
  return (
    <UserPendingItemProvider>
      <AddFood />
    </UserPendingItemProvider>
  );
};

export default FoodSearch;
