import { db } from "@/config/firebase";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  setDoc,
  Timestamp,
} from "firebase/firestore";
import { NextResponse } from "next/server";

export const GET = async (request: Request) => {
  // Error handling
  try {
    // The new searchParams
    const { searchParams } = new URL(request.url);
    // Get the userid
    const userId = searchParams.get("userid");

    // Get the recipe id
    const id = searchParams.get("id");

    // handle null values
    if (!userId) {
      return new NextResponse(
        JSON.stringify({
          message: "Missing parameters",
        }),
        { status: 422 }
      );
    }

    if (id) {
      // Get the firestore doc
      const userWeightRef = doc(db, "UserWeights", userId, "weightList", id);

      // Get the doc
      const dataSnap = await getDoc(userWeightRef);

      if (!dataSnap.data()) {
        return new NextResponse(
          JSON.stringify({
            message: `No weight has been found of the id : ${id}`,
          }),
          { status: 404 }
        );
      } else {
        const docData = dataSnap.data();

        // Convert raw timestamp to JS Date
        let dateObj: Date | null = null;
        if (docData?.date?.seconds !== undefined) {
          dateObj = new Date(docData.date.seconds * 1000); // convert seconds → ms
        }

        // Return the doc
        return new NextResponse(
          JSON.stringify({
            message: "Document has been found",
            data: {
              ...docData,
              date: dateObj, // JS Date object
            },
          }),
          { status: 200 }
        );
      }
    } else {
      // Get the firestore doc
      const userWeightRef = doc(db, "UserWeights", userId);
      const weightListRef = collection(userWeightRef, "weightList");

      const querySnapshot = await getDocs(weightListRef);

      const data = querySnapshot.docs.map((doc) => {
        const docData = doc.data();

        let dateObj: Date | null = null;

        if (docData.date?.seconds !== undefined) {
          dateObj = new Date(docData.date.seconds * 1000);
        }

        return {
          ...docData,
          date: dateObj,
        };
      });

      // Handle null values
      if (!data.length) {
        return new NextResponse(
          JSON.stringify({
            message: `No weights has been found for the user ${userId}`,
          }),
          { status: 404 }
        );
      }

      // Return the doc
      return new NextResponse(
        JSON.stringify({
          message: "Documents has been found",
          data,
        }),
        { status: 200 }
      );
    }
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

    // Get the body
    const body = await request.json();

    // Error handling
    if (!body || Object.keys(body).length === 0) {
      return new NextResponse(JSON.stringify({ message: "Invalid data" }), {
        status: 400,
      });
    }

    const { number, date } = body;

    // Check any missing attribute
    if (!number || !date) {
      return new NextResponse(
        JSON.stringify({
          error: "Missing object attribute",
        }),
        { status: 400 }
      );
    }

    // Create a new object to databases
    const userWeightRef = doc(db, "UserWeights", userId);
    const userWeightlistRef = collection(userWeightRef, "weightList");

    // Set the doc with the recipe
    const newDoc = await addDoc(userWeightlistRef, body);
    // Set the docId
    await setDoc(newDoc, { Id: newDoc.id }, { merge: true });

    // Return success message
    return new NextResponse(
      JSON.stringify({
        message: "weight has been added",
        data: body,
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
    // Get the user id
    const userId = searchParams.get("userid");
    // Get the weight id
    const weightId = searchParams.get("id");

    // handle null values
    if (!userId || !weightId) {
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

    const { number, date } = body;

    // Check any missing attribute
    if (!number || !date) {
      return new NextResponse(
        JSON.stringify({
          message: "Missing object attribute",
        }),
        { status: 400 }
      );
    }

    // Get the doc
    const docRef = doc(db, "UserWeights", userId, "weightList", weightId);

    // Update the doc
    const updateWeight = await setDoc(docRef, {
      Id: weightId,
      number,
      date,
    });

    // Return success message
    return new NextResponse(
      JSON.stringify({
        message: "weight has been updated",
        data: body,
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
    // Get the recipe id
    const deleteId = searchParams.get("del");

    if (!userId) {
      return new NextResponse(
        JSON.stringify({ message: "A userId is required" }),
        { status: 400 }
      );
    }

    // Delete specific weight
    if (deleteId) {
      // Delete the user weight
      const docRef = doc(db, "UserWeights", userId, "weightList", deleteId);
      await deleteDoc(docRef);
    } else {
      // Get the firestore doc
      const recipesRef = collection(db, "UserWeights", userId, "weightList");

      // Store the data for validation
      const querySnapshot = await getDocs(recipesRef);

      const deletions = querySnapshot.docs.map((docSnap) =>
        deleteDoc(docSnap.ref)
      );

      await Promise.all(deletions);
    }

    // Return a response
    return NextResponse.json(
      { message: "Weight deleted successfully" },
      { status: 200 }
    );
  } catch (error: any) {
    // Error message
    return new NextResponse(
      JSON.stringify({
        message: "Ërror deleting the weight",
        error: error.message,
      }),
      { status: 500 }
    );
  }
};
