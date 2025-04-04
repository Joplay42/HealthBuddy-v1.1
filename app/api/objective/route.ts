import { db } from "@/config/firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
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
    const docGoalRef = doc(db, "UserGoal", userId);
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

    // reference of the users doc
    const userGoalDocRef = doc(db, "UserGoal", userId);

    // Set the new doc
    const userGoal = await setDoc(
      userGoalDocRef,
      { calorie: 0, carbs: 0, fat: 0, protein: 0 },
      { merge: true }
    );

    // Return success message
    return new NextResponse(
      JSON.stringify({
        message: "Objective has been created",
        data: userGoal,
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
