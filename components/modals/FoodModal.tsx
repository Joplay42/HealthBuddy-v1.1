"use client";
import {
  Modal,
  FoodModalNavigation,
  FoodSearch,
  RecipeSearch,
} from "@/components";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const FoodModal = () => {
  // Search params hooks from next/navigation
  const searchParams = useSearchParams();
  // Get the params
  const modalParams = searchParams.get("modal");

  // States to handle the different page changes
  const [page, setPage] = useState<string>("");

  // UseEffect to update the ui with the params
  useEffect(() => {
    if (modalParams) {
      setPage(modalParams);
    }
  }, [modalParams]);

  return (
    <Modal title="Add food +">
      <FoodModalNavigation page={page} setPage={setPage} />
      {page === "food" ? <FoodSearch /> : <RecipeSearch />}
    </Modal>
  );
};

export default FoodModal;
