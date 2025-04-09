import { UserPendingItemProvider } from "@/context/UserPendingItemContext";
import React, { Dispatch, SetStateAction } from "react";
import AddFood from "../dashboard/calorie/AddFood";

const FoodSearch = ({
  setConsumedLoading,
}: {
  setConsumedLoading: Dispatch<SetStateAction<boolean>>;
}) => {
  return (
    <UserPendingItemProvider>
      <AddFood setConsumedLoading={setConsumedLoading} />
    </UserPendingItemProvider>
  );
};

export default FoodSearch;
