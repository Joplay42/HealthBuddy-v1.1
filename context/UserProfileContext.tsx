"use client";

import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { onAuthStateChanged, User } from "firebase/auth";
import { doc, onSnapshot } from "firebase/firestore";
import { auth, db } from "@/config/firebase";
import { tourKey, userProfileContextProps, userProfileProps } from "@/types";

const DEFAULT_PROFILE: userProfileProps = {
  hasCompletedOverviewTour: false,
  hasCompletedCaloriesTour: false,
  hasCompletedWorkoutTour: false,
  hasCompletedWeightTour: false,
};

const tourKeyToField = (key: tourKey) => {
  switch (key) {
    case "Overview":
      return "hasCompletedOverviewTour";
    case "Calories":
      return "hasCompletedCaloriesTour";
    case "Workout":
      return "hasCompletedWorkoutTour";
    case "Weight":
      return "hasCompletedWeightTour";
  }
};

export const UserProfileContext = createContext<userProfileContextProps>({
  profile: null,
  loading: true,
  completeTour: async () => {},
  restartAllTours: async () => {},
});

export const UserProfileProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<userProfileProps | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log("[UserProfile] auth effect subscribing");
    const unsubscribe = onAuthStateChanged(auth, (u) => {
      setUser(u);
    });
    return () => unsubscribe();
  }, []);

  // Backfill the Users/{uid} doc for accounts created before this feature
  useEffect(() => {
    const backfill = async () => {
      if (!user) return;
      try {
        const res = await fetch(`/api/users/profile?userid=${user.uid}`, {
          method: "GET",
        });
        if (!res.ok) {
          console.error("Failed to backfill user profile");
        }
      } catch (error: any) {
        console.error("Backfill error:", error.message);
      }
    };
    backfill();
  }, [user]);

  // Subscribe to Users/{uid} for real-time onboarding state
  useEffect(() => {
    if (!user) {
      setProfile(null);
      setLoading(false);
      return;
    }

    setLoading(true);
    const userDocRef = doc(db, "Users", user.uid);
    const unsubscribe = onSnapshot(
      userDocRef,
      (snapshot) => {
        if (snapshot.exists()) {
          const data = snapshot.data();
          setProfile({
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.email,
            hasCompletedOverviewTour: data.hasCompletedOverviewTour ?? false,
            hasCompletedCaloriesTour: data.hasCompletedCaloriesTour ?? false,
            hasCompletedWorkoutTour: data.hasCompletedWorkoutTour ?? false,
            hasCompletedWeightTour: data.hasCompletedWeightTour ?? false,
          });
        } else {
          setProfile({ ...DEFAULT_PROFILE });
        }
        setLoading(false);
      },
      (error) => {
        console.error("[UserProfile] snapshot error:", error.message);
        setLoading(false);
      },
    );

    return () => unsubscribe();
  }, [user]);

  const patchProfile = useCallback(
    async (updates: Partial<userProfileProps>) => {
      if (!user) return;
      // Optimistic update
      setProfile((prev) => (prev ? { ...prev, ...updates } : prev));
      try {
        await fetch(`/api/users/profile`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userid: user.uid, updates }),
        });
      } catch (error: any) {
        console.error("Failed to patch profile:", error.message);
      }
    },
    [user],
  );

  const completeTour = useCallback(
    async (key: tourKey) => {
      const field = tourKeyToField(key);
      await patchProfile({ [field]: true } as Partial<userProfileProps>);
    },
    [patchProfile],
  );

  const restartAllTours = useCallback(async () => {
    await patchProfile({
      hasCompletedOverviewTour: false,
      hasCompletedCaloriesTour: false,
      hasCompletedWorkoutTour: false,
      hasCompletedWeightTour: false,
    });
  }, [patchProfile]);

  return (
    <UserProfileContext.Provider
      value={{ profile, loading, completeTour, restartAllTours }}
    >
      {children}
    </UserProfileContext.Provider>
  );
};

export function useUserProfileContext() {
  return useContext(UserProfileContext);
}
