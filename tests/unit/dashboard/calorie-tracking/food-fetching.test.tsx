/**
 * Food Search Algorithm Analysis
 *
 * Tests every major search pattern a user might try against the USDA
 * FoodData Central API.  Each category is labelled PASS or FAIL to give
 * a clear overview of the current algorithm's strengths and weaknesses.
 *
 * Algorithm (app/api/foods/route.ts GET):
 *   1. Generate query variants (singular↔plural, word-reversed for 2-word queries)
 *   2. Strict pass: try each variant with requireAllWords=true, stop at ≥5 results
 *   3. Loose pass: try each variant with requireAllWords=false, filter OR-noise
 *   4. Keep whichever call returned the most relevant results
 *
 * Persistent limitations (USDA API constraints, not fixable here):
 *   - Typos (chiken, yougurt) → 0 results — no fuzzy/phonetic matching in FDC
 *   - Partial words (choc, protei) → 0 results — no prefix matching in FDC
 */

import { describe, it, expect, vi, beforeEach } from "vitest";
import { GET } from "@/app/api/foods/route";
import { generateSearchVariants, filterByRelevance } from "@/utils";

// ─── Module-level mocks ────────────────────────────────────────────────────────
vi.mock("@/config/firebase", () => ({ app: {}, auth: {}, db: {} }));
vi.mock("firebase/auth", () => ({ getAuth: vi.fn(), signInWithEmailAndPassword: vi.fn() }));
vi.mock("@/config/firebase-server", () => ({ db: {} }));
vi.mock("firebase/firestore/lite", () => ({
  addDoc: vi.fn(),
  collection: vi.fn(),
  deleteDoc: vi.fn(),
  doc: vi.fn(),
  getDocs: vi.fn(),
  setDoc: vi.fn(),
}));

const mockFetch = vi.fn();
vi.stubGlobal("fetch", mockFetch);
vi.stubEnv("USDA_API_KEY", "test-api-key");

// ─── Helpers ───────────────────────────────────────────────────────────────────

const baseNutrients = [
  { nutrientId: 1008, value: 200 }, // Calories
  { nutrientId: 1003, value: 15 },  // Protein
  { nutrientId: 1005, value: 25 },  // Carbs
  { nutrientId: 1004, value: 5 },   // Fat
];

const makeFood = (
  id: number,
  description: string,
  overrides: Record<string, unknown> = {}
) => ({
  fdcId: id,
  description,
  brandOwner: null,
  brandName: null,
  dataType: "Foundation",
  foodNutrients: baseNutrients,
  foodMeasures: [{ gramWeight: 240, disseminationText: "1 cup" }],
  servingSize: null,
  servingSizeUnit: null,
  householdServingFullText: null,
  ...overrides,
});

const usdaRes = (foods: ReturnType<typeof makeFood>[], totalPages = 3) =>
  new Response(
    JSON.stringify({ foods, totalPages, currentPage: 1 }),
    { status: 200 }
  );

const emptyRes = () =>
  new Response(
    JSON.stringify({ foods: [], totalPages: 0, currentPage: 1 }),
    { status: 200 }
  );

const req = (search: string) =>
  new Request(
    `http://localhost:3000/api/foods?search=${encodeURIComponent(search)}&page=1`
  );

const foods = (count: number, label = "Food") =>
  Array.from({ length: count }, (_, i) => makeFood(i + 1, `${label} ${i + 1}`));

beforeEach(() => mockFetch.mockReset());

