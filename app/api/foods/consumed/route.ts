import { db } from "@/config/firebase";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  writeBatch,
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
    const userConsumedFoodRef = doc(db, "UserConsumedFood", userId);
    const foodListRef = collection(userConsumedFoodRef, "foodList");

    const querySnapshot = await getDocs(foodListRef);

    const data = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    // Handle null values
    if (!data.length) {
      return new NextResponse(
        JSON.stringify({
          message: `No consumed food has been found for the user ${userId}`,
        }),
        { status: 404 }
      );
    }

    // Return the doc
    return new NextResponse(
      JSON.stringify({
        message: "Document has been found",
        data,
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
    const userConsumedFoodRef = doc(db, "UserConsumedFood", userId);
    const foodListRef = collection(userConsumedFoodRef, "foodList");

    // Store the data for validation
    const querySnapshot = await getDocs(foodListRef);

    // Handle null values
    if (querySnapshot.empty) {
      return new NextResponse(
        JSON.stringify({
          message: `No consumed food has been found for the user ${userId}`,
        }),
        { status: 404 }
      );
    }

    const data = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    // Delete the docs
    const batch = writeBatch(db);

    querySnapshot.forEach((document) => {
      batch.delete(
        doc(db, "UserConsumedFood", userId, "foodList", document.id)
      );
    });

    await batch.commit();

    // Return the doc
    return new NextResponse(
      JSON.stringify({
        message: "Document has been deleted",
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
