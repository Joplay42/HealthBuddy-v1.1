"use client";
import { auth, db } from "@/config/firebase";
import { foodProps, userPendingItemContextProps } from "@/types";
import { onAuthStateChanged, User } from "firebase/auth";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

// The context creation
export const UserPendingItemContext =
  createContext<userPendingItemContextProps>({
    pendingItem: [],
    loading: true,
  });

// The provider creation with a children attribute
export const UserPendingItemProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  // User state
  const [user, setUser] = useState<User | null>(null);
  // The pendingItem list states
  const [pendingItem, setPendingItem] = useState<foodProps[]>([]);
  //The loading states
  const [loading, setLoading] = useState(true);

  // UseEffect to fetch the current user
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  // UseEffect to fetch the user's pendingItem
  useEffect(() => {
    if (user) {
      try {
        setLoading(true);

        // get the collecton
        const pendingFoodRef = collection(db, "FoodApiCollection");
        // Query the pending food
        const q = query(
          pendingFoodRef,
          where("Pending", "==", true),
          where("UserId", "==", user.uid)
        );
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
    }
  }, [user]);

  // return a provider
  return (
    <UserPendingItemContext.Provider value={{ pendingItem, loading }}>
      {children}
    </UserPendingItemContext.Provider>
  );
};

export function useUserPendingItemContext() {
  return useContext(UserPendingItemContext);
}
