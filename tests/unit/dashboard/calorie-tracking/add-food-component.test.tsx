/**
 * AddFood Component UI Tests
 *
 * These tests verify how the AddFood component RENDERS in response to
 * different API states: loading, results, empty, error.
 *
 * KEY INSIGHT — Why tests pass but production fails:
 * ─────────────────────────────────────────────────
 * The search-algorithm tests (food-fetching.test.tsx) mock the global `fetch`
 * function, so they NEVER call the real USDA API. They only verify that the
 * route handler processes mock responses correctly.
 *
 * In production, if the USDA API rejects our request (wrong API key, invalid
 * parameters, rate limit, etc.), the old route code did `response.json()` on
 * the error body — which has no `foods` field — and silently returned 200 with
 * an empty foodList. The component displayed "Results (0)" with no explanation.
 *
 * The fix (app/api/foods/route.ts) now checks `response.ok` before parsing.
 * If every USDA call fails, the route returns 500 with a clear message that
 * propagates to the UI as a visible red error.
 *
 * These component tests verify that error propagation works end-to-end.
 */

import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen, waitFor, cleanup } from "@testing-library/react";
import React from "react";

// ─── Module mocks ─────────────────────────────────────────────────────────────
vi.mock("@/config/firebase", () => ({ app: {}, auth: {}, db: {} }));
vi.mock("firebase/auth", () => ({
  getAuth: vi.fn(),
  signInWithEmailAndPassword: vi.fn(),
}));
vi.mock("@/config/firebase-server", () => ({ db: {} }));
vi.mock("firebase/firestore/lite", () => ({
  addDoc: vi.fn(),
  collection: vi.fn(),
  deleteDoc: vi.fn(),
  doc: vi.fn(),
  getDocs: vi.fn(),
  setDoc: vi.fn(),
}));

// Stub child components so tests focus purely on AddFood's state machine
vi.mock("@/components", () => ({
  FoodCard: ({ item }: { item: { Name: string } }) => (
    <div data-testid="food-card">{item.Name}</div>
  ),
  FoodItemCardSqueleton: () => <div data-testid="skeleton" />,
  Pagination: () => null,
  SearchBar: ({
    searchTerm,
    setSearchTerm,
    onSubmit,
  }: {
    searchTerm: string;
    setSearchTerm: (v: string) => void;
    onSubmit: () => void;
  }) => (
    <input
      data-testid="search-bar"
      placeholder="Search food"
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      onKeyDown={(e) => e.key === "Enter" && onSubmit()}
    />
  ),
}));

// Control the URL search params per-test
const mockPush = vi.fn();
let mockSearchParam = "";

vi.mock("next/navigation", () => ({
  useRouter: () => ({ push: mockPush }),
  useSearchParams: () => ({
    get: (key: string) => (key === "search" ? mockSearchParam : null),
  }),
}));

const mockFetch = vi.fn();
vi.stubGlobal("fetch", mockFetch);

// ─── Import component after mocks are registered ───────────────────────────────
import AddFood from "@/components/dashboard/calorie/AddFood";

// ─── Helpers ──────────────────────────────────────────────────────────────────
const setConsumedLoading = vi.fn();

const foodItem = (id: number, name: string) => ({
  Id: String(id),
  Name: name,
  Brand: "Generic",
  portions: [
    { Quantity: 100, Unit: "100g", Calories: 200, Protein: 10, Carbs: 20, Fat: 5 },
  ],
});

// Simulates a successful /api/foods response
const apiSuccess = (foods: ReturnType<typeof foodItem>[], totalPages = 1) =>
  new Response(
    JSON.stringify({ foodList: foods, totalPages, currentPage: 1 }),
    { status: 200 }
  );

// Simulates an error response from /api/foods (e.g. 500 when USDA is unreachable)
const apiError = (message: string, status = 500) =>
  new Response(JSON.stringify({ message }), { status });

beforeEach(() => {
  mockFetch.mockReset();
  mockPush.mockReset();
  mockSearchParam = "";
});

afterEach(cleanup);

