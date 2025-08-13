"use client";

import {
  userCalorieProps,
  userGoalProps,
  userInformationContextProps,
  userProgramProps,
  userWeightProps,
  WorkoutPlanProps,
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
    }, // Default values for userGoal
    userCalorieInfo: { calorie: 0, protein: 0, fat: 0, carbs: 0 }, // Default values for userCalorieInfo
    userWeightInfo: [],
    userWorkoutObjectiveInfo: {
      workoutPlan: {
        title: "",
        desc: "",
        days: [],
      },
      objectiveWeight: 0,
      months: 3,
    }, // default value for the userWorkoutObjectives
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
  });
  const [userCalorieInfo, setUserCalorieInfo] = useState<userCalorieProps>({
    calorie: 0,
    protein: 0,
    fat: 0,
    carbs: 0,
  });
  const [userWeightInfo, setUserWeightInfo] = useState<userWeightProps[]>([]);
  const [userWorkoutObjectiveInfo, setUserWorkoutObjectiveInfo] =
    useState<userProgramProps>({
      workoutPlan: {
        title: "",
        desc: "",
        days: [],
      },
      objectiveWeight: 0,
      months: 0,
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
          const res = await fetch(`/api/objective?userid=${user.uid}`, {
            method: "GET",
          });
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
          const res = await fetch(`/api/calories?userid=${user.uid}`, {
            method: "GET",
          });
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

    const fetchInitialWeight = async () => {
      if (user && !userWeightInfo) {
        try {
          // Fetch the user weights
        } catch (error: any) {
          console.error(
            "Error fetching the initial userWeight : ",
            error.message
          );
        }
      }
    };

    const fetchInitialWorkoutObjective = async () => {
      if (user && !userWorkoutObjectiveInfo) {
        try {
          // Fetch the user workouts
          const res = await fetch(`/api/workouts?userid=${user.uid}`, {
            method: "GET",
          });
          const result = await res.json();
          setUserWorkoutObjectiveInfo(result);
        } catch (error: any) {
          console.error(
            "Error fetching the initial userWorkoutObjective : ",
            error.message
          );
        }
      }
    };

    fetchInitialGoal();
    fetchInitialCalorie();
    fetchInitialWeight();
    fetchInitialWorkoutObjective();
  }, [user]);

  // Fetch the user doc
  useEffect(() => {
    if (user) {
      try {
        // Get the firestore doc
        const docGoalRef = doc(db, "UserGoal", user.uid);
        const docInfoRef = doc(db, "UserCalorieData", user.uid);
        const docWorkoutRef = doc(db, "UserWorkouts", user.uid);

        let goalLoaded = false;
        let infoLoaded = false;
        let workoutLoaded = false;

        // Fetch the data realtime
        const unsubscribeGoal = onSnapshot(docGoalRef, (snapshot) => {
          // If exists store it in the states
          if (snapshot.exists()) {
            setUserGoal(snapshot.data() as userGoalProps);
          }
          goalLoaded = true;
          if (goalLoaded && infoLoaded && workoutLoaded) setLoading(false);
        });

        // Fetch the data realtime
        const unsubscribeInfo = onSnapshot(docInfoRef, (snapshot) => {
          // If exists store it in the states
          if (snapshot.exists()) {
            setUserCalorieInfo(snapshot.data() as userCalorieProps);
          }
          infoLoaded = true;
          if (goalLoaded && infoLoaded && workoutLoaded) setLoading(false);
        });

        // Fetch the data realtime
        const unsubscribeWorkouts = onSnapshot(docWorkoutRef, (snapshot) => {
          // If exists store it in the states
          if (snapshot.exists()) {
            setUserWorkoutObjectiveInfo(snapshot.data() as userProgramProps);
          }
          workoutLoaded = true;
          if (goalLoaded && infoLoaded && workoutLoaded) setLoading(false);
        });

        // Clean up
        return () => {
          unsubscribeGoal();
          unsubscribeInfo();
          unsubscribeWorkouts();
        };
      } catch (error: any) {
        console.error(error.message);
        setLoading(false);
      }
    }
  }, [user]);

  return (
    <UserInformationContext.Provider
      value={{
        userGoal,
        userCalorieInfo,
        userWeightInfo,
        userWorkoutObjectiveInfo,
        loading,
      }}
    >
      {children}
    </UserInformationContext.Provider>
  );
};

// This functions creates the custom context for firebase
export function useUserInformationContext() {
  return useContext(UserInformationContext);
}
