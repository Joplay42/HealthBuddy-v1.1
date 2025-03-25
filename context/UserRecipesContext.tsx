import { recipeProps, userRecipesContextProps } from "@/types";
import { createContext, ReactNode, useContext, useState } from "react";

export const UserRecipesContext = createContext<userRecipesContextProps>({
  recipes: [],
  loading: true,
});

export const UserRecipesProvider = ({ children }: { children: ReactNode }) => {
  // States to return
  const [recipes, setRecipes] = useState<recipeProps[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  return (
    <UserRecipesContext.Provider value={{ recipes, loading }}>
      {children}
    </UserRecipesContext.Provider>
  );
};

export function useUserRecipesContext() {
  return useContext(UserRecipesContext);
}
