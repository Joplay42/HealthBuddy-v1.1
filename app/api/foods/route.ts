import { client } from "@/config/algolia";
import { db } from "@/config/firebase";
import { foodProps } from "@/types";
import { deleteDoc, doc, getDoc, setDoc } from "firebase/firestore";
import { NextResponse } from "next/server";

export const GET = async (request: Request) => {
  try {
    // The new searchParams
    const { searchParams } = new URL(request.url);
    // If the search term is more than one word
    const searchTerms = searchParams.get("search")?.toLowerCase();

    // If no search term is provided produce an error
    if (!searchTerms) {
      return new NextResponse(
        JSON.stringify({ message: "Search term is required" }),
        { status: 400 }
      );
    }
    // Use Algolia to search through the database
    const res = (await client.search({
      requests: [
        {
          indexName: "FoodApi",
          query: searchTerms,
        },
      ],
    })) as { results: { hits: foodProps[] }[] };

    const foodList = res.results[0].hits.filter(
      (item) => item.Pending === undefined
    );

    // Manage if no result is found
    if (foodList.length === 0) {
      return new NextResponse(JSON.stringify({ message: "No result found" }), {
        status: 404,
      });
    }

    // Return a Json response to the client
    return new NextResponse(JSON.stringify(foodList), { status: 200 });

    // Catch any errors
  } catch (error: any) {
    // Display an error message
    return new NextResponse(
      JSON.stringify({
        message: "Error in fetching the food items",
        error: error.message,
      }),
      { status: 500 }
    );
  }
};

export const DELETE = async (request: Request) => {
  // Handling the errors
  try {
    // The new searchParams
    const { searchParams } = new URL(request.url);
    // If the search term is more than one word
    const deleteId = searchParams.get("del");

    if (!deleteId) {
      return new NextResponse(
        JSON.stringify({ message: "An id is required" }),
        { status: 400 }
      );
    }

    const docRef = doc(db, "FoodApiCollection", deleteId);
    // Delete the doc
    await deleteDoc(docRef);
    // Return a response
    return NextResponse.json(
      { message: "Item deleted successfully" },
      { status: 200 }
    );
  } catch (error: any) {
    // Display the error and the response status
    return new NextResponse("Error in deleting the food item" + error.message, {
      status: 500,
    });
  }
};

export const PATCH = async (request: Request) => {
  try {
    // Get the searchParams
    const { searchParams } = new URL(request.url);
    // Get the id
    const updateId = searchParams.get("id");

    // Error handling
    if (!updateId) {
      return new NextResponse(
        JSON.stringify({ message: "An id must be provided" }),
        { status: 400 }
      );
    }

    // Get the firestore doc
    const docRef = doc(db, "FoodApiCollection", updateId);
    const data = await getDoc(docRef);

    // Handle if no item has been found
    if (!data.data()) {
      return new NextResponse(
        JSON.stringify({ message: "No item has been found with this id" }),
        { status: 404 }
      );
    }

    // Get the updated Item
    const body = await request.json();

    // Error handling
    if (!body || Object.keys(body).length === 0) {
      return new NextResponse(
        JSON.stringify({ message: "Invalid update data" }),
        { status: 400 }
      );
    }

    // update the data
    await setDoc(docRef, body, { merge: true });

    return new NextResponse(
      JSON.stringify({ message: "Food item updated succesfully" }),
      { status: 200 }
    );
  } catch (error: any) {
    // Display the error and response status
    return new NextResponse("Error in updating the food item" + error.message, {
      status: 500,
    });
  }
};
