import React from "react";
import { Modal, NewFood } from "@/components";

const AddFoodModal = () => {
  return (
    <Modal title="New food +" backButton={true} route="food">
      <NewFood />
    </Modal>
  );
};

export default AddFoodModal;
