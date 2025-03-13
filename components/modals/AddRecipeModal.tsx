import React from "react";
import { SelectFood, InitialForm, Modal } from "@/components";

const AddRecipeModal = () => {
  return (
    <Modal title="New recipe +" backButton={true} route="recipe">
      {/** <InitialForm/> */}
      <SelectFood />
    </Modal>
  );
};

export default AddRecipeModal;
