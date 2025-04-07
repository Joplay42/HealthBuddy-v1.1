import axios from "axios";
import { db } from "@/config/firebase";
import { writeBatch, doc, collection } from "firebase/firestore";
import { foodProps } from "@/types";

// Your USDA Food API endpoint and key
const USDA_API_URL = "https://api.nal.usda.gov/fdc/v1/foods/search";
const USDA_API_KEY = process.env.NEXT_PUBLIC_API_KEY; // Replace with your actual USDA API key

type Nutrient = {
  nutrientName: string;
  value: number;
};

// Large food array list (keep your full list of food items here)
const foodItems = [
  "Water",
  "Sparkling water",
  "Coconut water",
  "Lemonade",
  "Iced tea",
  "Green tea",
  "Black tea",
  "Herbal tea",
  "Fruit juice (orange, apple, grape)",
  "Vegetable juice (carrot, beetroot)",
  "Energy drinks",
  "Sports drinks (Gatorade, Powerade)",
  "Soy milk",
  "Almond milk",
  "Oat milk",
  "Rice milk",
  "Kefir",
  "Iced coffee",
  "Hot coffee",
  "Latte",
  "Cappuccino",
  "Espresso",
  "Cold brew coffee",
  "Milkshakes",
  "Mocktails",
  "Wine",
  "Beer",
  "Whiskey",
  "Vodka",
  "Rum",
  "Tequila",
  "Gin",
  "Champagne",
  "Cocktails (Mojito, Margarita, Martini)",
  "Liqueurs (Baileys, Kahlúa)",
  "Chocolate bars (Milk, Dark, White)",
  "Gummy bears",
  "Candy corn",
  "Lollipops",
  "Jelly beans",
  "Marshmallows",
  "Licorice",
  "Toffee",
  "Fudge",
  "Caramel candies",
  "Candy canes",
  "Hard candies (Lemon drops, Jolly Ranchers)",
  "Cotton candy",
  "Chocolates (Truffles, Bonbons)",
  "Chocolate-covered nuts",
  "Chocolate-covered raisins",
  "Peanut brittle",
  "Taffy",
  "Fruit snacks",
  "Gummy worms",
  "Sugar-free candy",
  "Ghirardelli chocolates",
  "Hershey's Kisses",
  "Reese's Peanut Butter Cups",
  "M&Ms",
  "Snickers bars",
  "Twix",
  "Kit Kat",
  "Milky Way",
  "Starburst",
  "Skittles",
  "Sour Patch Kids",
  "Mentos",
  "Tic Tacs",
  "Gum (Wrigley's, Orbit)",
  "Jolly Rancher lollipops",
  "Werther's Original",
  "Cadbury Dairy Milk",
  "Nestlé Crunch",
  "Twizzlers",
  "Butterfinger",
  "Almond Joy",
  "PayDay",
  "3 Musketeers",
  "Peanut M&Ms",
  "Pop Rocks",
  "Chocolate-covered pretzels",
  "Coconut candy",
  "Fruity gummies (Haribo, Trolli)",
  "Bread (whole wheat, white, rye)",
  "Bagels",
  "Croissants",
  "Donuts",
  "Muffins (blueberry, chocolate chip, bran)",
  "Pastries (danish, cinnamon rolls)",
  "Cookies (chocolate chip, oatmeal, sugar)",
  "Pies (apple, pumpkin, cherry)",
  "Tarts",
  "Brownies",
  "Cupcakes",
  "Scones",
  "Brioche",
  "Pita bread",
  "Focaccia",
  "Baguette",
  "Pizza dough",
  "Flatbreads",
  "Pretzels",
  "English muffins",
  "Rolls (dinner rolls, hamburger buns)",
  "Pound cake",
  "Shortbread",
  "Gingerbread",
  "Zucchini bread",
  "Banana bread",
  "Carrot cake",
  "Cheesecake",
  "Baklava",
];