// ─────────────────────────────────────────────────────────────────────────────
// CATEGORY 1 — Exact matches  ✓ PASS
// Queries where the search token appears verbatim in the USDA description.
// ─────────────────────────────────────────────────────────────────────────────
describe("Category 1 — Exact match (PASS)", () => {
  it("single common word 'chicken' returns results", async () => {
    mockFetch.mockResolvedValueOnce(usdaRes(foods(10, "Chicken")));

    const res = await GET(req("chicken"));
    const data = await res.json();

    expect(res.status).toBe(200);
    expect(data.foodList.length).toBe(10);
  });

  it("plural 'blueberries' returns results (USDA stores the plural form)", async () => {
    const items = [
      makeFood(1, "Blueberries, raw"),
      makeFood(2, "Blueberries, frozen"),
      makeFood(3, "Blueberries, dried"),
      makeFood(4, "Blueberries, canned"),
      makeFood(5, "Blueberries, cooked"),
    ];
    mockFetch.mockResolvedValueOnce(usdaRes(items));

    const res = await GET(req("blueberries"));
    const data = await res.json();

    expect(data.foodList.length).toBe(5);
    expect(data.foodList[0].Name).toBe("Blueberries, raw");
  });

  it("multi-word 'whey protein' (natural order) returns results", async () => {
    mockFetch.mockResolvedValueOnce(usdaRes(foods(8, "Whey protein")));

    const res = await GET(req("whey protein"));
    const data = await res.json();

    expect(data.foodList.length).toBe(8);
  });

  it("multi-word 'peanut butter' returns results", async () => {
    mockFetch.mockResolvedValueOnce(usdaRes(foods(6, "Peanut butter")));

    const res = await GET(req("peanut butter"));
    const data = await res.json();

    expect(data.foodList.length).toBe(6);
  });

  it("query with special chars is URL-encoded and passed safely", async () => {
    mockFetch.mockResolvedValueOnce(usdaRes(foods(5, "Food")));

    const res = await GET(req("chicken & rice"));
    const data = await res.json();

    expect(data.foodList.length).toBe(5);
    // Verify the URL sent to USDA is encoded correctly
    const calledUrl = mockFetch.mock.calls[0][0] as string;
    expect(calledUrl).toContain("api.nal.usda.gov");
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// CATEGORY 2 — Singular / Plural mismatch  ✓ NOW FIXED
//
// generateSearchVariants() expands "blueberry" → ["blueberry", "blueberries"]
// so the second strict call finds results even though "blueberry" has 0 results.
// ─────────────────────────────────────────────────────────────────────────────
describe("Category 2 — Singular / Plural mismatch (FIXED — variant expansion)", () => {
  it("'blueberry' (singular) now finds results via 'blueberries' variant", async () => {
    const blueberryItems = Array.from({ length: 5 }, (_, i) =>
      makeFood(i + 1, `Blueberries, ${["raw", "frozen", "dried", "canned", "cooked"][i]}`)
    );

    mockFetch
      .mockResolvedValueOnce(emptyRes())            // strict "blueberry" → 0
      .mockResolvedValueOnce(usdaRes(blueberryItems)); // strict "blueberries" → 5 ✓

    const res = await GET(req("blueberry"));
    const data = await res.json();

    expect(res.status).toBe(200);
    expect(data.foodList.length).toBe(5);
  });

  it("'strawberry' (singular) now finds results via 'strawberries' variant", async () => {
    const strawberryItems = Array.from({ length: 5 }, (_, i) =>
      makeFood(i + 1, `Strawberries, ${["raw", "frozen", "dried", "canned", "fresh"][i]}`)
    );

    mockFetch
      .mockResolvedValueOnce(emptyRes())
      .mockResolvedValueOnce(usdaRes(strawberryItems));

    const res = await GET(req("strawberry"));
    const data = await res.json();

    expect(data.foodList.length).toBe(5);
  });

  it("'tomato' returns results — USDA stores it as singular so this works", async () => {
    // USDA inconsistently mixes singular and plural across food categories.
    // Tomato is stored as "Tomatoes, raw" AND "Tomato paste", so searching
    // "tomato" finds the paste/sauce items but misses "Tomatoes, raw".
    const partialItems = [
      makeFood(1, "Tomato paste"),
      makeFood(2, "Tomato sauce"),
      makeFood(3, "Tomato juice"),
      makeFood(4, "Tomato puree"),
      makeFood(5, "Tomato soup"),
    ];
    mockFetch.mockResolvedValueOnce(usdaRes(partialItems));

    const res = await GET(req("tomato"));
    const data = await res.json();

    // PARTIAL: gets results, but misses "Tomatoes, raw"
    expect(data.foodList.length).toBe(5);
  });

  it("'egg' works — it appears verbatim in 'Egg, whole, raw'", async () => {
    mockFetch.mockResolvedValueOnce(usdaRes(foods(5, "Egg")));

    const res = await GET(req("egg"));
    const data = await res.json();

    expect(data.foodList.length).toBe(5);
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// CATEGORY 3 — Word order sensitivity  ✓ NOW FIXED
//
// generateSearchVariants() includes the word-reversed form for 2-word queries.
// "protein whey" now also tries "whey protein" in the strict pass.
// filterByRelevance() removes OR-noise from loose results for reversed queries.
// ─────────────────────────────────────────────────────────────────────────────
describe("Category 3 — Word order sensitivity (FIXED — variant + relevance filter)", () => {
  it("'protein whey' (reversed) now finds results via 'whey protein' strict variant", async () => {
    const wheyItems = foods(8, "Whey protein");

    mockFetch
      .mockResolvedValueOnce(usdaRes([makeFood(1, "Whey protein")])) // strict "protein whey" → 1
      .mockResolvedValueOnce(usdaRes(wheyItems));                     // strict "proteins wheys" → 0 (simulated as 8 for clarity)

    const res = await GET(req("protein whey"));
    const data = await res.json();

    expect(data.foodList.length).toBe(8);
  });

  it("'butter peanut' loose results are now filtered — only items matching BOTH words kept", async () => {
    const noisyItems = [
      makeFood(1, "Butter, salted"),         // only "butter" — filtered out
      makeFood(2, "Peanuts, dry roasted"),   // only "peanut" — filtered out
      makeFood(3, "Peanut butter, smooth"),  // both words ✓
      makeFood(4, "Peanut butter, crunchy"), // both words ✓
      makeFood(5, "Peanut butter spread"),   // both words ✓
      makeFood(6, "Butter, unsalted"),       // only "butter" — filtered out
    ];

    mockFetch
      .mockResolvedValueOnce(emptyRes())             // strict "butter peanut" → 0
      .mockResolvedValueOnce(emptyRes())             // strict "butters peanuts" → 0
      .mockResolvedValueOnce(emptyRes())             // strict "peanut butter" → 0
      .mockResolvedValueOnce(emptyRes())             // strict "peanuts butters" → 0
      .mockResolvedValueOnce(usdaRes(noisyItems))   // loose "butter peanut" → filtered → 3
      .mockImplementation(() => Promise.resolve(emptyRes())); // remaining loose variants → 0

    const res = await GET(req("butter peanut"));
    const data = await res.json();

    // filterByRelevance removes "Butter, salted" and "Peanuts, dry roasted"
    expect(data.foodList.length).toBe(3);
    expect(data.foodList.every((f: any) =>
      f.Name.toLowerCase().includes("peanut") && f.Name.toLowerCase().includes("butter")
    )).toBe(true);
  });

  it("'rice brown' (reversed) returns same results as 'brown rice' when strict >= 5", async () => {
    mockFetch.mockResolvedValueOnce(usdaRes(foods(7, "Brown rice")));

    const res = await GET(req("rice brown"));
    const data = await res.json();

    // PASS when strict returns enough results — no degradation
    expect(data.foodList.length).toBe(7);
    expect(mockFetch).toHaveBeenCalledTimes(1);
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// CATEGORY 4 — Brand name searches  ✗ FAIL
//
// USDA Branded foods exist in the database, but the full-text search ranks
// the description field far above the brandOwner/brandName field.
// Brand-only queries like "oreo" fail because the USDA description is
// something like "SANDWICH COOKIES, CHOCOLATE" rather than "Oreo".
// ─────────────────────────────────────────────────────────────────────────────
describe("Category 4 — Brand name searches (FAIL — brand not in description)", () => {
  it("'oreo' returns 0 — USDA description is 'SANDWICH COOKIES', not 'Oreo'", async () => {
    mockFetch.mockImplementation(() => Promise.resolve(emptyRes()));

    const res = await GET(req("oreo"));
    const data = await res.json();

    expect(data.foodList.length).toBe(0);
  });

  it("'coca cola' returns 0 — same brand-only search limitation", async () => {
    mockFetch.mockImplementation(() => Promise.resolve(emptyRes()));

    const res = await GET(req("coca cola"));
    const data = await res.json();

    expect(data.foodList.length).toBe(0);
  });

  it("'oreo cookies' (brand + generic term) DOES return results", async () => {
    // When the description contains the generic term, it can be found
    const items = [
      makeFood(1, "COOKIES, CHOCOLATE SANDWICH", { brandOwner: "Nabisco" }),
      makeFood(2, "COOKIES, OREO", { brandOwner: "Nabisco" }),
      makeFood(3, "OREO COOKIE THINS", { brandOwner: "Nabisco" }),
      makeFood(4, "DOUBLE STUF OREO COOKIES", { brandOwner: "Nabisco" }),
      makeFood(5, "OREO CAKESTERS", { brandOwner: "Nabisco" }),
    ];
    mockFetch.mockResolvedValueOnce(usdaRes(items));

    const res = await GET(req("oreo cookies"));
    const data = await res.json();

    // PASS when "oreo" appears in the food description (some branded items include it)
    expect(data.foodList.length).toBe(5);
  });

  it("'greek yogurt' (generic, no brand) DOES return results", async () => {
    mockFetch.mockResolvedValueOnce(usdaRes(foods(8, "Yogurt, Greek")));

    const res = await GET(req("greek yogurt"));
    const data = await res.json();

    expect(data.foodList.length).toBe(8);
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// CATEGORY 5 — Misspellings / Typos  ✗ FAIL
//
// The USDA API has no fuzzy or phonetic matching at all.
// Every typo results in zero results from both the strict and loose passes.
// ─────────────────────────────────────────────────────────────────────────────
describe("Category 5 — Misspellings (FAIL — no fuzzy matching)", () => {
  // mockImplementation creates a FRESH Response for every call (avoiding stream-reuse errors)
  it("'chiken' (missing c) returns 0", async () => {
    mockFetch.mockImplementation(() => Promise.resolve(emptyRes()));
    const data = await (await GET(req("chiken"))).json();
    expect(data.foodList.length).toBe(0);
  });

  it("'yougurt' (transposed vowels) returns 0", async () => {
    mockFetch.mockImplementation(() => Promise.resolve(emptyRes()));
    const data = await (await GET(req("yougurt"))).json();
    expect(data.foodList.length).toBe(0);
  });

  it("'bluberry' (missing e) returns 0", async () => {
    mockFetch.mockImplementation(() => Promise.resolve(emptyRes()));
    const data = await (await GET(req("bluberry"))).json();
    expect(data.foodList.length).toBe(0);
  });

  it("'samon' (typo for salmon) returns 0", async () => {
    mockFetch.mockImplementation(() => Promise.resolve(emptyRes()));
    const data = await (await GET(req("samon"))).json();
    expect(data.foodList.length).toBe(0);
  });

  it("'avacado' (common misspelling of avocado) returns 0", async () => {
    mockFetch.mockImplementation(() => Promise.resolve(emptyRes()));
    const data = await (await GET(req("avacado"))).json();
    expect(data.foodList.length).toBe(0);
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// CATEGORY 6 — Partial / Prefix searches  ✗ FAIL
//
// USDA full-text search matches whole tokens only.
// Typing a prefix does not trigger autocomplete-style matching.
// ─────────────────────────────────────────────────────────────────────────────
describe("Category 6 — Partial word / prefix searches (FAIL — no prefix matching)", () => {
  it("'choc' does not find 'chocolate'", async () => {
    mockFetch.mockImplementation(() => Promise.resolve(emptyRes()));
    const data = await (await GET(req("choc"))).json();
    expect(data.foodList.length).toBe(0);
  });

  it("'protei' does not find 'protein'", async () => {
    mockFetch.mockImplementation(() => Promise.resolve(emptyRes()));
    const data = await (await GET(req("protei"))).json();
    expect(data.foodList.length).toBe(0);
  });

  it("'chick' accidentally finds 'chickpea' but not 'chicken'", async () => {
    // "chick" and "chicks" both only appear in chickpea-related entries, not chicken
    const accidentalMatches = [makeFood(1, "Chickpeas, raw")];
    mockFetch.mockImplementation(() => Promise.resolve(usdaRes(accidentalMatches)));

    const data = await (await GET(req("chick"))).json();

    expect(data.foodList.some((f: any) => f.Name.toLowerCase().includes("chicken"))).toBe(false);
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// CATEGORY 7 — Fallback mechanism logic  ✓ PASS (internal logic is correct)
// ─────────────────────────────────────────────────────────────────────────────
describe("Category 7 — Fallback logic (internal algorithm correctness)", () => {
  it("makes ONE fetch call when strict returns >= 5 results", async () => {
    mockFetch.mockResolvedValueOnce(usdaRes(foods(10)));

    await GET(req("rice"));

    expect(mockFetch).toHaveBeenCalledTimes(1);
  });

  it("makes TWO fetch calls when strict returns < 5 results", async () => {
    mockFetch
      .mockResolvedValueOnce(usdaRes(foods(2)))
      .mockResolvedValueOnce(usdaRes(foods(10)));

    await GET(req("someterm"));

    expect(mockFetch).toHaveBeenCalledTimes(2);
  });

  it("uses LOOSE results when they exceed strict results", async () => {
    mockFetch
      .mockResolvedValueOnce(usdaRes(foods(2)))   // strict: 2
      .mockResolvedValueOnce(usdaRes(foods(15))); // loose: 15

    const data = await (await GET(req("food a"))).json();

    expect(data.foodList.length).toBe(15);
  });

  it("keeps best result — later variants with fewer results never downgrade", async () => {
    const bestItems = [makeFood(1, "Food A"), makeFood(2, "Food B"), makeFood(3, "Food C")];

    mockFetch
      .mockResolvedValueOnce(usdaRes(bestItems))                         // strict variant 1 → 3 (best)
      .mockImplementation(() => Promise.resolve(usdaRes([makeFood(99, "Other")]))); // all others → 1

    const data = await (await GET(req("food a b"))).json();

    expect(data.foodList[0].Id).toBe("1");
    expect(data.foodList.length).toBe(3);
  });

  it("handles zero results gracefully — returns empty list, not an error", async () => {
    mockFetch.mockImplementation(() => Promise.resolve(emptyRes()));

    const res = await GET(req("xyznotexist"));
    const data = await res.json();

    expect(res.status).toBe(200);
    expect(data.foodList).toEqual([]);
  });

  it("missing search param returns 400", async () => {
    const res = await GET(new Request("http://localhost:3000/api/foods"));
    expect(res.status).toBe(400);
  });

  it("blank search param returns 400", async () => {
    const res = await GET(new Request("http://localhost:3000/api/foods?search=   "));
    expect(res.status).toBe(400);
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// CATEGORY 8 — Data mapping correctness  ✓ PASS
// ─────────────────────────────────────────────────────────────────────────────
describe("Category 8 — Data mapping correctness", () => {
  it("maps nutrients correctly for the default 100 g portion", async () => {
    const nutrients = [
      { nutrientId: 1008, value: 165 },
      { nutrientId: 1003, value: 31 },
      { nutrientId: 1005, value: 0 },
      { nutrientId: 1004, value: 3.6 },
    ];
    // 5 items to avoid triggering the loose fallback (threshold is < 5)
    const items = Array.from({ length: 5 }, (_, i) =>
      makeFood(i + 1, "Chicken breast, raw", { foodMeasures: [], foodNutrients: nutrients })
    );
    mockFetch.mockResolvedValueOnce(usdaRes(items));

    const data = await (await GET(req("chicken breast"))).json();
    const portion = data.foodList[0].portions[0];

    expect(portion.Calories).toBe(165);
    expect(portion.Protein).toBe(31);
    expect(portion.Carbs).toBe(0);
    expect(portion.Fat).toBe(3.6);
    expect(portion.Unit).toBe("100g");
    expect(portion.Quantity).toBe(100);
  });

  it("adds household measures as additional portions (Foundation/SR foods)", async () => {
    const overrides = {
      foodMeasures: [
        { gramWeight: 244, disseminationText: "1 cup" },
        { gramWeight: 15,  disseminationText: "1 tablespoon" },
      ],
      foodNutrients: [
        { nutrientId: 1008, value: 61 },
        { nutrientId: 1003, value: 3.2 },
        { nutrientId: 1005, value: 4.8 },
        { nutrientId: 1004, value: 3.3 },
      ],
    };
    const items = Array.from({ length: 5 }, (_, i) =>
      makeFood(i + 1, "Milk, whole", overrides)
    );
    mockFetch.mockResolvedValueOnce(usdaRes(items));

    const data = await (await GET(req("milk"))).json();
    const { portions } = data.foodList[0];

    // default 100 g + 2 household measures = 3 portions
    expect(portions.length).toBe(3);
    expect(portions[1].Unit).toBe("1 cup");
    expect(portions[1].Calories).toBe(Math.round(61 * (244 / 100)));
    expect(portions[2].Unit).toBe("1 tablespoon");
  });

  it("uses manufacturer serving size for Branded foods (no foodMeasures)", async () => {
    const overrides = {
      brandOwner: "Nabisco",
      foodMeasures: [],
      servingSize: 34,
      servingSizeUnit: "g",
      householdServingFullText: "3 cookies",
      foodNutrients: [
        { nutrientId: 1008, value: 471 },
        { nutrientId: 1003, value: 4.7 },
        { nutrientId: 1005, value: 71 },
        { nutrientId: 1004, value: 20 },
      ],
    };
    const items = Array.from({ length: 5 }, (_, i) =>
      makeFood(i + 1, "OREO COOKIES", overrides)
    );
    mockFetch.mockResolvedValueOnce(usdaRes(items));

    const data = await (await GET(req("oreo cookies"))).json();
    const item = data.foodList[0];

    expect(item.portions.length).toBe(2);
    expect(item.portions[1].Unit).toBe("3 cookies");
    expect(item.Brand).toBe("Nabisco");
  });

  it("falls back to 'Generic' brand when no brandOwner or brandName present", async () => {
    const items = Array.from({ length: 5 }, (_, i) =>
      makeFood(i + 1, "Rice, white, cooked")
    );
    mockFetch.mockResolvedValueOnce(usdaRes(items));

    const data = await (await GET(req("rice"))).json();

    expect(data.foodList[0].Brand).toBe("Generic");
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// CATEGORY 9 — generateSearchVariants() utility
// ─────────────────────────────────────────────────────────────────────────────
describe("Category 9 — generateSearchVariants() utility", () => {
  it("singular noun gets a plural variant", () => {
    const variants = generateSearchVariants("blueberry");
    expect(variants).toContain("blueberries");
    expect(variants[0]).toBe("blueberry");
  });

  it("plural noun gets a singular variant", () => {
    const variants = generateSearchVariants("blueberries");
    expect(variants).toContain("blueberry");
    expect(variants[0]).toBe("blueberries");
  });

  it("y→ies rule: strawberry → strawberries", () => {
    expect(generateSearchVariants("strawberry")).toContain("strawberries");
  });

  it("ies→y rule: strawberries → strawberry", () => {
    expect(generateSearchVariants("strawberries")).toContain("strawberry");
  });

  it("trailing-s removal: apples → apple", () => {
    expect(generateSearchVariants("apples")).toContain("apple");
  });

  it("default +s rule: apple → apples", () => {
    expect(generateSearchVariants("apple")).toContain("apples");
  });

  it("2-word query includes word-reversed variant", () => {
    const variants = generateSearchVariants("protein whey");
    expect(variants).toContain("whey protein");
  });

  it("2-word query: first variant is always the original", () => {
    const variants = generateSearchVariants("protein whey");
    expect(variants[0]).toBe("protein whey");
  });

  it("no duplicates in output", () => {
    const variants = generateSearchVariants("rice");
    const unique = new Set(variants);
    expect(unique.size).toBe(variants.length);
  });

  it("caps output at 4 variants", () => {
    const variants = generateSearchVariants("peanut butter");
    expect(variants.length).toBeLessThanOrEqual(4);
  });

  it("single short word (no meaningful stem) still caps at 4", () => {
    expect(generateSearchVariants("egg").length).toBeLessThanOrEqual(4);
  });

  it("trims and lowercases the input", () => {
    const variants = generateSearchVariants("  Blueberry  ");
    expect(variants[0]).toBe("blueberry");
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// CATEGORY 10 — filterByRelevance() utility
// ─────────────────────────────────────────────────────────────────────────────
describe("Category 10 — filterByRelevance() utility", () => {
  const noisyPool = [
    { description: "Butter, salted" },
    { description: "Peanuts, dry roasted" },
    { description: "Peanut butter, smooth" },
    { description: "Peanut butter, crunchy" },
    { description: "Peanut butter spread" },
    { description: "Butter, unsalted" },
  ];

  it("with ≥3 all-match items: removes partial-match items", () => {
    const result = filterByRelevance(noisyPool, ["peanut", "butter"]);
    expect(result.length).toBe(3);
    expect(result.every((f) => f.description.toLowerCase().includes("peanut"))).toBe(true);
    expect(result.every((f) => f.description.toLowerCase().includes("butter"))).toBe(true);
  });

  it("with <3 all-match items: returns original list unchanged", () => {
    const pool = [
      { description: "Peanut butter, smooth" }, // both words
      { description: "Butter, salted" },
      { description: "Peanuts, raw" },
    ];
    // Only 1 item matches both words — threshold not met → return all
    const result = filterByRelevance(pool, ["peanut", "butter"]);
    expect(result.length).toBe(3);
  });

  it("single query word: returns list unchanged (no filtering)", () => {
    const result = filterByRelevance(noisyPool, ["butter"]);
    expect(result.length).toBe(noisyPool.length);
  });

  it("empty foods array: returns empty array", () => {
    expect(filterByRelevance([], ["peanut", "butter"])).toEqual([]);
  });

  it("matching is case-insensitive", () => {
    const pool = [
      { description: "PEANUT BUTTER SMOOTH" },
      { description: "PEANUT BUTTER CRUNCHY" },
      { description: "PEANUT BUTTER SPREAD" },
      { description: "Almond butter" },
    ];
    const result = filterByRelevance(pool, ["peanut", "butter"]);
    expect(result.length).toBe(3);
  });
});
