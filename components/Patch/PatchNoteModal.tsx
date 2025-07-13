"use client";
import React, { useEffect } from "react";
import PatchNote from "./PatchNote";
import Modal from "../modals/Modal";
import { useRouter, useSearchParams } from "next/navigation";

const PatchNoteModal = () => {
  // SearchParams hooks from next/navigation
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    router.push("?modal=update");
  }, []);

  // Get the params
  const isFoodModalOpen = searchParams.get("modal") === "update";

  return (
    <div>
      {isFoodModalOpen && (
        <Modal title="Patch note v1.1">
          <PatchNote />
        </Modal>
      )}
    </div>
  );
};

export default PatchNoteModal;
