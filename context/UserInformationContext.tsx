"use client";

import {
  userCalorieProps,
  userGoalProps,
  userInformationContextProps,
} from "@/types";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { doc, onSnapshot } from "firebase/firestore";
import { auth, db } from "@/config/firebase";
import { onAuthStateChanged, User } from "firebase/auth";

export const UserInformationContext =
  createContext<userInformationContextProps>({
    userGoal: {
      calorie: 0,
      protein: 0,
      fat: 0,
      carbs: 0,
      weight: 0,
    }, // Default values for userGoal
    userCalorieInfo: { calorie: 0, protein: 0, fat: 0, carbs: 0 }, // Default values for userCalorieInfo
    loading: true,
  });

export const UserInformationProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  // User state
  const [user, setUser] = useState<User | null>(null);

  // Store the goal and information
  const [userGoal, setUserGoal] = useState<userGoalProps>({
    calorie: 0,
    protein: 0,
    fat: 0,
    carbs: 0,
    weight: 0,
  });
  const [userCalorieInfo, setUserCalorieInfo] = useState<userCalorieProps>({
    calorie: 0,
    protein: 0,
    fat: 0,
    carbs: 0,
  });

  // loading state
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
    const fetchInitialGoal = async () => {
      if (user && !userGoal) {
        try {
          // Fetch from the api
          const res = await fetch(`/api/objective?userid=${user.uid}`);
          const result = await res.json();
          setUserGoal(result);
        } catch (error: any) {
          console.error(
            "Error fetching the initial userGoal : ",
            error.message
          );
        }
      }
    };

    const fetchInitialCalorie = async () => {
      if (user && !userCalorieInfo) {
        try {
          // Fetch from the api
          const res = await fetch(`/api/calories?userid=${user.uid}`);
          const result = await res.json();
          setUserCalorieInfo(result);
        } catch (error: any) {
          console.error(
            "Error fetching the initial userCalorie : ",
            error.message
          );
        }
      }
    };

    fetchInitialGoal();
    fetchInitialCalorie();
  }, [user, userGoal, userCalorieInfo]);

  // Fetch the user doc
  useEffect(() => {
    if (user) {
      try {
        // Get the firestore doc
        const docGoalRef = doc(db, "UserGoal", user.uid);
        const docInfoRef = doc(db, "UserCalorieData", user.uid);

        let goalLoaded = false;
        let infoLoaded = false;

        // Fetch the data realtime
        const unsubscribeGoal = onSnapshot(docGoalRef, (snapshot) => {
          // If exists store it in the states
          if (snapshot.exists()) {
            setUserGoal(snapshot.data() as userGoalProps);
          }
          goalLoaded = true;
          if (goalLoaded && infoLoaded) setLoading(false);
        });

        // Fetch the data realtime
        const unsubscribeInfo = onSnapshot(docInfoRef, (snapshot) => {
          // If exists store it in the states
          if (snapshot.exists()) {
            setUserCalorieInfo(snapshot.data() as userCalorieProps);
          }
          infoLoaded = true;
          if (goalLoaded && infoLoaded) setLoading(false);
        });

        // Clean up
        return () => {
          unsubscribeGoal();
          unsubscribeInfo();
        };
      } catch (error: any) {
        console.error(error.message);
        setLoading(false);
      }
    }
  }, [user]);

  return (
    <UserInformationContext.Provider
      value={{ userGoal, userCalorieInfo, loading }}
    >
      {children}
    </UserInformationContext.Provider>
  );
};

// This functions creates the custom context for firebase
export function useUserInformationContext() {
  return useContext(UserInformationContext);
}
