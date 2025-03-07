"use client";
// Firebase imports
import { auth, db } from "@/config/firebase";
import { onAuthStateChanged, User } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
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
export const FireBaseAuthContext = createContext<{
  user: User | null;
  isAdmin: boolean;
}>({ user: null, isAdmin: false });

// This arrow function is used to fetch the user data in the provider
export const FireBaseAuthProvider = ({ children }: { children: ReactNode }) => {
  // useState for the user
  const [user, setUser] = useState<User | null>(null);
  // states for the userIsAdmin
  const [isAdmin, setAdmin] = useState(false);

  // Router
  const router = useRouter();

  // Use effect to store the user
  useEffect(() => {
    const checkAdmin = async (user: User) => {
      // get the admin User from firestore
      const docRef = doc(db, "UserAdmins", user.uid);
      // Get the doc
      const data = await getDoc(docRef);
      // Check if the data has the same uid has the admin
      if (data.exists()) {
        setAdmin(true);
      } else {
        setAdmin(false);
      }
    };

    if (typeof window !== "undefined") {
      // Ensure this runs on the client
      const unsubscribe = onAuthStateChanged(auth, (user) => {
        if (user) {
          setUser(user);

          // Check if admin
          checkAdmin(user);
        } else {
          router.push("/");
        }
      });
      return () => unsubscribe();
    }
  }, [user]);

  // Return the custom provider
  return (
    <FireBaseAuthContext.Provider value={{ user, isAdmin }}>
      {children}
    </FireBaseAuthContext.Provider>
  );
};
// This functions creates the custom context for firebase
export function useFirebaseAuth() {
  return useContext(FireBaseAuthContext);
}
