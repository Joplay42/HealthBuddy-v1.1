import { db } from "@/config/firebase";
import { BodyWeightProps, userWeightProps } from "@/types";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  setDoc,
} from "firebase/firestore";
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
    const docGoalRef = doc(db, "UserWorkouts", userId);
    const data = await getDoc(docGoalRef);

    // Handle null values
    if (!data.exists()) {
      return new NextResponse(
        JSON.stringify({
          message: `No data found ${data}`,
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
        message: "An error occured while trying to fetch the users workout",
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

    // Get the body
    const body = await request.json();

    // Error handling
    if (!body || Object.keys(body).length === 0) {
      return new NextResponse(JSON.stringify({ message: "Invalid data" }), {
        status: 400,
      });
    }

    const {
      workoutPlan: { title, desc, days },
      objectiveWeight,
      currentWeight,
      months,
    } = body;

    // Check any missing attribute
    if (!objectiveWeight || !currentWeight || !months || !title || !desc) {
      return new NextResponse(
        JSON.stringify({
          message: "Missing object attribute",
        }),
        { status: 400 }
      );
    }

    // reference of the userWorkout doc
    const userGoalDocRef = doc(db, "UserWorkouts", userId);
    // Set the new doc
    const userGoal = await setDoc(userGoalDocRef, body);

    // Reference the userWeights doc
    const userWeightRef = doc(db, "UserWeights", userId);
    const userWeightlistRef = collection(userWeightRef, "weightList");

    // Create new weight object
    const weight: userWeightProps = { number: currentWeight, date: new Date() };

    // Set the doc with the recipe
    const newDoc = await addDoc(userWeightlistRef, weight);
    // Set the docId
    await setDoc(newDoc, { Id: newDoc.id }, { merge: true });

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
    const userWorkoutsDocRef = doc(db, "UserWorkouts", userId);
    const data = await getDoc(userWorkoutsDocRef);

    // Handle null values
    if (!data.exists()) {
      return new NextResponse(
        JSON.stringify({
          message: `No document has been found with an id of ${userId}`,
        }),
        { status: 404 }
      );
    }

    await deleteDoc(userWorkoutsDocRef);

    // Return success message
    return new NextResponse(
      JSON.stringify({
        message: "Workouts has been deleted",
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
