# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Start dev server on localhost:3000
npm run build    # Production build
npm run start    # Start production server
npm run lint     # Run ESLint
```

## Architecture

HealthBuddy is a **Next.js 15 App Router** health tracking app with three core features: calorie tracking, workout tracking, and account management.

**Stack:** Next.js 15, React 18, TypeScript, Tailwind CSS, Firebase (Auth + Firestore), Algolia search, Chart.js, React Bootstrap.

**Custom Tailwind colors:** `custom-green` (#AFF921), `custom-light` (#F4F4F4), `custom-dark` (#2B2B2B).

### Data flow

```
React Components → Next.js API Routes (/app/api/*) → Firestore
                                                    → Algolia (food search)
```

Firebase Auth manages sessions. All Firestore data is scoped per user UID. Algolia provides the global food database for calorie tracking.

### Route structure

- `app/(auth)/` — Public auth pages (login, signin, reset-password, confirmation)
- `app/dashboard/` — Protected routes requiring authentication
- `app/api/` — Backend API routes that interface with Firestore

Dashboard routes are wrapped with `FireBaseAuthProvider` (in `context/UserContext.tsx`) which redirects unauthenticated users.

### State management

React Context API only — no Redux or Zustand. Four providers, all in `context/`:

| Context | Purpose |
|---|---|
| `UserContext.tsx` | Firebase auth state |
| `UserInformationContext.tsx` | Aggregated user health data |
| `UserFoodContext.tsx` | Food library (custom + Algolia) |
| `UserRecipesContext.tsx` | User recipes |

Firestore real-time updates use `onSnapshot` listeners inside context providers.

### API routes

All routes in `app/api/` follow Next.js Route Handlers pattern and interact directly with Firestore using the Admin SDK or client SDK:

- `/api/calories` — Daily calorie totals (GET/POST/PATCH/DELETE)
- `/api/foods` — Custom food CRUD
- `/api/foods/consumed` — Consumed food entries
- `/api/foods/recipes` — Recipe CRUD
- `/api/objective` — Nutritional goals
- `/api/users` — User profile data
- `/api/workouts` — Workout plan management
- `/api/workouts/weight` — Body weight history

### Firestore collections

```
UserFoods/{userId}/foodList
UserRecipes/{userId}/recipeList
UserConsumedFoods/{userId}/consumedFoods
UserCalorieData/{userId}
UserGoal/{userId}
UserWeights/{userId}/weights
UserWorkouts/{userId}
```

### Key types

All TypeScript interfaces live in `types/index.ts`: `foodProps`, `recipeProps`, `userGoalProps`, `userCalorieProps`, `userWeightProps`, `userProgramProps`, `workoutDayProps`.

## Environment variables

The app requires `.env.local` with Firebase and Algolia credentials. See `.env.local` for the required variable names (Firebase project is `healthbuddy-dev` in development).

## Component conventions

- All interactive components use `"use client"` directive
- Skeleton loaders in `components/Squeleton/` are used at Suspense boundaries
- Modals for data entry (e.g., `components/modals/addRecipe/`)
- Toast notifications via `react-toastify` for user feedback
- `@/*` path alias maps to the project root
