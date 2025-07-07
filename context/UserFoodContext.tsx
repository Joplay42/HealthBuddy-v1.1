"use client";
import { auth, db } from "@/config/firebase";
import { foodItemFetchedProps, foodProps, userFoodContextProps } from "@/types";
import { onAuthStateChanged, User } from "firebase/auth";
import { collection, doc, onSnapshot } from "firebase/firestore";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

export const UserFoodContext = createContext<userFoodContextProps>({
  foods: [],
  loading: true,
});

export const UserFoodProvider = ({ children }: { children: ReactNode }) => {
  // States to return
  const [user, setUser] = useState<User | null>();
  const [foods, setFoods] = useState<foodProps[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // UseEffect to get the current user
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  // UseEffect to fetch the user recipes
  useEffect(() => {
    if (user) {
      try {
        const userFoodDocRef = doc(db, "UserFoods", user.uid);
        const foodList = collection(userFoodDocRef, "foodList");
        const unsubscribeUserFoods = onSnapshot(
          foodList,
          (snapshot) => {
            if (!snapshot.empty) {
              const foodsItem = snapshot.docs.map(
                (doc) => doc.data() as foodProps
              );
              setFoods(foodsItem);
            } else {
              console.warn("No recipes found");
              setFoods([]);
            }
            setLoading(false);
          },
          (error) => {
            console.error("Error fetching the data ", error.message);
            setLoading(false);
          }
        );

        return () => {
          unsubscribeUserFoods();
        };
      } catch (error: any) {
        console.error(error.message);
      }
    }
  }, [user]);

  return (
    <UserFoodContext.Provider value={{ foods, loading }}>
      {children}
    </UserFoodContext.Provider>
  );
};

export function useUserFoodsContext() {
  return useContext(UserFoodContext);
}