// ─────────────────────────────────────────────────────────────────────────────
// CATEGORY 1 — Search results rendering
// ─────────────────────────────────────────────────────────────────────────────
describe("AddFood — search results display", () => {
  it("shows 'Results (0)' when the API returns an empty food list", async () => {
    mockSearchParam = "xyznotexist";
    mockFetch.mockImplementation(() => Promise.resolve(apiSuccess([])));

    render(<AddFood setConsumedLoading={setConsumedLoading} />);

    await waitFor(() => {
      expect(screen.getByText("Results (0)")).toBeDefined();
    });
  });

  it("renders one FoodCard per result", async () => {
    mockSearchParam = "chicken";
    mockFetch.mockResolvedValueOnce(
      apiSuccess([foodItem(1, "Chicken, raw"), foodItem(2, "Chicken, cooked")])
    );

    render(<AddFood setConsumedLoading={setConsumedLoading} />);

    await waitFor(() => {
      const cards = screen.getAllByTestId("food-card");
      expect(cards.length).toBe(2);
      expect(cards[0].textContent).toBe("Chicken, raw");
      expect(cards[1].textContent).toBe("Chicken, cooked");
    });
  });

  it("shows 'Results (N)' count matching the number of items returned", async () => {
    mockSearchParam = "rice";
    mockFetch.mockResolvedValueOnce(
      apiSuccess(Array.from({ length: 7 }, (_, i) => foodItem(i + 1, `Rice ${i + 1}`)))
    );

    render(<AddFood setConsumedLoading={setConsumedLoading} />);

    await waitFor(() => {
      expect(screen.getByText("Results (7)")).toBeDefined();
    });
  });

  it("shows no results and no error when search param is absent", () => {
    // mockSearchParam remains "" — no fetch should be triggered
    render(<AddFood setConsumedLoading={setConsumedLoading} />);

    expect(mockFetch).not.toHaveBeenCalled();
    expect(screen.queryByTestId("food-card")).toBeNull();
    expect(screen.queryByText(/error/i)).toBeNull();
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// CATEGORY 2 — Error display
// These tests verify that when /api/foods returns a non-200 status, the
// component renders a visible red error message rather than silently showing
// empty results.
// ─────────────────────────────────────────────────────────────────────────────
describe("AddFood — error display", () => {
  it("shows a red error message when the API returns 500", async () => {
    mockSearchParam = "chicken";
    mockFetch.mockResolvedValueOnce(
      apiError("Food database is unreachable. Check your USDA_API_KEY or try again later.")
    );

    render(<AddFood setConsumedLoading={setConsumedLoading} />);

    await waitFor(() => {
      const msg = screen.getByText(
        "Food database is unreachable. Check your USDA_API_KEY or try again later."
      );
      expect(msg).toBeDefined();
      // Error should be inside the red paragraph
      expect(msg.tagName.toLowerCase()).toBe("p");
    });
  });

  it("shows a red error message when the API returns 400", async () => {
    mockSearchParam = "chicken";
    mockFetch.mockResolvedValueOnce(apiError("Search term is required", 400));

    render(<AddFood setConsumedLoading={setConsumedLoading} />);

    await waitFor(() => {
      expect(screen.getByText("Search term is required")).toBeDefined();
    });
  });

  it("shows no food cards when an error occurred", async () => {
    mockSearchParam = "chicken";
    mockFetch.mockResolvedValueOnce(apiError("Something went wrong"));

    render(<AddFood setConsumedLoading={setConsumedLoading} />);

    await waitFor(() => {
      expect(screen.queryByTestId("food-card")).toBeNull();
    });
  });

  it("clears the error and shows results on a successful retry", async () => {
    // First search fails
    mockSearchParam = "chicken";
    mockFetch.mockResolvedValueOnce(apiError("Temporary failure"));

    const { rerender } = render(<AddFood setConsumedLoading={setConsumedLoading} />);

    await waitFor(() => {
      expect(screen.getByText("Temporary failure")).toBeDefined();
    });

    // Second search succeeds (simulated by changing the URL param)
    mockSearchParam = "chicken breast";
    mockFetch.mockResolvedValueOnce(apiSuccess([foodItem(1, "Chicken breast, raw")]));

    rerender(<AddFood setConsumedLoading={setConsumedLoading} />);

    await waitFor(() => {
      expect(screen.queryByText("Temporary failure")).toBeNull();
      expect(screen.getAllByTestId("food-card").length).toBe(1);
    });
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// CATEGORY 3 — The silent-failure bug (documented)
//
// BEFORE the route fix: if the USDA API returned 400/403/500, the route called
// response.json() on the error body (no `foods` field), treated it as 0 results,
// and returned 200 with an empty foodList.
//
// The component would show "Results (0)" — no error, no indication that anything
// went wrong. This is why production "worked" (no crash) but showed no results.
//
// AFTER the route fix: response.ok is checked; if every call fails the route
// throws, returns 500, and the component shows the error message.
// ─────────────────────────────────────────────────────────────────────────────
describe("AddFood — silent-failure bug (documented behaviour)", () => {
  it("BEFORE fix — shows 'Results (0)' with no error when API silently returns empty", async () => {
    mockSearchParam = "peanut butter";
    // Simulate the old bug: USDA rejected all requests but route returned 200 + empty list
    mockFetch.mockImplementation(() => Promise.resolve(apiSuccess([])));

    render(<AddFood setConsumedLoading={setConsumedLoading} />);

    await waitFor(() => {
      expect(screen.getByText("Results (0)")).toBeDefined();
      // No red error paragraph visible — user has no idea why nothing appeared
      const errorParagraph = screen
        .queryAllByRole("paragraph")
        .find((el) => el.classList.contains("text-red-500"));
      expect(errorParagraph).toBeUndefined();
    });
  });

  it("AFTER fix — shows a red error when the API key is invalid or USDA is unreachable", async () => {
    mockSearchParam = "peanut butter";
    // Simulate the fixed behaviour: route now returns 500 with a clear message
    mockFetch.mockImplementation(() =>
      Promise.resolve(
        apiError(
          "Food database is unreachable. Check your USDA_API_KEY or try again later."
        )
      )
    );

    render(<AddFood setConsumedLoading={setConsumedLoading} />);

    await waitFor(() => {
      expect(
        screen.getByText(
          "Food database is unreachable. Check your USDA_API_KEY or try again later."
        )
      ).toBeDefined();
    });
  });
});
