import { db } from "@/config/firebase";
import { foodItemFetchedProps, foodItemProps, foodProps } from "@/types";
import { addDoc, collection, deleteDoc, doc, setDoc } from "firebase/firestore";
import { NextResponse } from "next/server";

export const GET = async (request: Request) => {
  try {
    // The new searchParams
    const { searchParams } = new URL(request.url);

    // Get the searchterm
    const search = searchParams.get("search")?.toLowerCase();
    // Get the page numbers
    const page = Number(searchParams.get("page")) || 1;
    // Get the nextUrl
    const url = searchParams.get("url");

    // If no search term is provided produce an error
    if (!search) {
      return new NextResponse(
        JSON.stringify({ message: "Search term is required" }),
        { status: 400 }
      );
    }
    // The url
    let fetchUrl = url;
    if (!fetchUrl) {
      fetchUrl = `https://api.edamam.com/api/food-database/v2/parser?app_id=${process.env.NEXT_PUBLIC_APPID}&app_key=${process.env.NEXT_PUBLIC_API_KEY}&ingr=${search}`;
    }

    // Fetch the api
    const res = await fetch(fetchUrl);

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
        Id: food.foodId,
        Name: food.label,
        Brand: food.Brand || "Generic food",
        portions,
      };
    });

    return new NextResponse(
      JSON.stringify({
        foodList,
        count: data.count,
        nextUrl: data._links?.next?.href ?? null,
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
    const body: foodProps = await request.json();
    const {
      Name,
      Brand,
      Quantity,
      Unit,
      Calories,
      Carbs,
      Protein,
      Fat,
    }: foodProps = body;

    // Error handling
    if (!body || Object.keys(body).length === 0) {
      return new NextResponse(JSON.stringify({ message: "Invalid data" }), {
        status: 400,
      });
    }

    // Check if some attributes are missing
    if (
      !Name ||
      !Brand ||
      !Quantity ||
      !Unit ||
      !Calories ||
      !Carbs ||
      !Protein ||
      !Fat
    ) {
      return new NextResponse(
        JSON.stringify({
          message: "Missing object attribute",
        }),
        { status: 400 }
      );
    }

    // Create a new object to databases
    const userFoodsRef = doc(db, "UserFoods", UserId);
    const foodsListRef = collection(userFoodsRef, "foodList");

    // Create the new recipe object
    const foodData: foodProps = {
      Brand,
      Name,
      Quantity,
      Unit,
      Calories,
      Carbs,
      Protein,
      Fat,
    };

    // Set the doc with the recipe
    const newDoc = await addDoc(foodsListRef, foodData);
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
        message: "Ërror posting the food",
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
    const docRef = doc(db, "UserFoods", userId, "foodList", deleteId);
    await deleteDoc(docRef);

    // Return a response
    return NextResponse.json(
      { message: "Food deleted successfully" },
      { status: 200 }
    );
  } catch (error: any) {
    // Error message
    return new NextResponse(
      JSON.stringify({
        message: "Ërror deleting the food",
        error: error.message,
      }),
      { status: 500 }
    );
  }
};
