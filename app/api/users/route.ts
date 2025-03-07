import { auth, db } from "@/config/firebase";
import { userProps } from "@/types";
import {
  createUserWithEmailAndPassword,
  updateProfile,
  User,
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { NextResponse } from "next/server";

export const POST = async (request: Request) => {
  // Error handling
  try {
    // Get the body
    const body = await request.json();
    const { firstName, lastName, email, password } = body;

    // Handle error if invalid value
    if (!body || Object.keys(body).length === 0) {
      return new NextResponse(JSON.stringify({ message: "Invalid data" }), {
        status: 400,
      });
    }

    // Check if all the value is there
    if (!firstName || !lastName || !email || !password) {
      return new NextResponse(
        JSON.stringify({
          message: "Missing object attribute",
        }),
        { status: 400 }
      );
    }

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

    return new NextResponse(
      JSON.stringify({
        message: "The item has been stored in the databse",
      }),
      { status: 200 }
    );
  } catch (error: any) {
    return new NextResponse(
      JSON.stringify({
        message: "An error occured while trying to create the user",
        error: error.message,
      }),
      { status: 500 }
    );
  }
};
