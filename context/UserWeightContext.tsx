import { auth } from "@/config/firebase";
import { userWeights } from "@/constant";
import { UserWeightContextProps, userWeightProps } from "@/types";
import { onAuthStateChanged, User } from "firebase/auth";
import { createContext, useContext, useEffect, useState } from "react";

export const UserWeightContext = createContext<UserWeightContextProps>({
  weights: [],
  loading: true,
});

const UserWeightProvider = ({ children }: { children: React.ReactNode }) => {
  // States to return
  const [user, setUser] = useState<User | null>();
  const [weights, setWeights] = useState<userWeightProps[]>([userWeights]);
  const [loading, setLoading] = useState<boolean>(true);

  // Get the current user
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });

    return () => unsubscribe();
  }, []);

  // Get the current weights for the user
  useEffect(() => {
    if (user) {
      try {
        // Complete the fetching with backend
      } catch (error: any) {
        console.error(error.message);
      } finally {
        setLoading(false);
      }
    }
  }, [user]);

  return (
    <UserWeightContext.Provider value={{ weights, loading }}>
      {children}
    </UserWeightContext.Provider>
  );
};

export function useUserWeightContext() {
  return useContext(UserWeightContext);
}
