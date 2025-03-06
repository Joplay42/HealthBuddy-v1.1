import { db } from "@/config/firebase";
import { foodProps } from "@/types";
import { collection, doc, setDoc, writeBatch } from "firebase/firestore";

const NUTRIEN_IDS = { Calories: 1008, Protein: 1003, Carbs: 1005, Fat: 1004 };

const extractNutrient = (nutrients: any[], nutrientId: number) => {
  const nutrient = nutrients.find((n) => n.nutrientId === nutrientId);
  return nutrient ? nutrient.value : 0;
};

const filterValidFood = (foods: foodProps[]): foodProps[] => {
  return foods.filter((food) => {
    // Ensure none of the required fields are null or undefined
    const isValid =
      food.Name !== null &&
      food.Name !== undefined &&
      food.Brand !== null &&
      food.Brand !== undefined &&
      food.Quantity !== null &&
      food.Quantity !== undefined &&
      food.Unit !== null &&
      food.Unit !== undefined &&
      food.Calories !== null &&
      food.Calories !== undefined &&
      food.Protein !== null &&
      food.Protein !== undefined &&
      food.Carbs !== null &&
      food.Carbs !== undefined &&
      food.Fat !== null &&
      food.Fat !== undefined;

    return isValid;
  });
};

export const writeToFirestoreWithRandomIds = async (
  validFoods: foodProps[]
) => {
  const chunkSize = 100; // Max number of items per batch
  const collectionRef = collection(db, "FoodApiCollection"); // Reference to the "foods" collection

  try {
    // Loop through the validFoods array in chunks of size 100
    for (let i = 0; i < validFoods.length; i += chunkSize) {
      const chunk = validFoods.slice(i, i + chunkSize);
      const batch = writeBatch(db); // Create a new batch for each chunk

      // For each food item in the chunk, create a document with a random ID and add it to the batch
      chunk.forEach((foodItem) => {
        const docRef = doc(collectionRef); // Firestore generates a random ID automatically
        const foodWithId = { ...foodItem, Id: docRef.id }; // Add the docId attribute
        batch.set(docRef, foodWithId); // Add the food item to the batch
      });

      // Commit the batch after processing each chunk
      await batch.commit();
      console.log(`Batch ${i / chunkSize + 1} committed to Firestore.`);
    }
  } catch (error) {
    console.error("Error writing to Firestore:", error);
  }
};

export const fetchDataFromApi = async (searchTerms: string[]) => {
  const api_key = process.env.NEXT_PUBLIC_API_KEY;
  let allFoods: foodProps[] = []; // This will hold the full, flat list

  try {
    // Loop through the search terms
    for (let term of searchTerms) {
      console.log("Searching for " + term);

      let currentPage = 1;
      let totalPages = 1;
      let fetchedResults = 0;

      while (currentPage <= totalPages && fetchedResults < 10) {
        const res = await fetch(
          `https://api.nal.usda.gov/fdc/v1/foods/search?api_key=${api_key}&query=${term}&pageSize=100&pageNumber=${currentPage}`
        );

        const data = await res.json();

        if (!data.foods || !Array.isArray(data.foods)) {
          throw new Error(`Invalid response structure for term: ${term}`);
        }

        // Map the fetched results to a simpler structure and directly add to the allFoods array
        const mappedData = data.foods.map((item: any) => {
          return {
            Name: item.description?.toLowerCase() || "unknown",
            Brand: item.brandName?.toLowerCase() || "unknown",
            Quantity: item.servingSize || "100",
            Unit: item.servingSizeUnit?.toLowerCase() || "g",
            Calories: extractNutrient(item.foodNutrients, NUTRIEN_IDS.Calories),
            Protein: extractNutrient(item.foodNutrients, NUTRIEN_IDS.Protein),
            Carbs: extractNutrient(item.foodNutrients, NUTRIEN_IDS.Carbs),
            Fat: extractNutrient(item.foodNutrients, NUTRIEN_IDS.Fat),
          };
        });

        // Add only up to 10 items from the current page, making sure total fetched is capped at 10
        const newFoods = mappedData.slice(0, 10 - fetchedResults);
        allFoods = [...allFoods, ...newFoods];
        fetchedResults += newFoods.length;

        // If we've fetched 10 items, break out of the loop
        if (fetchedResults >= 10) {
          break;
        }

        // Update pagination values
        currentPage = data.currentPage + 1; // Move to the next page
        totalPages = data.totalPages; // Track the total number of pages
      }
    }

    // Filter out invalid data and return the final array
    const validFoods = filterValidFood(allFoods);
    return validFoods;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};
