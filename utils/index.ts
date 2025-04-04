import { quotes } from "@/constant";
import {
  quotesTimerProps,
  calculateNutriantDailyProps,
  loginUserProps,
  userProps,
  resetEmailProps,
  changeAccountProps,
  foodProps,
  userCalorieProps,
  userInformationContextProps,
  objectiveProps,
  newObjectiveProps,
  macronutrients,
  recipeProps,
} from "@/types";
import { auth, db } from "@/config/firebase";
import {
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  sendEmailVerification,
  deleteUser,
} from "firebase/auth";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  DocumentData,
  DocumentReference,
  getDoc,
  getDocs,
  query,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import { json } from "stream/consumers";

/**
 * This functions is used to change tu current index using a timer and adding
 * a states for the animations.
 *
 * @param setCurrentIndex the current index state
 * @param setIsFading animation
 * @returns
 */
export const quotesTimer = ({
  setCurrentIndex,
  setIsFading,
}: quotesTimerProps) => {
  const interval = setInterval(() => {
    setIsFading(true);
    setTimeout(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % quotes.length);
      setIsFading(false);
    }, 500);
  }, 5000);

  return () => clearInterval(interval);
};

/**
 * This functions is used to calculate the daily amount of nutrient depending of the nutrient
 * type.
 *
 * @param dailyCalories daily calories
 * @param nutrientPercentage the pourcentage for the amount of the nutrient
 * @param nutrientType the nutrient type
 * @returns
 */
export const calculateNutriantDaily = ({
  dailyCalories,
  nutrientPercentage,
  nutrientType,
}: calculateNutriantDailyProps) => {
  // The amount of nutrient using the pourcentage
  const nutrientCalories = (nutrientPercentage / 100) * dailyCalories;

  // Determine of nutrient with the calorie goal
  let caloriesPerGram: number;
  // Switch case for each nutrient type
  switch (nutrientType) {
    // Protein
    case "protein":
      caloriesPerGram = 4;
      break;
    // Carbs
    case "carbs":
      caloriesPerGram = 4;
      break;
    // Fat
    case "fat":
      caloriesPerGram = 9;
      break;
    default:
      // Error handling
      throw new Error("Invalid nutrient type");
  }

  // The amount of grams for the nutrient
  const nutrientGrams = nutrientCalories / caloriesPerGram;

  // Return the amount
  return Math.round(nutrientGrams);
};

/**
 * This functions handle all the user creations. By default firebase cant
 * create user account with a first and last name, so we then modify the account
 * and add the first and last name. This functions returns the user object.
 *
 * @param firstName
 * @param lastName
 * @param email
 * @param password
 * @returns
 */
export const createUser = async ({
  firstName,
  lastName,
  email,
  password,
}: userProps) => {
  // Create the user with firebase
  const userCredential = await createUserWithEmailAndPassword(
    auth,
    email,
    password
  );

  let res;

  // Create UserCalorie Firestore doc
  res = await fetch(`/api/calories?userid=${userCredential.user.uid}`, {
    method: "POST",
  });
  // Create UserGoal Firestore doc
  res = await fetch(`/api/objective?userid=${userCredential.user.uid}`, {
    method: "POST",
  });

  // Error handling
  if (!res.ok) {
    throw new Error("An error occured while trying to create the user");
  }

  // Make a single name with firstName and LastName
  const displayName = firstName + " " + lastName;

  // Update the profil to add the name using firebase
  await updateProfile(userCredential.user, { displayName: displayName });

  // Returns the user object
  return userCredential.user;
};

/**
 * This function handles the user login, using the email and password it then
 * find and returns the right account.
 *
 * @param email
 * @param password
 * @returns
 */
export const loginUser = async ({ email, password }: loginUserProps) => {
  // Find the account with firebase
  const userCredential = await signInWithEmailAndPassword(
    auth,
    email,
    password
  );

  // User object
  const user = userCredential.user;

  // Get the localStorage last sign in
  const lastSignIn = localStorage.getItem("lastSignIn");

  // verify if a day has passed
  if (lastSignIn && hasADayPassed(lastSignIn)) {
    // Delete the current calories and consumed food
    await fetch(`/api/calories?userid=${auth.currentUser?.uid}`, {
      method: "DELETE",
    });
    await fetch(`/api/foods/consumed?userid=${auth.currentUser?.uid}`, {
      method: "DELETE",
    });
  }

  // Get the current sign in
  const currentSignIn = user.metadata.lastSignInTime;

  if (currentSignIn) {
    // Update the local storage to the new sign in
    localStorage.setItem("lastSignIn", currentSignIn.toString());
  }

  // Returns the user object
  return userCredential.user;
};

export const logoutUser = () => {
  signOut(auth);
};

/**
 * This function handles the reset password email. It passes an email has a parameter
 * to send the password verification to.
 *
 * @param email
 */
export const resetPassword = async ({ email }: resetEmailProps) => {
  await sendPasswordResetEmail(auth, email);
};

/**
 *
 * This function is used to send a confirmation email to confirm the users account
 *
 */
export const confirmEmail = async () => {
  // Define the current user
  const user = auth.currentUser;

  // If there is a user
  if (user) {
    // Use Firebase to send the email verification
    await sendEmailVerification(user);
  }
};

