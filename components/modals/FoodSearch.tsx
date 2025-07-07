import React, { Dispatch, SetStateAction } from "react";
import AddFood from "../dashboard/calorie/AddFood";

const FoodSearch = ({
  setConsumedLoading,
}: {
  setConsumedLoading: Dispatch<SetStateAction<boolean>>;
}) => {
  return <AddFood setConsumedLoading={setConsumedLoading} />;
};

export default FoodSearch;
