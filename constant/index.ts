import {
  NavLinksWebsiteProps,
  WorkoutPlanProps,
  cardsWebsiteProps,
  foodProps,
  navLinksDashboardProps,
  quotesProps,
  settingCardProps,
  settingSideBarProps,
  userCalorieProps,
  userGoalProps,
  userProgramProps,
  userProps,
  userWeightProps,
} from "@/types";

// The website navLinks array with the name and the url
export const navLinksWebsite: NavLinksWebsiteProps = [
  {
    name: "About",
    url: "about",
  },
  {
    name: "Calorie tracker",
    url: "calorie-tracker",
  },
  {
    name: "Workout",
    url: "workout",
  },
  {
    name: "Contact",
    url: "contact",
  },
];

// The website card for the website, with an icon and title and description
export const cardsWebsite: cardsWebsiteProps = [
  {
    icon: "/muscle.svg",
    title: "Track nutriment from food",
    description:
      "Set your protein, carbs and fat objective and tracks each nutriments.",
  },
  {
    icon: "/time.svg",
    title: "See the food you consumed for the day",
    description:
      "We save each food you eat in the day, so you can track your routine better.",
  },
  {
    icon: "/plus.svg",
    title: "Easily add your consumed food",
    description:
      "Add your custom meal with the amount of calories, protein, carbs and fat.",
  },
];

// The websites quotes array with a text and author
export const quotes: quotesProps = [
  {
    text: "The pain you feel today is the strength you feel tomorrow",
    author: "Stephen Richard",
  },
  {
    text: "Some people want it to happen, some wish it would happen, others make it happen.",
    author: "Michael Jordan",
  },
  {
    text: "Everyone's dream can come true if you just stick to it and work hard.",
    author: "Serena Williams",
  },
  {
    text: "All growth starts at the end of your comfort zone.",
    author: "Tony Robins",
  },
];

// The navigation link for the dashboard array with the text, icon and link
export const navLinksDashboard: navLinksDashboardProps = [
  {
    text: "Home",
    icon: "/home.svg",
    link: "/dashboard",
  },
  {
    text: "Calorie tracker",
    icon: "/calorie.svg",
    link: "/dashboard/calorie-tracking",
  },
  {
    text: "Workout",
    icon: "/workout.svg",
    link: "/dashboard/workout",
  },
  {
    text: "Settings",
    icon: "/setting.svg",
    link: "/dashboard/setting",
  },
];

export const foodEntriesLabel = [
  "Meal",
  "Food",
  "Quantity",
  "Calories",
  "Protein",
  "Carbs",
  "Fat",
];

export const settingsSideBar: settingSideBarProps = [
  {
    title: "Account",
    category: [
      {
        name: "Account name",
        link: "account-name",
      },
      {
        name: "Confirm Account",
        link: "confirm-account",
      },
      {
        name: "Reset password",
        link: "reset-password",
      },
      {
        name: "Delete account",
        link: "delete-account",
      },
    ],
  },
  {
    title: "Calorie tracker",
    category: [
      {
        name: "Set objective",
        link: "set-objective",
      },
      {
        name: "Create food",
        link: "create-food",
      },
      {
        name: "Create recipe",
        link: "create-recipe",
      },
    ],
  },
];

export const settingCard: settingCardProps = [
  {
    category: "Account",
    cards: [
      {
        id: "account-name",
        title: "Account name",
        description:
          "Update your first and last names with ease in this section, ensuring your account reflects the most current information.",
        input: ["firstName", "lastName"],
        button: "Save changes",
      },
      {
        id: "confirm-account",
        title: "Confirm account",
        description:
          "In our applications section, your account security is our priority. Upon selecting your email, a confirmation email is sent to ensure account validity and protect against unauthorized access.",
        input: [],
        button: "Send email verification",
      },
      {
        id: "reset-password",
        title: "Reset password",
        description:
          "Here, you can securely reset your password in just a few simple steps. We understand that forgetting passwords can happen to anyone, so we've made the process as straightforward and hassle-free as possible. Protect your account and regain access in moments with our intuitive password reset feature.",
        input: ["email"],
        button: "Save changes",
      },
      {
        id: "delete-account",
        title: "Delete account",
        description:
          "We understand that circumstances may change, and your privacy and control are important to us. Follow the steps below to permanently delete your account, ensuring that your data is handled responsibly and in accordance with our privacy policy. If you choose to return, you're always welcome back.",
        input: [],
        button: "Save changes",
      },
    ],
  },
  {
    category: "Calorie tracker",
    cards: [
      {
        id: "set-objective",
        title: "Set objective",
        description:
          "Take control of your health journey by customizing your daily nutritional objectives. Choose your preferred calorie intake and the percentage distribution of macronutrients to align with your dietary goals and lifestyle.",
        input: [],
        button: "Change objective",
      },
      {
        id: "create-food",
        title: "Create food",
        description:
          "Welcome to the section where you can contribute to expanding our database and track the macros of your favorite foods!",
        input: [],
        button: "Create new food",
      },
      {
        id: "create-recipe",
        title: "Create recipe",
        description:
          "Welcome to the recipe contribution section! Share your favorite recipes with our community and track their nutritional values effortlessly.",
        input: [],
        button: "Create new recipe",
      },
    ],
  },
];

