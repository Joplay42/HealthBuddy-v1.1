import { Pending } from "@/components";
import { db } from "@/config/firebase";
import {
  addDoc,
  collection,
  deleteField,
  doc,
  getDoc,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { NextResponse } from "next/server";

export const PATCH = async (request: Request) => {
  // Error handling
  try {
    // Get the searchParams
    const { searchParams } = new URL(request.url);
    // Get the doc Id
    const updateId = searchParams.get("id");

    // Handle if there is no id
    if (!updateId) {
      return new NextResponse(
        JSON.stringify({ message: "An id must be provided" }),
        { status: 400 }
      );
    }

    // Get the firestore doc
    const docRef = doc(db, "FoodApiCollection", updateId);
    const data = await getDoc(docRef);

    // Handle no doc found
    if (!data.data()) {
      return new NextResponse(
        JSON.stringify({ message: "No item with this id has been found" }),
        { status: 404 }
      );
    } else {
      // Handle the update
      const updatedItem = updateDoc(docRef, {
        Pending: deleteField(),
      });

      return NextResponse.json(
        { message: "item updated succesfully" },
        { status: 200 }
      );
    }
  } catch (error: any) {
    // display error message
    return new NextResponse(
      JSON.stringify({
        message: "Error fetching the items",
        error: error.message,
      }),
      { status: 500 }
    );
  }
};

export const POST = async (request: Request) => {
  // Error handling
  try {
    // Get the updated Item
    const body = await request.json();
    const { Name, Brand, Quantity, Unit, Calories, Protein, Carbs, Fat } = body;

    // Error handling
    if (!body || Object.keys(body).length === 0) {
      return new NextResponse(JSON.stringify({ message: "Invalid data" }), {
        status: 400,
      });
    }

    // Check any missing attribute
    if (!Name || !Brand || !Quantity || !Unit || !Calories) {
      return new NextResponse(
        JSON.stringify({
          message: "Missing object attribute",
        }),
        { status: 400 }
      );
    }

    // The collection ref in firestore
    const collectionRef = collection(db, "FoodApiCollection");
    // Add the object to the database
    const newDoc = await addDoc(collectionRef, {
      Brand: Brand,
      Name: Name,
      Quantity: Quantity,
      Unit: Unit,
      Calories: Calories,
      Protein: Protein,
      Carbs: Carbs,
      Fat: Fat,
    });
    // Set the id and pending attributes
    await setDoc(
      newDoc,
      {
        Id: newDoc.id,
        Pending: true,
      },
      { merge: true }
    );

    return new NextResponse(
      JSON.stringify({
        message: "The item has been stored in the databse",
      }),
      { status: 200 }
    );
  } catch (error: any) {
    // display error message
    return new NextResponse(
      JSON.stringify({
        message: "Error creating the object",
        error: error.message,
      }),
      { status: 500 }
    );
  }
};
