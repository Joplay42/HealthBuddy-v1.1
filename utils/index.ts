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
  foodListProps,
  objectiveProps,
  newObjectiveProps,
  foodItem,
  foodItemConsumed,
} from "@/types";
import { auth, db } from "@/config/firebase";
import { client } from "@/config/algolia";
import {
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  sendEmailVerification,
  deleteUser,
  User,
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

  // Create UserCalorie Firestore doc
  const fireStoreUserCalorieDoc = await doc(
    db,
    "UserCalorieData",
    userCredential.user.uid
  );
  // Blank UserCalorie Firestore doc
  await setDoc(
    fireStoreUserCalorieDoc,
    { calorie: 0, carbs: 0, fat: 0, protein: 0 },
    { merge: true }
  );

  // Create UserGoal Firestore doc
  const fireStoreUserGoalDoc = await doc(
    db,
    "UserGoal",
    userCredential.user.uid
  );
  //Blank UserGoal firestore doc
  await setDoc(
    fireStoreUserGoalDoc,
    { calorie: 0, carbs: 0, fat: 0, protein: 0, weight: 0 },
    { merge: true }
  );

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
    // The userCalorieDoc
    const docRef = doc(db, "UserCalorieData", user.uid);
    await resetUserCalorieInformation(docRef);
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

    // The UserCalorieData firestore doc
    const userCalorieDataDoc = doc(db, "UserCalorieData", user.uid);
    // Delete the UserCalorieData firestore doc
    await deleteDoc(userCalorieDataDoc);

    // The UserFoodList firestore doc
    const userConsumedFood = doc(db, "UserConsumedFood", user.uid);
    // Delete the userConsumedFood
    await deleteDoc(userConsumedFood);

    // The UserGoal firestoreDoc
    const userGoalDoc = doc(db, "UserGoal", user.uid);
    // Dete the UserGoal firestore doc
    await deleteDoc(userGoalDoc);
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
  foodItem: foodProps,
  userId: string,
  multiplier: number
) => {
  // Get the doc
  const docRef = doc(db, "UserCalorieData", userId);
  // Snapshot of the doc
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    // Store the current data
    const userData = docSnap.data();
    const currentCalories = userData.calorie;
    const currentProtein = userData.protein;
    const currentCarbs = userData.carbs;
    const currentFat = userData.fat;

    // Calculate the new total calories
    const updatedCalories = Math.round(
      currentCalories + foodItem.Calories * multiplier
    );
    const updatedProtein = Math.round(
      currentProtein + foodItem.Protein * multiplier
    );
    const updatedCarbs = Math.round(currentCarbs + foodItem.Carbs * multiplier);
    const updatedFat = Math.round(currentFat + foodItem.Fat * multiplier);

    // Store the new total calorie
    await updateDoc(docRef, {
      calorie: updatedCalories,
      protein: updatedProtein,
      carbs: updatedCarbs,
      fat: updatedFat,
    });
  } else {
    console.log("User document not found");
  }
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
  // Get the doc
  const userConsumedFoodRef = doc(db, "UserConsumedFood", userId);
  // The foodList subcollection
  const foodListRef = collection(userConsumedFoodRef, "foodList");

  // Multiplie the food
  const newFood: foodItemConsumed = {
    Meal: meal,
    Name: food.Name,
    Brand: food.Brand,
    Quantity: Math.round(food.Quantity * multiplier),
    Unit: food.Unit,
    Calories: Math.round(food.Calories * multiplier),
    Protein: Math.round(food.Protein * multiplier),
    Carbs: Math.round(food.Carbs * multiplier),
    Fat: Math.round(food.Fat * multiplier),
  };
  // Add a new document
  await addDoc(foodListRef, newFood);
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

/**
 * This function is used to fetch the FoodApiCollection to the firestore
 * database.
 *
 * @returns an array
 */
export const getFoodsItem = async (searchTerm: string) => {
  // Handle the errors
  try {
    // Get the firestore collection
    const collectionRef = collection(db, "FoodApiCollection");

    // Query with the searchTerms
    const querySnapshot = query(collectionRef, where("Name", "==", searchTerm));
    // Get the snapshot of each doc
    const snapshot = await getDocs(querySnapshot);

    // Add to a list
    const foodList = snapshot.docs.map((doc) => ({ ...doc.data() }));

    // Return the list
    return foodList;
  } catch (error: any) {
    // Display the errors message
    console.log(error.message);
  }
};

/**
 * This function is used to create a new food Item in the firestore.
 *
 * @param foodData The food item
 * @returns
 */
export const createFood = async (foodData: foodProps) => {
  // Handling the errors
  try {
    // Get the id of the document
    const docId = `${foodData.Brand}_${foodData.Name}`;
    // A collection reference
    const collectionRef = collection(db, "FoodApiCollection");
    // Get the collection reference
    const foodRef = doc(collectionRef, docId);
    // Add the new food to the firebase
    await setDoc(foodRef, foodData);
  } catch (error: any) {
    // Display an error message
    console.error(
      "An error occured while trying to create the food",
      error.message
    );
  }
};

/**
 * This function is used to modify the food Item passed in parameter of this
 * function.
 *
 * @param foodItem The food item to modify
 * @param updates The updates to modify the food
 */
export const updateFood = async (
  foodItem: foodProps,
  updates: Partial<foodProps>
) => {
  try {
    // The food id
    const docId = `${foodItem.Brand}_${foodItem.Name}`;
    // Find the food doc
    const docRef = doc(db, "FoodApiCollection", docId);
    // Fetch the document to see if it exist
    const docSnapshot = await getDoc(docRef);
    // Handle if the doc is not found
    if (!docSnapshot.exists()) {
      throw new Error("Missing or invalid food item");
    }

    // The new docId
    const newDocId =
      updates.Brand || updates.Name
        ? `${updates.Brand || foodItem.Brand}_${updates.Name || foodItem.Name}`
        : docId;

    if (newDocId !== docId) {
      // Create a new doc with the new id
      const newDocRef = doc(db, "FoodApiCollection", newDocId);
      await setDoc(newDocRef, { ...foodItem, ...updates });

      // Delete the old doc
      await deleteDoc(docRef);
      // Return the new doc
      return { id: newDocId, ...foodItem, updates };
    } else {
      // Update the changes
      await updateDoc(docRef, updates);
      return { id: docId, ...foodItem, updates };
    }
  } catch (error: any) {
    console.error(
      "An error occured while trying to update the food",
      error.message
    );
  }
};

export const deleteFood = async (foodId: string) => {
  try {
    // Get the doc reference
    const docRef = doc(db, "FoodApiCollection", foodId);
    // The snapshot of the doc
    const docSnapshot = await getDoc(docRef);
    // delete the doc
    const deletedDoc = docSnapshot.data();

    await deleteDoc(docRef);

    return deletedDoc;
  } catch (error: any) {
    console.error("An error occured while trying to delete the user");
  }
};

export const setObjective = async ({
  dailyCalorie,
  protein,
  carb,
  fat,
  userId,
}: newObjectiveProps) => {
  // Error handling
  try {
    // reference of the users doc
    const docRef = doc(db, "UserGoal", userId);
    // Set the new doc
    await setDoc(docRef, {
      calorie: dailyCalorie,
      protein: protein,
      carbs: carb,
      fat: fat,
      weight: 0,
    });
  } catch (error: any) {
    console.error(
      "An error occured while trying to create the new objective : ",
      error.message
    );
  }
};
