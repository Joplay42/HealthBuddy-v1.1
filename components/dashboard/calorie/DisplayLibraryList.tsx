import {
  FoodCard,
  FoodItemCard,
  FoodItemCardSqueleton,
  LibraryItemCard,
  RecipeItemCard,
} from "@/components";
import { useUserFoodsContext } from "@/context/UserFoodContext";
import { Dispatch, SetStateAction } from "react";

const DisplayLibraryList = ({
  setConsumedLoading,
}: {
  setConsumedLoading: Dispatch<SetStateAction<boolean>>;
}) => {
  // Fetch the currents user recipe
  const { foods, loading } = useUserFoodsContext();
  if (loading) return <FoodItemCardSqueleton />;
  if (foods.length === 0)
    return (
      <h1 className="my-10 font-semibold text-xl text-center">
        No foods has been found
      </h1>
    );
  return (
    <>
      {foods.map((item, index) => (
        <FoodCard
          item={item}
          key={index}
          setConsumedLoading={setConsumedLoading}
          isSelectable={false}
        />
      ))}
    </>
  );
};

export default DisplayLibraryList;
