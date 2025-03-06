"use client";
import { Modal, SetObjective } from "@/components";
import { useUserInformationContext } from "@/context/UserInformationContext";

const ObjectiveModals = () => {
  return (
    <Modal>
      <SetObjective />
    </Modal>
  );
};

export default ObjectiveModals;
