import { Modal, AddFood } from "@/components";
import { UserPendingItemProvider } from "@/context/UserPendingItemContext";

const FoodModal = () => {
  return (
    <Modal title="Add food +">
      <UserPendingItemProvider>
        <AddFood />
      </UserPendingItemProvider>
    </Modal>
  );
};

export default FoodModal;
