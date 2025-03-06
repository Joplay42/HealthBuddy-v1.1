"use client";
// Firebase imports
import { auth } from "@/config/firebase";
import { onAuthStateChanged, User } from "firebase/auth";
import { useRouter } from "next/navigation";
// Hooks imports
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

// The custom context created
export const FireBaseAuthContext = createContext<User | null>(null);

// This arrow function is used to fetch the user data in the provider
export const FireBaseAuthProvider = ({ children }: { children: ReactNode }) => {
  // useState for the user
  const [user, setUser] = useState<User | null>(null);

  // Router
  const router = useRouter();

  // Use effect to store the user
  useEffect(() => {
    if (typeof window !== "undefined") {
      // Ensure this runs on the client
      const unsubscribe = onAuthStateChanged(auth, (user) => {
        if (user) {
          setUser(user);
        } else {
          router.push("/");
        }
      });
      return () => unsubscribe();
    }
  }, []);

  // Return the custom provider
  return (
    <FireBaseAuthContext.Provider value={user}>
      {children}
    </FireBaseAuthContext.Provider>
  );
};
// This functions creates the custom context for firebase
export function useFirebaseAuth() {
  return useContext(FireBaseAuthContext);
}
