import { db } from "@/config/firebase-server";
import { foodItemFetchedProps, foodItemProps, foodProps } from "@/types";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  setDoc,
} from "firebase/firestore/lite";
import { NextResponse } from "next/server";

export const GET = async (request: Request) => {
  try {
    const { searchParams } = new URL(request.url);
    const search = searchParams.get("search");
    const page = Number(searchParams.get("page")) || 1;

    if (!search) {
      return new NextResponse(
        JSON.stringify({ message: "Search term is required" }),
        { status: 400 }
      );
    }

    const fetchUrl = `https://api.nal.usda.gov/fdc/v1/foods/search?query=${encodeURIComponent(search)}&api_key=${process.env.USDA_API_KEY}&pageSize=20&pageNumber=${page}`;

    const res = await fetch(fetchUrl);
    const data = await res.json();

    const getNutrient = (nutrients: any[], id: number): number =>
      nutrients.find((n: any) => n.nutrientId === id)?.value || 0;

    const calcPortion = (
      cal100: number,
      pro100: number,
      carb100: number,
      fat100: number,
      gramWeight: number,
      label: string
    ) => {
      const ratio = gramWeight / 100;
      return {
        Quantity: gramWeight,
        Unit: label,
        Calories: Math.round(cal100 * ratio),
        Protein: parseFloat((pro100 * ratio).toFixed(2)),
        Carbs: parseFloat((carb100 * ratio).toFixed(2)),
        Fat: parseFloat((fat100 * ratio).toFixed(2)),
      };
    };

    const foodList: foodItemFetchedProps[] = (data.foods ?? []).map((food: any) => {
      const cal100 = getNutrient(food.foodNutrients, 1008);
      const pro100 = getNutrient(food.foodNutrients, 1003);
      const carb100 = getNutrient(food.foodNutrients, 1005);
      const fat100 = getNutrient(food.foodNutrients, 1004);

      const portions: foodItemFetchedProps["portions"] = [
        calcPortion(cal100, pro100, carb100, fat100, 100, "100g"),
      ];

      // Foundation/SR Legacy foods include household measures (1 cup, 1 slice, 1 medium, etc.)
      if (food.foodMeasures && food.foodMeasures.length > 0) {
        for (const measure of food.foodMeasures) {
          if (measure.gramWeight > 0) {
            const label =
              measure.disseminationText ||
              measure.portionDescription ||
              `${measure.gramWeight}g`;
            portions.push(calcPortion(cal100, pro100, carb100, fat100, measure.gramWeight, label));
          }
        }
      } else if (food.servingSize && food.servingSizeUnit) {
        // Branded foods: use manufacturer serving size
        const label =
          food.householdServingFullText ||
          `${food.servingSize} ${food.servingSizeUnit}`;
        portions.push(calcPortion(cal100, pro100, carb100, fat100, food.servingSize, label));
      }

      return {
        Id: String(food.fdcId),
        Name: food.description,
        Brand: food.brandOwner || food.brandName || "Generic",
        portions,
      };
    });

    return new NextResponse(
      JSON.stringify({
        foodList,
        totalPages: data.totalPages ?? 1,
        currentPage: data.currentPage ?? 1,
      }),
      { status: 200 }
    );
  } catch (error: any) {
    return new NextResponse(
      JSON.stringify({
        message: "Error fetching food items",
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

    if (!deleteId) {
      return new NextResponse(JSON.stringify({ message: "Missing 'del' parameter" }), { status: 400 });
    }

    if (!userId) {
      return new NextResponse(
        JSON.stringify({ message: "A userId is required" }),
        { status: 400 }
      );
    }

    // Delete specific doc
    if (deleteId) {
      // Delete the user recipes
      const docRef = doc(db, "UserFoods", userId, "foodList", deleteId);
      await deleteDoc(docRef);
    } else {
      // Get the firestore doc
      const recipesRef = collection(db, "UserFoods", userId, "foodList");

      // Store the data for validation
      const querySnapshot = await getDocs(recipesRef);

      const deletions = querySnapshot.docs.map((docSnap) =>
        deleteDoc(docSnap.ref)
      );

      await Promise.all(deletions);
    }

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
