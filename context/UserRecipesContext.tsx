import { auth, db } from "@/config/firebase";
import { recipeProps, userRecipesContextProps } from "@/types";
import { error } from "console";
import { onAuthStateChanged, User } from "firebase/auth";
import { collection, doc, onSnapshot } from "firebase/firestore";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

export const UserRecipesContext = createContext<userRecipesContextProps>({
  recipes: [],
  loading: true,
});

export const UserRecipesProvider = ({ children }: { children: ReactNode }) => {
  // States to return
  const [user, setUser] = useState<User | null>();
  const [recipes, setRecipes] = useState<recipeProps[]>([]);
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
        const userRecipesDocRef = doc(db, "UserRecipes", user.uid);
        const recipesList = collection(userRecipesDocRef, "recipesList");
        const usubscribeUserRecipes = onSnapshot(
          recipesList,
          (snapshot) => {
            if (!snapshot.empty) {
              const recipesItems = snapshot.docs.map(
                (doc) => doc.data() as recipeProps
              );
              setRecipes(recipesItems);
            } else {
              console.warn("No recipes found");
              setRecipes([]);
            }
            setLoading(false);
          },
          (error) => {
            console.error("Error fetching the data ", error.message);
            setLoading(false);
          }
        );

        return () => {
          usubscribeUserRecipes();
        };
      } catch (error: any) {
        console.error(error.message);
      }
    }
  }, [user]);

  return (
    <UserRecipesContext.Provider value={{ recipes, loading }}>
      {children}
    </UserRecipesContext.Provider>
  );
};

export function useUserRecipesContext() {
  return useContext(UserRecipesContext);
}
