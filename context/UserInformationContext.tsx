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
import { sanitizeNum } from "@/utils";
import { collection, doc, onSnapshot } from "firebase/firestore";
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
  const [userGoal, setUserGoal] = useState<userGoalProps | null>(null);
  const [userCalorieInfo, setUserCalorieInfo] =
    useState<userCalorieProps | null>(null);
  const [userWeightInfo, setUserWeightInfo] = useState<userWeightProps[]>([]);
  const [userWorkoutObjectiveInfo, setUserWorkoutObjectiveInfo] =
    useState<userProgramProps | null>(null);

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
          if (result.data) {
            setUserGoal({
              calorie: sanitizeNum(result.data?.calorie),
              protein: sanitizeNum(result.data?.protein),
              carbs:   sanitizeNum(result.data?.carbs),
              fat:     sanitizeNum(result.data?.fat),
            });
          }
        } catch (error: any) {
          console.error(
            "Error fetching the initial userGoal : ",
            error.message,
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
          if (result.data) {
            setUserCalorieInfo({
              calorie: sanitizeNum(result.data?.calorie),
              protein: sanitizeNum(result.data?.protein),
              carbs:   sanitizeNum(result.data?.carbs),
              fat:     sanitizeNum(result.data?.fat),
            });
          }
        } catch (error: any) {
          console.error(
            "Error fetching the initial userCalorie : ",
            error.message,
          );
        }
      }
    };

    const fetchInitialWeight = async () => {
      if (user) {
        try {
          const res = await fetch(`/api/workouts/weight?userid=${user.uid}`, {
            method: "GET",
          });
          const result = await res.json();

          if (!result) {
            // Convert each weight date to JS Date
            const weights = result.data.map((w: any) => ({
              ...w,
              date: w.date ? new Date(w.date) : null,
            }));

            setUserWeightInfo(weights);
          }
        } catch (error: any) {
          console.error(
            "Error fetching the initial userWeight : ",
            error.message,
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
          if (result.data) {
            setUserWorkoutObjectiveInfo({
              workoutPlan: result.data?.workoutPlan ?? { title: "", desc: "", days: [] },
              objectiveWeight: sanitizeNum(result.data?.objectiveWeight),
              months: sanitizeNum(result.data?.months) || 3,
            });
          }
        } catch (error: any) {
          console.error(
            "Error fetching the initial userWorkoutObjective : ",
            error.message,
          );
        }
      }
    };

    fetchInitialGoal();
    fetchInitialCalorie();
    fetchInitialWeight();
    fetchInitialWorkoutObjective();
  }, [user, userCalorieInfo, userGoal, userWorkoutObjectiveInfo]);

  // Fetch the user doc
  useEffect(() => {
    if (user) {
      try {
        // Get the firestore doc
        const docGoalRef = doc(db, "UserGoal", user.uid);
        const docInfoRef = doc(db, "UserCalorieData", user.uid);
        const docWorkoutRef = doc(db, "UserWorkouts", user.uid);
        const colWeightRef = collection(
          db,
          "UserWeights",
          user.uid,
          "weightList",
        );

        let goalLoaded = false;
        let infoLoaded = false;
        let workoutLoaded = false;
        let weightsLoaded = false;

        // Fetch the data realtime
        const unsubscribeGoal = onSnapshot(docGoalRef, (snapshot) => {
          if (snapshot.exists()) {
            const d = snapshot.data();
            setUserGoal({
              calorie: sanitizeNum(d?.calorie),
              protein: sanitizeNum(d?.protein),
              carbs:   sanitizeNum(d?.carbs),
              fat:     sanitizeNum(d?.fat),
            });
          }
          goalLoaded = true;
          if (goalLoaded && infoLoaded && workoutLoaded) setLoading(false);
        });

        // Fetch the data realtime
        const unsubscribeInfo = onSnapshot(docInfoRef, (snapshot) => {
          if (snapshot.exists()) {
            const d = snapshot.data();
            setUserCalorieInfo({
              calorie: sanitizeNum(d?.calorie),
              protein: sanitizeNum(d?.protein),
              carbs:   sanitizeNum(d?.carbs),
              fat:     sanitizeNum(d?.fat),
            });
          }
          infoLoaded = true;
          if (goalLoaded && infoLoaded && workoutLoaded) setLoading(false);
        });

        // Fetch the data realtime
        const unsubscribeWorkouts = onSnapshot(docWorkoutRef, (snapshot) => {
          if (snapshot.exists()) {
            const d = snapshot.data();
            setUserWorkoutObjectiveInfo({
              workoutPlan: d?.workoutPlan ?? { title: "", desc: "", days: [] },
              objectiveWeight: sanitizeNum(d?.objectiveWeight),
              months: sanitizeNum(d?.months) || 3,
            });
          }
          workoutLoaded = true;
          if (goalLoaded && infoLoaded && workoutLoaded) setLoading(false);
        });

        const unsubscribeWeights = onSnapshot(colWeightRef, (snapshot) => {
          const weights = snapshot.docs.map((doc) => {
            const data = doc.data();

            let dateObj: Date | null = null;

            // Check if date exists
            if (data.date) {
              // Firestore raw timestamp object { seconds, nanoseconds }
              if (data.date.seconds !== undefined) {
                dateObj = new Date(data.date.seconds * 1000); // seconds → ms
              }
              // If somehow it's already a string
              else if (typeof data.date === "string") {
                dateObj = new Date(data.date);
              }
            }

            return {
              ...data,
              number: sanitizeNum(data.number),
              date: dateObj,
              Id: doc.id,
            };
          }) as userWeightProps[];

          // Sort by date (oldest first)
          weights.sort(
            (a, b) => (a.date?.getTime() ?? 0) - (b.date?.getTime() ?? 0),
          );

          setUserWeightInfo(weights);
          weightsLoaded = true;
          if (goalLoaded && infoLoaded && workoutLoaded && weightsLoaded)
            setLoading(false);
        });

        // Clean up
        return () => {
          unsubscribeGoal();
          unsubscribeInfo();
          unsubscribeWorkouts();
          unsubscribeWeights();
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
