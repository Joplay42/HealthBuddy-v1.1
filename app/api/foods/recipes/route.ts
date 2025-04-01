import { db } from "@/config/firebase";
import { foodProps, macronutrients, recipeProps } from "@/types";
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
    // Get the user id
    const userId = searchParams.get("userid");
    // Get the recipe id
    const recipeId = searchParams.get("id");

    if (!recipeId || !userId) {
      return NextResponse.json(
        { message: "Missing parameter" },
        { status: 400 }
      );
    }

    // Get the docs
    const docRef = doc(db, "UserRecipes", userId, "recipesList", recipeId);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
      return NextResponse.json(
        { message: "Recipes object has not been found" },
        { status: 404 }
      );
    }

    const recipe = docSnap.data();

    return new NextResponse(JSON.stringify(recipe), { status: 200 });
  } catch (error: any) {
    // Error message
    return new NextResponse(
      JSON.stringify({
        message: "Ërror posting the recipe",
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
    const UserId = searchParams.get("userid");

    if (!UserId) {
      return new NextResponse(
        JSON.stringify({ message: "Missing parameter" }),
        {
          status: 400,
        }
      );
    }

    // Get the body request
    const body: recipeProps = await request.json();
    const { Name, NbServing, foods, macronutrients }: recipeProps = body;

    // Error handling
    if (!body || Object.keys(body).length === 0) {
      return new NextResponse(JSON.stringify({ message: "Invalid data" }), {
        status: 400,
      });
    }

    // Check if some attributes are missing
    if (
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

    // Filter the foods object
    const filteredFoods: foodProps[] = foods.map(
      ({
        Id,
        multiplier,
        Name,
        Brand,
        Quantity,
        Unit,
        Calories,
        Protein,
        Carbs,
        Fat,
      }) => ({
        Id,
        multiplier,
        Name,
        Brand,
        Quantity,
        Unit,
        Calories,
        Protein,
        Carbs,
        Fat,
      })
    );

    // Filter the macronutrients
    const filteredMacros: macronutrients = {
      Calories: macronutrients.Calories,
      Protein: macronutrients.Protein,
      Carbs: macronutrients.Carbs,
      Fat: macronutrients.Fat,
    };

    // Create the new recipe object
    const recipeData: recipeProps = {
      UserId,
      Name,
      NbServing,
      foods: filteredFoods,
      macronutrients: filteredMacros,
    };

    // Set the doc with the recipe
    const newDoc = await addDoc(recipesListRef, recipeData);
    // Set the docId
    await setDoc(newDoc, { Id: newDoc.id }, { merge: true });

    return NextResponse.json(
      { message: "Item has beens added to the database" },
      { status: 200 }
    );
  } catch (error: any) {
    // Error message
    return new NextResponse(
      JSON.stringify({
        message: "Ërror posting the recipe",
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

    if (!deleteId || !userId) {
      return new NextResponse(
        JSON.stringify({ message: "A userId and objectId is required" }),
        { status: 400 }
      );
    }

    // Delete the user recipes
    const docRef = doc(db, "UserRecipes", userId, "recipesList", deleteId);
    await deleteDoc(docRef);

    // Return a response
    return NextResponse.json(
      { message: "Recipe deleted successfully" },
      { status: 200 }
    );
  } catch (error: any) {
    // Error message
    return new NextResponse(
      JSON.stringify({
        message: "Ërror deleting the recipe",
        error: error.message,
      }),
      { status: 500 }
    );
  }
};

export const PATCH = async (request: Request) => {
  try {
    // The new searchParams
    const { searchParams } = new URL(request.url);
    // Get the user id
    const userId = searchParams.get("userid");
    // Get the recipe id
    const recipeId = searchParams.get("id");

    // Handle null values
    if (!recipeId || !userId) {
      return new NextResponse(
        JSON.stringify({ message: "Missing parameters" }),
        { status: 400 }
      );
    }

    // Get the body request
    const body: recipeProps = await request.json();
    const { UserId, Name, NbServing, foods, macronutrients }: recipeProps =
      body;

    // Filter the foods object
    const filteredFoods: foodProps[] = foods.map(
      ({
        Id,
        multiplier,
        Name,
        Brand,
        Quantity,
        Unit,
        Calories,
        Protein,
        Carbs,
        Fat,
      }) => ({
        Id,
        multiplier,
        Name,
        Brand,
        Quantity,
        Unit,
        Calories,
        Protein,
        Carbs,
        Fat,
      })
    );

    // Get the doc
    const docRef = doc(db, "UserRecipes", userId, "recipesList", recipeId);

    // Update the doc
    const updatedFood = await setDoc(
      docRef,
      {
        Name,
        NbServing,
        foods: filteredFoods,
        macronutrients,
      },
      { merge: true }
    );

    // Return a response
    return NextResponse.json(
      { message: "Recipe updated successfully" },
      { status: 200 }
    );
  } catch (error: any) {
    // Error message
    return new NextResponse(
      JSON.stringify({
        message: "Ërror updating the recipe",
        error: error.message,
      }),
      { status: 500 }
    );
  }
};
