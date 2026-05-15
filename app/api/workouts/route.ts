import { db } from "@/config/firebase-server";
import { BodyWeightProps, userWeightProps } from "@/types";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  Timestamp,
  updateDoc,
  where,
} from "firebase/firestore/lite";
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
    // Set the new doc — stamp startDate so we can compute progression baselines.
    const userGoal = await setDoc(userGoalDocRef, {
      ...body,
      startDate: Timestamp.fromDate(new Date()),
    });

    // Reference the userWeights doc
    const userWeightRef = doc(db, "UserWeights", userId);
    const userWeightlistRef = collection(userWeightRef, "weightList");

    // Define today boundaries
    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);

    const endOfDay = new Date();
    endOfDay.setHours(23, 59, 59, 999);

    // Query for today's entry
    const q = query(
      userWeightlistRef,
      where("date", ">=", Timestamp.fromDate(startOfDay)),
      where("date", "<=", Timestamp.fromDate(endOfDay))
    );

    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      // Update existing weight for today
      const existingDoc = querySnapshot.docs[0].ref;
      await updateDoc(existingDoc, {
        number: currentWeight,
        date: new Date(),
      });

      // Return success message
      return new NextResponse(
        JSON.stringify({
          message: "Weight updated for today",
        }),
        { status: 200 }
      );
    } else {
      // Create new weight entry
      const weight = { number: currentWeight, date: new Date() };
      const newDoc = await addDoc(userWeightlistRef, weight);
      await setDoc(newDoc, { Id: newDoc.id }, { merge: true });

      // Return success message
      return new NextResponse(
        JSON.stringify({
          message: "Weight added",
          data: newDoc,
        }),
        { status: 201 }
      );
    }
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
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userid");

    if (!userId) {
      return new NextResponse(
        JSON.stringify({ message: "Missing parameters" }),
        { status: 422 }
      );
    }

    const body = await request.json();

    if (!body || Object.keys(body).length === 0) {
      return new NextResponse(JSON.stringify({ message: "Invalid data" }), {
        status: 400,
      });
    }

    const { objectiveWeight, months, resetBaseline, currentWeight } = body;

    if (
      objectiveWeight === undefined ||
      months === undefined ||
      Number(objectiveWeight) <= 0 ||
      Number(months) <= 0
    ) {
      return new NextResponse(
        JSON.stringify({ message: "Missing object attribute" }),
        { status: 400 }
      );
    }

    const userGoalDocRef = doc(db, "UserWorkouts", userId);
    const existing = await getDoc(userGoalDocRef);

    if (!existing.exists()) {
      return new NextResponse(
        JSON.stringify({ message: "No workout objective exists yet" }),
        { status: 404 }
      );
    }

    const update: Record<string, any> = {
      objectiveWeight: Number(objectiveWeight),
      months: Number(months),
    };

    if (resetBaseline) {
      update.startDate = Timestamp.fromDate(new Date());
      if (currentWeight !== undefined && Number(currentWeight) > 0) {
        update.currentWeight = Number(currentWeight);
      }
    } else if (!existing.data()?.startDate) {
      // Backfill startDate for users whose objective predates this field.
      update.startDate = Timestamp.fromDate(new Date());
    }

    await updateDoc(userGoalDocRef, update);

    return new NextResponse(
      JSON.stringify({ message: "Workout objective updated" }),
      { status: 200 }
    );
  } catch (error: any) {
    return new NextResponse(
      JSON.stringify({ error: error.message }),
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
