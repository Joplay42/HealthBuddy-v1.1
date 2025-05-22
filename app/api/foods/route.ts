import { client } from "@/config/algolia";
import { db } from "@/config/firebase";
import { Algoliahit, foodProps } from "@/types";
import { capitalize } from "@/utils";
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

    // Fetch the api
    const res = await fetch(
      `https://api.edamam.com/api/food-database/v2/parser?app_id=${process.env.NEXT_PUBLIC_APPID}&app_key=${process.env.NEXT_PUBLIC_API_KEY}&ingr=${searchTerms}`,
      {
        method: "GET",
      }
    );

    // Get the data
    const data = await res.json();

    // Parse the data
    const foodList: foodProps[] = data.hints.map((item: any) => {
      const food = item.food;
      const nutrients = food.nutrients;

      return {
        Id: food.foodId,
        Name: food.label,
        Brand: food.brand || "Generic food",
        Quantity: food.servingSizes?.[0].quantity || "100",
        Unit: food.servingSizes?.[0].label || "g",
        Calories: Math.round(nutrients.ENERC_KCAL || 0),
        Protein: parseFloat((nutrients.PROCNT || 0).toFixed(2)),
        Carbs: parseFloat((nutrients.CHOCDF || 0).toFixed(2)),
        Fat: parseFloat((nutrients.FAT || 0).toFixed(2)),
      };
    });

    return new NextResponse(
      JSON.stringify({
        foodList,
      }),
      { status: 200 }
    );

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
