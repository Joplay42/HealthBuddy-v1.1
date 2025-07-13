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
  const isUpdateModalOpen = searchParams.get("modal") === "update";

  return (
    <div>
      {isUpdateModalOpen && (
        <div className="relative z-50">
          <Modal title="Patch note v1.1">
            <PatchNote />
          </Modal>
        </div>
      )}
    </div>
  );
};

export default PatchNoteModal;