export const seedData = async () => {
  const foodCollection = collection(db, "FoodApiCollection"); // 'foods' is your Firestore collection
  let batch = writeBatch(db); // Start a batch operation

  const batchSize = 500; // Firestore batch limit: 500 operations per batch
  let operationCount = 0;

  try {
    // Loop through the food items and seed 50 times for each food
    for (const foodName of foodItems) {
      let retries = 0;
      let foods = [];

      // Attempt to fetch valid foods up to 3 times (if the first one fails)
      while (retries < 3) {
        foods = await fetchFoodsBySearchTerm(foodName);

        // If we get valid data (not empty or undefined), proceed with the loop
        if (foods.length > 0) break;

        console.warn(
          `No food found for ${foodName}. Retrying... (${retries + 1})`
        );
        retries++;
      }

      // Seed 50 items of each type (ensure we have 50 unique food items)
      for (let i = 0; i < 30; i++) {
        const food = foods[i % foods.length]; // Loop over the list if not enough items

        // Check if food is undefined or invalid
        if (!food) {
          console.warn(`Skipping undefined food for search term: ${foodName}`);
          continue; // Skip this iteration if food is undefined
        }

        // Log the food name and wait for 2 seconds
        console.log(`Processing: ${foodName}`);
        await sleep(10); // Wait 2 seconds for better readability

        // Use defaults or safe checks to prevent undefined values
        const foodDescription = food.description || "Unknown";
        const foodBrand = food.brandName || "Unknown";
        const foodQuantity = food.servingSize || 100; // Default to 100g if no serving size
        const foodUnit = food.servingSizeUnit || "g"; // Default to "g" if no unit provided

        // Handle missing nutrient values gracefully
        const calories = getNutrientValue(food.foodNutrients, "Energy");
        const protein = getNutrientValue(food.foodNutrients, "Protein");
        const carbs = getNutrientValue(
          food.foodNutrients,
          "Carbohydrate, by difference"
        );
        const fat = getNutrientValue(food.foodNutrients, "Total lipid (fat)");

        // Create the object for Firestore following your foodProps type
        const foodData: foodProps = {
          Name: foodDescription,
          Brand: foodBrand,
          Quantity: foodQuantity,
          Unit: foodUnit,
          Calories: calories,
          Protein: protein,
          Carbs: carbs,
          Fat: fat,
        };

        // Create a reference to the document in the collection using `doc()`
        const docRef = doc(foodCollection); // `doc()` creates a reference without needing to add it first

        // Add the write operation to the batch
        batch.set(docRef, foodData);
        operationCount++;

        // Commit the batch if we've reached the batch size limit (500 operations)
        if (operationCount >= batchSize) {
          await batch.commit();
          console.log("Batch committed!");
          operationCount = 0;
          batch = writeBatch(db);
        }
      }
    }

    // Commit any remaining operations if they're less than the batch size
    if (operationCount > 0) {
      await batch.commit();
      console.log("Remaining batch committed!");
    }

    console.log("Seeding complete!");
  } catch (error) {
    console.error("Error fetching data from USDA API:", error);
  }
};

// Helper function to extract nutrient value from food data
const getNutrientValue = (
  nutrients: Nutrient[],
  nutrientName: string
): number => {
  const nutrient = nutrients.find(
    (n: Nutrient) => n.nutrientName === nutrientName
  );
  return nutrient ? nutrient.value : 0; // Default to 0 if nutrient is not found
};

// Fetch foods by search term and retry if no data found
const fetchFoodsBySearchTerm = async (term: string) => {
  try {
    const randomPage = Math.floor(Math.random() * 10) + 1; // Random page number between 1 and 10

    const response = await axios.get(USDA_API_URL, {
      params: {
        query: term, // Search term
        pageSize: 30, // Fetch 30 items for testing
        pageNumber: randomPage, // Use random page number between 1 and 10
        api_key: USDA_API_KEY,
      },
    });

    return response.data.foods;
  } catch (error) {
    console.error("Error fetching food data for search term:", term, error);
    return [];
  }
};

// Sleep function to add delay in the script
const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
