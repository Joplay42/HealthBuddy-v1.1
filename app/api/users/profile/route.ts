import { db } from "@/config/firebase-server";
import {
  deleteDoc,
  doc,
  getDoc,
  setDoc,
  updateDoc,
} from "firebase/firestore/lite";
import { NextResponse } from "next/server";

const ONBOARDING_FIELDS = new Set([
  "hasCompletedHomeFallbackTour",
  "hasCompletedCalorieFallbackTour",
  "hasCompletedCalorieTour",
  "hasCompletedWorkoutFallbackTour",
  "hasCompletedWorkoutTour",
]);

export const GET = async (request: Request) => {
  try {
    const { searchParams } = new URL(request.url);
    const userid = searchParams.get("userid");

    if (!userid) {
      return new NextResponse(
        JSON.stringify({ message: "Missing userid" }),
        { status: 400 }
      );
    }

    const userDocRef = doc(db, "Users", userid);
    const snapshot = await getDoc(userDocRef);

    if (!snapshot.exists()) {
      const defaults = {
        hasCompletedHomeFallbackTour: false,
        hasCompletedCalorieFallbackTour: false,
        hasCompletedCalorieTour: false,
        hasCompletedWorkoutFallbackTour: false,
        hasCompletedWorkoutTour: false,
        createdAt: new Date(),
        backfilled: true,
      };
      await setDoc(userDocRef, defaults, { merge: true });
      return new NextResponse(
        JSON.stringify({ data: defaults }),
        { status: 200 }
      );
    }

    return new NextResponse(
      JSON.stringify({ data: snapshot.data() }),
      { status: 200 }
    );
  } catch (error: any) {
    return new NextResponse(
      JSON.stringify({
        message: "An error occured while fetching the user profile",
        error: error.message,
      }),
      { status: 500 }
    );
  }
};

export const DELETE = async (request: Request) => {
  try {
    const { searchParams } = new URL(request.url);
    const userid = searchParams.get("userid");

    if (!userid) {
      return new NextResponse(
        JSON.stringify({ message: "Missing userid" }),
        { status: 400 }
      );
    }

    const userDocRef = doc(db, "Users", userid);
    await deleteDoc(userDocRef);

    return new NextResponse(
      JSON.stringify({ message: "Profile deleted" }),
      { status: 200 }
    );
  } catch (error: any) {
    return new NextResponse(
      JSON.stringify({
        message: "An error occured while deleting the user profile",
        error: error.message,
      }),
      { status: 500 }
    );
  }
};

export const PATCH = async (request: Request) => {
  try {
    const body = await request.json();
    const { userid, updates } = body as {
      userid?: string;
      updates?: Record<string, boolean>;
    };

    if (!userid || !updates || typeof updates !== "object") {
      return new NextResponse(
        JSON.stringify({ message: "Missing userid or updates" }),
        { status: 400 }
      );
    }

    const safeUpdates: Record<string, boolean> = {};
    for (const [key, value] of Object.entries(updates)) {
      if (ONBOARDING_FIELDS.has(key) && typeof value === "boolean") {
        safeUpdates[key] = value;
      }
    }

    if (Object.keys(safeUpdates).length === 0) {
      return new NextResponse(
        JSON.stringify({ message: "No valid fields to update" }),
        { status: 400 }
      );
    }

    const userDocRef = doc(db, "Users", userid);
    await setDoc(userDocRef, safeUpdates, { merge: true });

    return new NextResponse(
      JSON.stringify({ message: "Profile updated", data: safeUpdates }),
      { status: 200 }
    );
  } catch (error: any) {
    return new NextResponse(
      JSON.stringify({
        message: "An error occured while updating the user profile",
        error: error.message,
      }),
      { status: 500 }
    );
  }
};
