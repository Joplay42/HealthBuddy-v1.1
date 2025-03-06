"use client";
import { useAdminPendingItemContext } from "@/context/AdminPendingItemContext";
import React from "react";
import { PendingItemListSqueleton } from "@/components";
import Item from "./Item";
import { foodProps } from "@/types";

const PendingItemList = () => {
  // fetch the pending item using my api and context pprovider
  const {
    pendingItem,
    loading,
    updatePendingItem,
    changePendingItem,
    deletePendingItem,
  } = useAdminPendingItemContext();

  if (loading) {
    return <PendingItemListSqueleton />;
  }

  if (pendingItem.length === 0) {
    return <p>No item found, come back in a few days</p>;
  }

  return (
    <div className="space-y-4">
      {pendingItem.map((item, index) => (
        <Item
          item={item}
          key={index}
          onApprove={() => updatePendingItem(item)}
          onChange={(updatedItem: foodProps) => changePendingItem(updatedItem)}
          onDelete={() => {
            if (item.Id) {
              deletePendingItem(item.Id);
            }
          }}
        />
      ))}
    </div>
  );
};

export default PendingItemList;