/**
 * This function is used to change the account first and last name.
 *
 * @param firstName
 * @param lastName
 */
export const changeAccountName = async ({
  firstName,
  lastName,
}: changeAccountProps) => {
  // Define the current user
  const user = auth.currentUser;

  // if the first and last name arent empty
  if (user && firstName.length > 0 && lastName.length > 0) {
    // Use the firebase function to update the profile with the new first and last name
    await updateProfile(user, { displayName: firstName + " " + lastName });
  }
};

/**
 *
 * This functions is used to delete the user account.
 *
 */
export const deleteAccount = async () => {
  // Define the current user
  const user = auth.currentUser;

  // If the user exist
  if (user) {
    // Use the firebase deleteUser function
    await deleteUser(user);

    let res;

    // The UserCalorieData firestore doc
    res = await fetch(`/api/calories?userid=${user.uid}`, {
      method: "DELETE",
    });

    // The UserFoodList firestore doc
    await fetch(`/api/foods/consumed?userid=${auth.currentUser?.uid}`, {
      method: "DELETE",
    });

    // The UserGoal firestoreDoc
    res = await fetch(`/api/objective?userid=${user.uid}`, {
      method: "DELETE",
    });

    // Error handling
    if (!res.ok) {
      throw new Error("An error occured while trying to create the user");
    }
  }
};

/**
 * This function is used when the user select the foodItem to consumed. It add the
 * new amount of the food in the userCalorieInfo firestore db.
 *
 * @param foodItem The food to consume
 * @param userData The user information
 */
export const consumeFood = async (
  macros: macronutrients,
  userId: string,
  multiplier: number
) => {
  const res = await fetch(`/api/calories?userid=${userId}`, {
    method: "PATCH",
    body: JSON.stringify({ macros, multiplier }),
  });
};

/**
 * This functions is used to add the food into the firestore Document.
 *
 * @param food
 * @param userId
 */
export const addFoodToConsumedList = async (
  meal: string,
  food: foodProps,
  multiplier: number,
  userId: string
) => {
  const res = await fetch(`/api/foods/consumed?userid=${userId}`, {
    method: "PATCH",
    body: JSON.stringify({
      meal: meal,
      food: food,
      multiplier: multiplier,
    }),
  });

  if (!res.ok) {
    throw new Error("An error occured trying to stored into consumedFood");
  }
};

/**
 * This functions is used to add the food into the firestore Document.
 *
 * @param food
 * @param userId
 */
export const addRecipeToConsumedList = async (
  meal: string,
  recipe: recipeProps,
  macros: macronutrients,
  multiplier: number,
  userId: string
) => {
  // Multiplie the food
  const newFood = {
    Meal: meal,
    Name: recipe.Name,
    Brand: "Homemade recipe",
    Quantity: 1,
    Unit: "portion",
    Calories: Math.round(macros.Calories * multiplier),
    Protein: Math.round(macros.Protein * multiplier),
    Carbs: Math.round(macros.Carbs * multiplier),
    Fat: Math.round(macros.Fat * multiplier),
  };

  const res = await fetch(`/api/foods/consumed?userid=${userId}`, {
    method: "PATCH",
    body: JSON.stringify({
      meal: meal,
      food: newFood,
      multiplier: multiplier,
    }),
  });

  if (!res.ok) {
    throw new Error("An error occured trying to stored into consumedFood");
  }
};

/**
 * This arrow function is used to convert the lastSignIn dateTime to the
 * right timeZone of the user.
 *
 * @param lastSignIn The lastSignIn date of the user to convert
 * @returns The converted date with the right timezone
 */
export const dateToUserTimeZone = (lastSignIn: string) => {
  const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const date = new Date(lastSignIn);

  // Use the Intl API to format to ISO 8601 string
  return date.toLocaleString("en-CA", {
    timeZone: userTimeZone,
    hourCycle: "h23", // Use 24-hour format
  });
};

/**
 * this function is used to display a boolean if a day has passed.
 *
 * @param userLastSignIn the user lastSignIn date
 * @returns Return boolean if a day has passed
 */
export const hasADayPassed = (userLastSignIn: string) => {
  // Create new Date obejct
  const pastDate = new Date(userLastSignIn);

  // Get the current date
  const now = new Date();

  // Move the pastDate to midnight
  pastDate.setHours(0, 0, 0, 0);
  pastDate.setDate(pastDate.getDate() + 1);

  // Check if the currentTime is past the nextMidnight
  return now.getTime() >= pastDate.getTime();
};

/**
 *
 * @param userId The userId to get the right firestore data
 */
export const resetUserCalorieInformation = async (
  UserCalorieData: DocumentReference<DocumentData, DocumentData>
) => {
  // Erase the userCalorieData
  await setDoc(UserCalorieData, {
    calorie: 0,
    carbs: 0,
    fat: 0,
    protein: 0,
  });
};

export const recipeTotalMacronutrients = (foods: foodProps[]) => {
  let total: macronutrients = {
    Calories: 0,
    Protein: 0,
    Carbs: 0,
    Fat: 0,
  };

  foods.map((item) => {
    total.Calories += item.Calories;
    total.Protein += item.Protein;
    total.Carbs += item.Carbs;
    total.Fat += item.Fat;
  });

  return total;
};