export const variantClasses = {
  primary:
    "bg-blue-100 border border-blue-400 text-blue-700 px-4 py-3 my-2 rounded-xl",
  secondary:
    "bg-gray-100 border border-gray-400 text-gray-700 px-4 py-3 my-2 rounded-xl",
  success:
    "bg-green-100 border border-green-400 text-green-700 px-4 py-3 my-2 rounded-xl",
  danger:
    "bg-red-100 border border-red-400 text-red-700 px-4 py-3 my-2 rounded-xl",
  warning:
    "bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 my-2 rounded-xl",
  info: "bg-blue-100 border border-blue-400 text-blue-700 px-4 py-3 my-2 rounded-xl",
};

// Hard coded value for the new update
export const userWeights: userWeightProps = {
  weights: [
    {
      number: 162,
      date: new Date("2025-07-01"),
    },
    {
      number: 160.5,
      date: new Date("2025-07-05"),
    },
    {
      number: 161,
      date: new Date("2025-07-10"),
    },
    {
      number: 159.2,
      date: new Date("2025-07-17"),
    },
    {
      number: 158.9,
      date: new Date("2025-07-23"),
    },
    {
      number: 157.1,
      date: new Date("2025-07-29"),
    },
    {
      number: 156,
      date: new Date("2025-08-04"),
    },
  ],
};
export const userObjective: userProgramProps = {
  objectiveWeight: 150,
  months: 3,
};

export const workoutPlans: WorkoutPlanProps[] = [
  {
    title: "Push/pull/leg",
    categorie: ["Gain", "Maintain"],
    desc: "One day you focus on upper body pushing exercises, the next you focus on upper body pulling exercises, then finally, you train legs.",
    days: [
      {
        name: "Push day",
        day: "Mon",
        // Implement exercise choice
      },
      {
        name: "Pull day",
        day: "Tue",
        // Implement exercise choice
      },
      {
        name: "Leg day",
        day: "Wed",
        // Implement exercise choice
      },
      {
        name: "Rest & Cardio",
        day: "Thu",
        // Implement exercise choice
      },
      {
        name: "Push day",
        day: "Fri",
        // Implement exercise choice
      },
      {
        name: "Pull day",
        day: "Sat",
        // Implement exercise choice
      },
      {
        name: "Leg day",
        day: "Sun",
        // Implement exercise choice
      },
    ],
    intensity: "High",
  },
  {
    title: "Body part workout",
    categorie: ["Maintain", "Lose"],
    desc: "The body part workout split takes the foundations of the bro workout split, breaking up training into specific body parts, usually focusing on two body parts per day.",
    days: [
      {
        name: "Chest & Biceps",
        day: "Mon",
        // Implement exercise choice
      },
      {
        name: "Quads & Glutes",
        day: "Tue",
        // Implement exercise choice
      },
      {
        name: "Rest & Cardio",
        day: "Wed",
        // Implement exercise choice
      },
      {
        name: "Back & Triceps",
        day: "Thu",
        // Implement exercise choice
      },
      {
        name: "Glutes & Hamstrings",
        day: "Fri",
        // Implement exercise choice
      },
      {
        name: "Shoulders & Traps",
        day: "Sat",
        // Implement exercise choice
      },
      {
        name: "Rest & Cardio",
        day: "Sun",
        // Implement exercise choice
      },
    ],
    intensity: "High",
  },
  {
    title: "Full body workout",
    categorie: ["Gain", "Lose"],
    desc: "The full body workout split will allow you to hit all the major muscle groups in less time, making it suited to those who are time-poor and looking for a 2 or 3-day workout split.",
    days: [
      {
        name: "Workout 1",
        day: "Mon",
        // Implement exercise choice
      },
      {
        name: "Rest & Cardio",
        day: "Tue",
        // Implement exercise choice
      },
      {
        name: "Workout 2",
        day: "Wed",
        // Implement exercise choice
      },
      {
        name: "Rest & Cardio",
        day: "Thu",
        // Implement exercise choice
      },
      {
        name: "Workout 3",
        day: "Fri",
        // Implement exercise choice
      },
      {
        name: "Rest & Cardio",
        day: "Sat",
        // Implement exercise choice
      },
      {
        name: "Rest & Cardio",
        day: "Sun",
        // Implement exercise choice
      },
    ],
    intensity: "High",
  },
  {
    title: "Upper Lower workout",
    categorie: ["Gain", "Maintain", "Lose"],
    desc: "This approach alternates between upper body and lower body workouts, allowing for focused training sessions on each muscle group and adequate recovery time.",
    days: [
      {
        name: "Upper body",
        day: "Mon",
        // Implement exercise choice
      },
      {
        name: "Lower body",
        day: "Tue",
        // Implement exercise choice
      },
      {
        name: "Rest & Cardio",
        day: "Wed",
        // Implement exercise choice
      },
      {
        name: "Upper body",
        day: "Thu",
        // Implement exercise choice
      },
      {
        name: "Lower body",
        day: "Fri",
        // Implement exercise choice
      },
      {
        name: "Rest & Cardio",
        day: "Sat",
        // Implement exercise choice
      },
      {
        name: "Rest & Cardio",
        day: "Sun",
        // Implement exercise choice
      },
    ],
    intensity: "Low",
  },
];
