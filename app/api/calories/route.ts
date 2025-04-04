import { db } from "@/config/firebase";
import { deleteDoc, doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { NextResponse } from "next/server";

export const GET = async (request: Request) => {
  // Error handling
  try {
    // The new searchParams
    const { searchParams } = new URL(request.url);
    // Get the userid
    const userId = searchParams.get("userid");

    // handle null values
    if (!userId) {
      return new NextResponse(
        JSON.stringify({
          message: "Missing parameters",
        }),
        { status: 422 }
      );
    }

    // Get the firestore doc
    const docGoalRef = doc(db, "UserCalorieData", userId);
    const data = await getDoc(docGoalRef);

    // Handle null values
    if (!data.exists()) {
      return new NextResponse(
        JSON.stringify({
          message: `No user has been found with an id of ${userId}`,
        }),
        { status: 404 }
      );
    }

    // Return the doc
    return new NextResponse(
      JSON.stringify({
        message: "Document has been found",
        data: data.data(),
      }),
      { status: 200 }
    );
  } catch (error: any) {
    // Return new error response
    return new NextResponse(
      JSON.stringify({
        message: "An error occured while trying to fetch the users objective",
        error: error.message,
      }),
      { status: 500 }
    );
  }
};

export const POST = async (request: Request) => {
  // Error handling
  try {
    // The new searchParams
    const { searchParams } = new URL(request.url);
    // Get the userid
    const userId = searchParams.get("userid");

    // handle null values
    if (!userId) {
      return new NextResponse(
        JSON.stringify({
          message: "Missing parameters",
        }),
        { status: 422 }
      );
    }

    // Create UserCalorie Firestore doc
    const fireStoreUserCalorieDoc = await doc(db, "UserCalorieData", userId);
    // Blank UserCalorie Firestore doc
    await setDoc(
      fireStoreUserCalorieDoc,
      { calorie: 0, carbs: 0, fat: 0, protein: 0 },
      { merge: true }
    );

    // Get the doc
    const data = await getDoc(fireStoreUserCalorieDoc);

    // Handle null values
    if (!data.exists()) {
      return new NextResponse(
        JSON.stringify({
          message: `No user has been found with an id of ${userId}`,
        }),
        { status: 404 }
      );
    }

    // Return the doc
    return new NextResponse(
      JSON.stringify({
        message: "Document has been created",
        data: data.data(),
      }),
      { status: 200 }
    );
  } catch (error: any) {
    // Return new error response
    return new NextResponse(
      JSON.stringify({
        message: "An error occured while trying to fetch the users objective",
        error: error.message,
      }),
      { status: 500 }
    );
  }
};

export const DELETE = async (request: Request) => {
  try {
    // The new searchParams
    const { searchParams } = new URL(request.url);
    // Get the user id
    const userId = searchParams.get("userid");

    // handle null values
    if (!userId) {
      return new NextResponse(
        JSON.stringify({
          message: "Missing parameters",
        }),
        { status: 422 }
      );
    }

    // Check if the user exists
    // reference of the users doc
    const userGoalDocRef = doc(db, "UserCalorieData", userId);
    const data = await getDoc(userGoalDocRef);

    // Handle null values
    if (!data.exists()) {
      return new NextResponse(
        JSON.stringify({
          message: `No document has been found with an id of ${userId}`,
        }),
        { status: 404 }
      );
    }

    await deleteDoc(userGoalDocRef);

    // Return success message
    return new NextResponse(
      JSON.stringify({
        message: "Calories has been deleted",
      }),
      { status: 200 }
    );
  } catch (error: any) {
    return new NextResponse(
      JSON.stringify({
        error: error.message,
      }),
      { status: 500 }
    );
  }
};

export const PATCH = async (request: Request) => {
  // Error handling
  try {
    // The new searchParams
    const { searchParams } = new URL(request.url);
    // Get the userid
    const userId = searchParams.get("userid");

    // handle null values
    if (!userId) {
      return new NextResponse(
        JSON.stringify({
          message: "Missing parameters",
        }),
        { status: 422 }
      );
    }

    // Get the body
    const body = await request.json();

    // Error handling
    if (!body || Object.keys(body).length === 0) {
      return new NextResponse(JSON.stringify({ message: "Invalid data" }), {
        status: 400,
      });
    }

    // Destructure the data
    const { macros, multiplier } = body;
    // Check any missing attribute
    if (!macros || !multiplier) {
      return new NextResponse(
        JSON.stringify({
          message: "Missing object attribute",
        }),
        { status: 400 }
      );
    }

    // Create UserCalorie Firestore doc
    const userCalorieDoc = await doc(db, "UserCalorieData", userId);
    // Add calories to Firestore doc
    const docSnap = await getDoc(userCalorieDoc);

    if (docSnap.exists()) {
      // Store the current data
      const userData = docSnap.data();
      const currentCalories = userData.calorie;
      const currentProtein = userData.protein;
      const currentCarbs = userData.carbs;
      const currentFat = userData.fat;

      // Calculate the new total calories
      const updatedCalories = Math.round(
        currentCalories + macros.Calories * multiplier
      );
      const updatedProtein = Math.round(
        currentProtein + macros.Protein * multiplier
      );
      const updatedCarbs = Math.round(currentCarbs + macros.Carbs * multiplier);
      const updatedFat = Math.round(currentFat + macros.Fat * multiplier);

      // Store the new total calorie
      await updateDoc(userCalorieDoc, {
        calorie: updatedCalories,
        protein: updatedProtein,
        carbs: updatedCarbs,
        fat: updatedFat,
      });
    } else {
      // Handle null values
      return new NextResponse(
        JSON.stringify({
          message: `No user has been found with an id of ${userId}`,
        }),
        { status: 404 }
      );
    }

    // Return the doc
    return new NextResponse(
      JSON.stringify({
        message: "Document has been updated",
      }),
      { status: 200 }
    );
  } catch (error: any) {
    // Return new error response
    return new NextResponse(
      JSON.stringify({
        message: "An error occured while trying to fetch the users calories",
        error: error.message,
      }),
      { status: 500 }
    );
  }
};
