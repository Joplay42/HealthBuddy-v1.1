import { DashboardButton } from "@/components";
import { foodEntriesLabel, settingCard } from "@/constant";
import { User } from "firebase/auth";
import { Dispatch, ReactNode, SetStateAction } from "react";

export type NavLinksWebsiteProps = {
  name: string;
  url: string;
}[];

export type custombuttonProps = {
  text: string;
  link: string;
  style: string;
};

export type mobileMenuProps = {
  setMenuOpen: Dispatch<SetStateAction<boolean>>;
};

export type tagProps = {
  text: string;
};

export type cardsWebsiteProps = {
  icon: string;
  title: string;
  description: string;
}[];

export type quotesProps = {
  text: string;
  author: string;
}[];

export type quotesTimerProps = {
  setCurrentIndex: Dispatch<SetStateAction<number>>;
  setIsFading: Dispatch<SetStateAction<boolean>>;
};

export type authFormProps = {
  type: "login" | "signin";
};

export type navLinksDashboardProps = {
  text: string;
  icon: string;
  link: string;
}[];

export type userGoalProps = {
  calorie: number;
  carbs: number;
  protein: number;
  fat: number;
  weight: number;
};

export type userCalorieProps = {
  calorie: number;
  carbs: number;
  protein: number;
  fat: number;
};

export type headerProps = {
  displayName: string | null;
};

export type overViewProps = {
  goal: userGoalProps;
  data: userCalorieProps;
  loading: boolean;
};

export type chartProps = {
  data: number;
  remaining: number;
};

export type barChartProps = {
  data: userCalorieProps;
  goal: userGoalProps;
  nutrient: "protein" | "carbs" | "fat";
};

export type objectiveProps = {
  data: userCalorieProps;
  goal: userGoalProps;
  loading: boolean;
};

export type calculateNutriantDailyProps = {
  dailyCalories: number;
  nutrientPercentage: number;
  nutrientType: "protein" | "carbs" | "fat";
};

export type ObjectiveCardProps = {
  data: userCalorieProps;
  goal: userGoalProps;
  nutrient: "protein" | "carbs" | "fat";
};

export type dashboardButtonProps = {
  text: string;
  action: React.Dispatch<React.SetStateAction<boolean>>;
  full?: boolean;
  icon?: string;
};

export type foodProps = {
  UserId?: string;
  Id?: string;
  multiplier?: number;
  Pending?: boolean;
  Meal?: string;
  Name: string;
  Brand: string;
  Quantity: number;
  Unit: string;
  Calories: number;
  Protein: number;
  Carbs: number;
  Fat: number;
};

export type Algoliahit = {
  objectId: string;
  Name: string;
  Brand: string;
  Quantity: number;
  Unit: string;
  Calories: number;
  Protein: number;
  Carbs: number;
  Fat: number;
};

export type foodItemCardProps = {
  food: foodProps;
};

export type foodEntriesListProps = {
  label: string[];
  data: foodProps[];
};

export type foodMenuProps = {
  label: string[];
  data: foodProps[];
  food: number;
};

export type foodItemProps = {
  foodItem: number;
};

export type foodEntriesProps = {
  foodList: foodProps[];
};

export type handleFormSubmitProps = {
  type: "login" | "signin";
  event: React.FormEvent<HTMLFormElement>;
};

export type loginUserProps = {
  email: string;
  password: string;
};

export type sideBarProps = {
  user: User;
};

export type userProps = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};

export type resetEmailProps = {
  email: string;
};

export type handleSubmitResetProps = {
  email: string;
  event: React.FormEvent<HTMLFormElement>;
};

export type settingSideBarProps = {
  title: string;
  category: {
    name: string;
    link: string;
  }[];
}[];

export type settingCardProps = {
  category: string;
  cards: {
    id: string;
    title: string;
    description: string;
    input: string[];
    button: string;
  }[];
}[];

export type cardProps = {
  card: {
    id: string;
    title: string;
    description: string;
    input: string[];
    button: string;
  };
};

export type settingsCardProps = {
  event: React.FormEvent<HTMLFormElement>;
};

export type changeAccountProps = {
  firstName: string;
  lastName: string;
};

export type alertBoxProps = {
  children: ReactNode;
  variant: "primary" | "secondary" | "success" | "danger" | "warning" | "info";
  setVisibility: React.Dispatch<React.SetStateAction<boolean>>;
};

export type DeleteAccountConfirmationProps = {
  setState: React.Dispatch<React.SetStateAction<boolean>>;
  setError: React.Dispatch<React.SetStateAction<string>>;
};

export type DashboardProps = {
  children: React.ReactNode;
};

export type SearchBarProps = {
  searchTerm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
  onSubmit: () => void;
};

export type NutrientsChartsProps = {
  Calories: number;
  Protein: number;
  Carbs: number;
  Fat: number;
  size: string;
  fontSize: string;
};

export type userInformationContextProps = {
  userGoal: userGoalProps;
  userCalorieInfo: userCalorieProps;
  loading: boolean;
};

export type newObjectiveProps = {
  dailyCalorie: number;
  protein: number;
  carb: number;
  fat: number;
  userId: string;
};

export type adminPendingItemContextProps = {
  pendingItem: foodProps[];
  loading: boolean;
  updatePendingItem: (updatedItem: foodProps) => void;
  changePendingItem: (updatedItem: foodProps) => void;
  deletePendingItem: (id: string) => void;
};

export type userPendingItemContextProps = {
  pendingItem: foodProps[];
  loading: boolean;
};

export type pendingItemProps = {
  item: foodProps;
  onApprove: () => void;
  onChange: (updatedItem: foodProps) => void;
  onDelete: () => void;
};

export type recipeProps = {
  UserId: string;
  Name: string;
  NbServing: number;
  foods: foodProps[];
  macronutrients: macronutrients;
};

export type macronutrients = {
  Calories: number;
  Proteins: number;
  Carbs: number;
  Fat: number;
};

export type userRecipesContextProps = {
  recipes: recipeProps[];
  loading: boolean;
};
