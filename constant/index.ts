import {
  NavLinksWebsiteProps,
  WorkoutPlanProps,
  cardsWebsiteProps,
  navLinksDashboardProps,
  quotesProps,
  settingCardProps,
  settingSideBarProps,
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
  {
    title: "Workout tracker",
    category: [
      {
        name: "Set workout plan",
        link: "set-workout",
      },
      {
        name: "Add weight",
        link: "add-weight",
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
  {
    category: "Workout tracker",
    cards: [
      {
        id: "set-workout",
        title: "Set workout",
        description:
          "Create a personalized workout plan tailored to your fitness goals. Choose your training style, set the number of workouts per week, and structure exercises that fit your schedule and objectives — whether it’s building strength, losing fat, or improving endurance.",
        input: [],
        button: "Create workout plan",
      },
      {
        id: "add-weight",
        title: "Add weight",
        description:
          "Easily add your current weight to your log and keep track of every update. By recording your weight regularly, you’ll be able to monitor your progress over time, visualize trends, and stay motivated as you move closer to your fitness goals.",
        input: [],
        button: "Create new food",
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

export const workoutPlans: WorkoutPlanProps[] = [
  {
    title: "Push | pull | leg",
    categorie: ["Gain", "Maintain"],
    desc: "One day you focus on upper body pushing exercises, the next you focus on upper body pulling exercises, then finally, you train legs.",
    days: [
      {
        name: "Push day",
        desc: "Push Day targets the chest, shoulders, and triceps using pushing movements. This session builds upper-body strength and improves muscle definition.",
        day: "Mon",
        // Implement exercise choice
      },
      {
        name: "Pull day",
        desc: "Pull Day focuses on the back, biceps, and rear shoulders using pulling exercises. It enhances posture, grip strength, and overall upper-body balance.",
        day: "Tue",
        // Implement exercise choice
      },
      {
        name: "Leg day",
        desc: "Leg Day targets the quads, hamstrings, glutes, and calves through compound and isolation movements. It builds lower-body strength, power, and stability for overall performance.",
        day: "Wed",
        // Implement exercise choice
      },
      {
        name: "Rest & Cardio",
        desc: "A light day focused on recovery with optional low-intensity cardio like walking or cycling. Helps improve blood flow, support active recovery, and maintain overall conditioning.",
        day: "Thu",
        // Implement exercise choice
      },
      {
        name: "Push day",
        desc: "Push Day targets the chest, shoulders, and triceps using pushing movements. This session builds upper-body strength and improves muscle definition.",
        day: "Fri",
        // Implement exercise choice
      },
      {
        name: "Pull day",
        desc: "Pull Day focuses on the back, biceps, and rear shoulders using pulling exercises. It enhances posture, grip strength, and overall upper-body balance.",
        day: "Sat",
        // Implement exercise choice
      },
      {
        name: "Rest & Cardio",
        desc: "A light day focused on recovery with optional low-intensity cardio like walking or cycling. Helps improve blood flow, support active recovery, and maintain overall conditioning.",
        day: "Sun",
        // Implement exercise choice
      },
    ],
    intensity: "Moderate",
    level: "Intermediate",
  },
  {
    title: "Body part workout",
    categorie: ["Gain", "Lose"],
    desc: "The body part workout split takes the foundations of the bro workout split, breaking up training into specific body parts, usually focusing on two body parts per day.",
    days: [
      {
        name: "Chest & Biceps",
        desc: "This workout targets the chest with pressing movements and the biceps with curls and pulls. It builds upper-body pushing power while sculpting strong, defined arms.",
        day: "Mon",
        // Implement exercise choice
      },
      {
        name: "Quads & Glutes",
        desc: "This session focuses on building strength and shape in the quads and glutes through squats, lunges, and hip thrusts. It enhances lower-body power, stability, and overall athletic performance.",
        day: "Tue",
        // Implement exercise choice
      },
      {
        name: "Rest & Cardio",
        desc: "A light day focused on recovery with optional low-intensity cardio like walking or cycling. Helps improve blood flow, support active recovery, and maintain overall conditioning.",
        day: "Wed",
        // Implement exercise choice
      },
      {
        name: "Back & Triceps",
        desc: "This workout combines pulling movements for the back with pressing exercises for the triceps. It builds a strong, balanced upper body with improved posture and arm definition.",
        day: "Thu",
        // Implement exercise choice
      },
      {
        name: "Glutes & Hamstrings",
        desc: "This workout targets the posterior chain with exercises like deadlifts, hip thrusts, and leg curls. It strengthens and tones the glutes and hamstrings, improving power, stability, and lower-body aesthetics.",
        day: "Fri",
        // Implement exercise choice
      },
      {
        name: "Shoulders & Traps",
        desc: "This session focuses on building rounded, strong shoulders and well-developed traps through presses, raises, and shrugs. It enhances upper-body strength, posture, and overall muscular balance.",
        day: "Sat",
        // Implement exercise choice
      },
      {
        name: "Rest & Cardio",
        desc: "A light day focused on recovery with optional low-intensity cardio like walking or cycling. Helps improve blood flow, support active recovery, and maintain overall conditioning.",
        day: "Sun",
        // Implement exercise choice
      },
    ],
    intensity: "Moderate",
    level: "Advanced",
  },
  {
    title: "Full body workout",
    categorie: ["Maintain"],
    desc: "The full body workout split will allow you to hit all the major muscle groups in less time, making it suited to those who are time-poor and looking for a 2 or 3-day workout split.",
    days: [
      {
        name: "Workout 1",
        desc: "A balanced session targeting all major muscle groups with compound lifts like squats, deadlifts, and presses. Designed to build overall strength, endurance, and muscular coordination.",
        day: "Mon",
        // Implement exercise choice
      },
      {
        name: "Rest & Cardio",
        desc: "A light day focused on recovery with optional low-intensity cardio like walking or cycling. Helps improve blood flow, support active recovery, and maintain overall conditioning.",
        day: "Tue",
        // Implement exercise choice
      },
      {
        name: "Workout 2",
        desc: "Focuses on high-rep, moderate-weight movements to improve muscle endurance and cardiovascular fitness. Combines bodyweight exercises and light resistance for full-body toning and fat burning.",
        day: "Wed",
        // Implement exercise choice
      },
      {
        name: "Rest & Cardio",
        desc: "A light day focused on recovery with optional low-intensity cardio like walking or cycling. Helps improve blood flow, support active recovery, and maintain overall conditioning.",
        day: "Thu",
        // Implement exercise choice
      },
      {
        name: "Workout 3",
        desc: "An intense workout mixing heavy lifts with explosive plyometrics to boost power and muscle growth. Ideal for increasing athletic performance and metabolic rate through full-body engagement.",
        day: "Fri",
        // Implement exercise choice
      },
      {
        name: "Rest & Cardio",
        desc: "A light day focused on recovery with optional low-intensity cardio like walking or cycling. Helps improve blood flow, support active recovery, and maintain overall conditioning.",
        day: "Sat",
        // Implement exercise choice
      },
      {
        name: "Rest & Cardio",
        desc: "A light day focused on recovery with optional low-intensity cardio like walking or cycling. Helps improve blood flow, support active recovery, and maintain overall conditioning.",
        day: "Sun",
        // Implement exercise choice
      },
    ],
    intensity: "Moderate",
    level: "Beginner",
  },
  {
    title: "Upper Lower workout",
    categorie: ["Lose"],
    desc: "This approach alternates between upper body and lower body workouts, allowing for focused training sessions on each muscle group and adequate recovery time.",
    days: [
      {
        name: "Upper body",
        desc: "Emphasizes endurance and muscle definition using moderate weights and higher reps across all upper-body muscles. Combines pushing and pulling movements for balanced muscular development.",
        day: "Mon",
        // Implement exercise choice
      },
      {
        name: "Lower body",
        desc: "Targets the glutes, quads, hamstrings, and calves with heavy compound lifts like squats and deadlifts. Aims to build raw lower-body strength and power.",
        day: "Tue",
        // Implement exercise choice
      },
      {
        name: "Rest & Cardio",
        desc: "A light day focused on recovery with optional low-intensity cardio like walking or cycling. Helps improve blood flow, support active recovery, and maintain overall conditioning.",
        day: "Wed",
        // Implement exercise choice
      },
      {
        name: "Upper body",
        desc: "Focuses on building strength and size in the chest, back, shoulders, and arms through compound lifts and isolation exercises. Designed to enhance muscle balance and improve overall upper-body power.",
        day: "Thu",
        // Implement exercise choice
      },
      {
        name: "Lower body",
        desc: "Uses higher reps and varied angles with lunges, step-ups, and hip thrusts to sculpt and tone the lower body. Focuses on improving muscular endurance and enhancing lower-body aesthetics.",
        day: "Fri",
        // Implement exercise choice
      },
      {
        name: "Rest & Cardio",
        desc: "A light day focused on recovery with optional low-intensity cardio like walking or cycling. Helps improve blood flow, support active recovery, and maintain overall conditioning.",
        day: "Sat",
        // Implement exercise choice
      },
      {
        name: "Rest & Cardio",
        desc: "A light day focused on recovery with optional low-intensity cardio like walking or cycling. Helps improve blood flow, support active recovery, and maintain overall conditioning.",
        day: "Sun",
        // Implement exercise choice
      },
    ],
    intensity: "Low",
    level: "Beginner",
  },
  {
    title: "Hybrid Athlete Program",
    categorie: ["Gain", "Maintain"],
    desc: "Blends weight training with conditioning work to build strength, endurance, and athletic performance.",
    intensity: "Moderate",
    level: "Advanced",
    days: [
      {
        name: "Strength & Power",
        desc: "Heavy compound lifts like squats, bench press, and rows to develop maximal strength and raw power.",
        day: "Mon",
      },
      {
        name: "Conditioning",
        desc: "High-intensity intervals, sled pushes, and battle ropes to improve cardiovascular fitness and stamina.",
        day: "Tue",
      },
      {
        name: "Rest",
        desc: "Mobility drills, foam rolling, and stretching to aid recovery and prevent injury.",
        day: "Wed",
      },
      {
        name: "Strength & Speed",
        desc: "Explosive lifts, sprints, and plyometric work to boost speed, agility, and athleticism.",
        day: "Thu",
      },
      {
        name: "Conditioning & Core",
        desc: "A blend of circuit training and targeted abdominal exercises to improve endurance while strengthening your midsection.",
        day: "Fri",
      },
      {
        name: "Active Recovery",
        desc: "Low-intensity cardio and stretching to promote recovery without taxing the body.",
        day: "Sat",
      },
      {
        name: "Rest",
        desc: "A day of complete rest to allow your muscles and nervous system to recover fully.",
        day: "Sun",
      },
    ],
  },
  {
    title: "Circuit Training Blast",
    categorie: ["Maintain", "Lose"],
    desc: "Fast-paced circuits combining strength and cardio to maximize calorie burn and muscular endurance.",
    intensity: "Moderate",
    level: "Beginner",
    days: [
      {
        name: "Circuit A",
        desc: "A challenging full-body circuit targeting both upper and lower body muscles, using minimal rest between exercises to keep your heart rate high and boost calorie burn.",
        day: "Mon",
      },
      {
        name: "Cardio & Core",
        desc: "A blend of high-intensity interval cardio sessions paired with focused abdominal circuits to strengthen your midsection and improve overall fitness.",
        day: "Tue",
      },
      {
        name: "Rest",
        desc: "A day dedicated to gentle activities like walking, light stretching, or yoga to aid recovery and prepare your body for the next intense session.",
        day: "Wed",
      },
      {
        name: "Circuit B",
        desc: "An alternative full-body circuit with a new set of exercises, keeping your body guessing while improving muscular endurance and coordination.",
        day: "Thu",
      },
      {
        name: "Cardio & Core",
        desc: "A steady-state cardio session followed by targeted core work to build a stronger, leaner midsection without overtaxing your joints.",
        day: "Fri",
      },
      {
        name: "Rest",
        desc: "A full recovery day to let your muscles repair and adapt, ensuring better performance in the next workouts.",
        day: "Sat",
      },
      {
        name: "Active Recovery",
        desc: "Mobility drills, stretching routines, or light recreational activities to maintain movement without causing fatigue.",
        day: "Sun",
      },
    ],
  },
  {
    title: "Powerlifting Program", // NEW PLAN 2
    categorie: ["Gain"],
    desc: "Strength-focused plan centered on the big 3 lifts: squat, bench, deadlift, with accessory work for balance.",
    intensity: "Moderate",
    level: "Intermediate",
    days: [
      {
        name: "Squat Day",
        desc: "Heavy back and front squats paired with accessory leg work to develop raw lower body power, stability, and explosive strength.",
        day: "Mon",
      },
      {
        name: "Bench Press Day",
        desc: "Flat and incline bench presses combined with triceps and shoulder accessory exercises to maximize pushing strength and upper body muscle mass.",
        day: "Tue",
      },
      {
        name: "Rest",
        desc: "A day to focus on mobility drills, foam rolling, and stretching to enhance recovery and joint health.",
        day: "Wed",
      },
      {
        name: "Deadlift Day",
        desc: "Heavy deadlifts and variations to strengthen the posterior chain, improve grip, and increase pulling capacity.",
        day: "Thu",
      },
      {
        name: "Accessory Day",
        desc: "Focused work on weak points, such as hamstring curls, rows, or overhead presses, to improve balance and lift performance.",
        day: "Fri",
      },
      {
        name: "Rest",
        desc: "Light activity or active recovery to promote blood flow and prepare for the next training week.",
        day: "Sat",
      },
      {
        name: "Rest",
        desc: "A complete day of rest to ensure full muscular recovery and nervous system reset.",
        day: "Sun",
      },
    ],
  },
  {
    title: "Calisthenics Mastery",
    categorie: ["Maintain", "Lose"],
    desc: "A bodyweight-focused plan to improve strength, control, and mobility without the need for equipment.",
    intensity: "Moderate",
    level: "Advanced",
    days: [
      {
        name: "Push Strength",
        desc: "Push-ups, dips, and advanced variations to target your chest, shoulders, and triceps while building upper body endurance and control.",
        day: "Mon",
      },
      {
        name: "Pull Strength",
        desc: "Pull-ups, chin-ups, and inverted rows to strengthen your back and biceps while improving grip and posture.",
        day: "Tue",
      },
      {
        name: "Rest & Mobility",
        desc: "Stretching, foam rolling, and light movement to improve flexibility, joint health, and overall mobility.",
        day: "Wed",
      },
      {
        name: "Leg Power",
        desc: "Bodyweight squats, lunges, and plyometric exercises to enhance leg strength, explosiveness, and stability.",
        day: "Thu",
      },
      {
        name: "Core Stability",
        desc: "Planks, leg raises, and rotational core work to build a strong, stable midsection for better performance and injury prevention.",
        day: "Fri",
      },
      {
        name: "Active Recovery",
        desc: "Light jogging, yoga, or mobility drills to promote blood flow and aid muscle recovery.",
        day: "Sat",
      },
      {
        name: "Rest",
        desc: "A complete rest day to allow your muscles and joints to recover fully.",
        day: "Sun",
      },
    ],
  },
];
