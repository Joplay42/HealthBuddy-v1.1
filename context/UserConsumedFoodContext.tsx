"use client";
import { auth, db } from "@/config/firebase";
import { foodProps } from "@/types";
import { onAuthStateChanged, User } from "firebase/auth";
import { collection, doc, onSnapshot } from "firebase/firestore";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

export const UserConsumedFoodContext = createContext<{
  userConsumedFood: foodProps[];
  loading: boolean;
}>({
  userConsumedFood: [],
  loading: true,
});

export const UserConsumedFoodProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  // User state
  const [user, setUser] = useState<User | null>(null);

  // Store the goal and information
  const [userConsumedFood, setuserConsumedFood] = useState<foodProps[]>([]);

  // The loading state
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

  // Call the initial values using the api
  useEffect(() => {
    const fetchInitialValues = async () => {
      if (user && userConsumedFood) {
        try {
          // Fetch from the api
          const res = await fetch(`/api/foods/consumed?userid=${user.uid}`, {
            method: "GET",
          });
          const result = await res.json();

          if (result.data && Array.isArray(result.data)) {
            setuserConsumedFood(result.data);
          }
        } catch (error: any) {
          console.error(
            "Error fetching the initial userGoal : ",
            error.message
          );
        } finally {
          setLoading(false);
        }
      }
    };

    fetchInitialValues();
  }, [user]);

  // Fetch the user doc
  useEffect(() => {
    if (user) {
      try {
        const userConsumedFoodRef = doc(db, "UserConsumedFood", user.uid);
        const foodListRef = collection(userConsumedFoodRef, "foodList");

        const unsubscribeUserConsumedFood = onSnapshot(
          foodListRef,
          (snapshot) => {
            if (!snapshot.empty) {
              const foodItems = snapshot.docs.map(
                (doc) => doc.data() as foodProps
              );

              setuserConsumedFood(foodItems); // Set the state with the fetched data
              setLoading(false);
            } else {
              console.warn("No food items found.");
              setuserConsumedFood([]);
            }
          },
          (error) => {
            console.error("Error fetching food list:", error.message);
            setLoading(false); // Stop loading on error
          }
        );

        return () => {
          unsubscribeUserConsumedFood();
        };
      } catch (error: any) {
        console.error("Error fetching food list:", error.message);
        setLoading(false);
      }
    }
  }, [user]);

  return (
    <UserConsumedFoodContext.Provider value={{ userConsumedFood, loading }}>
      {children}
    </UserConsumedFoodContext.Provider>
  );
};

// This functions creates the custom context for firebase
export function useUserConsumedFooodContext() {
  return useContext(UserConsumedFoodContext);
}
