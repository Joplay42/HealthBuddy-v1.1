"use client";
import { db } from "@/config/firebase";
import { adminPendingItemContextProps, foodProps } from "@/types";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

// The context creation
export const AdminPendingItemContext =
  createContext<adminPendingItemContextProps>({
    pendingItem: [],
    loading: true,
    updatePendingItem: () => {},
    changePendingItem: () => {},
    deletePendingItem: () => {},
  });

// The provider creation with a children attribute
export const AdminPendingItemProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  // The pendingItem list states
  const [pendingItem, setPendingItem] = useState<foodProps[]>([]);
  //The loading states
  const [loading, setLoading] = useState(true);

  // UseEffect to fetch realtime data
  useEffect(() => {
    try {
      setLoading(true);

      // get the collecton
      const pendingFoodRef = collection(db, "FoodApiCollection");
      // Query the pending food
      const q = query(pendingFoodRef, where("Pending", "==", true));
      const unsubscribe = onSnapshot(q, (snapshot) => {
        const data = snapshot.docs.map((doc) => {
          // Get the data and ensure it's structured as `foodProps`
          const docData = doc.data();
          return {
            Id: doc.id,
            Name: docData.Name,
            Brand: docData.Brand,
            Quantity: docData.Quantity,
            Unit: docData.Unit,
            Calories: docData.Calories,
            Protein: docData.Protein,
            Carbs: docData.Carbs,
            Fat: docData.Fat,
            Meal: docData.Meal,
          };
        });
        setPendingItem(data);
      });

      setLoading(false);

      return () => unsubscribe();
    } catch (error: any) {
      console.error(error);
    }
  }, []);

  // Function to update (approve) the item by removing the pending attribute
  const updatePendingItem = (updatedItem: foodProps) => {
    setPendingItem((prevItems) =>
      prevItems.map((item) =>
        item.Id === updatedItem.Id ? { ...item, Pending: false } : item
      )
    );
  };

  // Function to change (update all attributes) of the item
  const changePendingItem = (updatedItem: foodProps) => {
    setPendingItem((prevItems) =>
      prevItems.map((item) =>
        item.Id === updatedItem.Id ? { ...updatedItem } : item
      )
    );
  };

  // Function to delete an item from the list
  const deletePendingItem = async (id: string) => {
    setPendingItem((prevItems) => prevItems.filter((item) => item.Id !== id));
  };

  // return a provider
  return (
    <AdminPendingItemContext.Provider
      value={{
        pendingItem,
        loading,
        updatePendingItem,
        changePendingItem,
        deletePendingItem,
      }}
    >
      {children}
    </AdminPendingItemContext.Provider>
  );
};

export function useAdminPendingItemContext() {
  return useContext(AdminPendingItemContext);
}
