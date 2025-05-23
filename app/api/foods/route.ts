import { client } from "@/config/algolia";
import { db } from "@/config/firebase";
import { Algoliahit, foodItemFetchedProps, foodProps } from "@/types";
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
    const foodList: foodItemFetchedProps[] = data.hints.map((item: any) => {
      // Store food and nutrients
      const food = item.food;
      const nutrients = food.nutrients;

      // Calculate nutrients per grams
      const caloriesPerGram = (nutrients.ENERC_KCAL || 0) / 100;
      const proteinPerGram = (nutrients.PROCNT || 0) / 100;
      const carbsPerGram = (nutrients.CHOCDF || 0) / 100;
      const fatPerGram = (nutrients.FAT || 0) / 100;

      // Mapping the portion sizes
      const portions = item.measures.map((measure: any) => {
        // Store the weight of each measure
        const weight = measure.weight;

        // Return the portions
        return {
          Quantity: parseFloat(weight.toFixed(2)),
          Unit: measure.label,
          Calories: Math.round(caloriesPerGram * weight),
          Protein: parseFloat((proteinPerGram * weight).toFixed(2)),
          Carbs: parseFloat((carbsPerGram * weight).toFixed(2)),
          Fat: parseFloat((fatPerGram * weight).toFixed(2)),
        };
      });

      // Return the entire food object
      return {
        Name: food.label,
        Brand: food.Brand || "Generic food",
        portions,
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
