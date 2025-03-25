import { db } from "@/config/firebase";
import { recipeProps } from "@/types";
import { addDoc, collection, doc, setDoc } from "firebase/firestore";
import { NextResponse } from "next/server";
import macro from "styled-jsx/macro";

export const POST = async (request: Request) => {
  // Error handling
  try {
    // Get the body request
    const body: recipeProps = await request.json();
    const { UserId, Name, NbServing, foods, macronutrients }: recipeProps =
      body;

    // Error handling
    if (!body || Object.keys(body).length === 0) {
      return new NextResponse(JSON.stringify({ message: "Invalid data" }), {
        status: 400,
      });
    }

    // Check if some attributes are missing
    if (
      !UserId ||
      !Name ||
      !NbServing ||
      !foods ||
      !macronutrients ||
      foods.length === 0 ||
      Object.keys(macronutrients).length === 0
    ) {
      return new NextResponse(
        JSON.stringify({
          message: "Missing object attribute",
        }),
        { status: 400 }
      );
    }

    // Create a new object to databases
    const userRecipesRef = doc(db, "UserRecipes", UserId);
    const recipesListRef = collection(userRecipesRef, "recipesList");
    // Set the doc with the recipe
    await addDoc(recipesListRef, {
      UserId: UserId,
      Brand: "Homemade",
      Name: Name,
      Quantity: 1,
      Unit: "portion",
      Calories: Math.round(macronutrients.Calories / NbServing),
      Protein: Math.round(macronutrients.Protein / NbServing),
      Carbs: Math.round(macronutrients.Carbs / NbServing),
      Fat: Math.round(macronutrients.Fat / NbServing),
    });

    return NextResponse.json(
      { message: "Item has beens added to the database" },
      { status: 200 }
    );
  } catch (error: any) {
    // Error message
    return new NextResponse(
      JSON.stringify({
        message: "Ërror posting the item",
        error: error.message,
      }),
      { status: 500 }
    );
  }
};
