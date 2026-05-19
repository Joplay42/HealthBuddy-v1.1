import type { Step } from "react-joyride";

export const overviewSteps: Step[] = [
  {
    target: '[data-tour="sidebar"]',
    title: "Welcome to HealthBuddy 👋",
    content:
      "Your three core tools live in the sidebar: Calorie tracker, Workout planner, and Settings. Tap any icon to jump in.",
    placement: "right",
  },
  {
    target: '[data-tour="home-calories"]',
    title: "Today's calories at a glance",
    content:
      "This card shows what you've eaten today vs. your daily goal. The full breakdown lives on the Calorie tracker page.",
    placement: "bottom",
  },
  {
    target: '[data-tour="home-workout"]',
    title: "Your workout plan",
    content:
      "See the next workouts on your schedule. Build or change your plan from the Workout page.",
    placement: "left",
  },
  {
    target: '[data-tour="home-weight"]',
    title: "Weights tracking",
    content:
      "See the weight trends in a graph. Select the time span to see the weights.",
    placement: "bottom",
  },
];

export const caloriesEmptySteps: Step[] = [
  {
    target: '[data-tour="set-objective-empty-btn"]',
    title: "Start by setting your goal",
    content:
      "Tell HealthBuddy your daily calorie and macro targets. Once it's set, you'll unlock the full tracker.",
    placement: "top",
  },
];

export const caloriesSteps: Step[] = [
  {
    target: '[data-tour="calorie-overview"]',
    title: "Live macro overview",
    content:
      "Calories remaining and your protein / carbs / fat balance update in real time as you log food.",
    placement: "bottom",
  },
  {
    target: '[data-tour="set-objective-btn"]',
    title: "Adjust your objective",
    content:
      "Change your daily calorie target or your macro split here at any time.",
    placement: "left",
  },
  {
    target: '[data-tour="add-food-btn"]',
    title: "Log what you ate",
    content:
      "Search our food database, pick a recipe, or create a custom food. It gets added to today's entries.",
    placement: "left",
  },
  {
    target: '[data-tour="food-entries"]',
    title: "Today's food log",
    content:
      "Everything you've logged today shows up here. Tap an entry to edit or remove it.",
    placement: "top",
  },
];

export const workoutEmptySteps: Step[] = [
  {
    target: '[data-tour="find-workout-empty-btn"]',
    title: "Build your first plan",
    content:
      "Tell us your goal and we'll generate a weekly workout plan for you. You can always tweak it later.",
    placement: "top",
  },
];

export const workoutSteps: Step[] = [
  {
    target: '[data-tour="workout-calendar"]',
    title: "Your weekly calendar",
    content:
      "Pick any day to view its workout. Use the arrows to look two weeks ahead.",
    placement: "bottom",
  },
  {
    target: '[data-tour="workout-schedule"]',
    title: "Today's workout",
    content: "The exercises scheduled for the selected day appear here.",
    placement: "left",
  },
  {
    target: '[data-tour="create-plan-btn"]',
    title: "Change your plan",
    content:
      "Need a different routine? Open the planner from here to swap it out.",
    placement: "bottom",
  },
];

export const weightSteps: Step[] = [
  {
    target: '[data-tour="add-weight-btn"]',
    title: "Log your weight",
    content:
      "Weigh in regularly to keep your streak going and feed the projection chart.",
    placement: "left",
  },
  {
    target: '[data-tour="weight-chart"]',
    title: "Your progress chart",
    content:
      "See your trend over time, your ETA to the goal weight, and how close you are to your target.",
    placement: "top",
  },
  {
    target: '[data-tour="weights-grid"]',
    title: "Your weigh-in history",
    content:
      "Every weigh-in shows up here. Edit or delete past entries any time.",
    placement: "left",
  },
];
