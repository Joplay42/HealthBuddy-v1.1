import React from "react";
import { SelectFood, InitialForm, Modal, Final } from "@/components";

const AddRecipeModal = () => {
  return (
    <Modal title="New recipe +" backButton={true} route="recipe">
      {/** <InitialForm/> */}
      <SelectFood />
      {/** <Final /> */}
    </Modal>
  );
};

export default AddRecipeModal;
