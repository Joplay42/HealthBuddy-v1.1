"use client";
// Components import
import { DisplayCalories } from "@/components";
import { useUserInformationContext } from "@/context/UserInformationContext";
import { useRouter } from "next/navigation";
import HelpBubble from "@/components/onboarding/HelpBubble";

/**
 * This component is used to display the content in the calories page. It assembles many
 * component to make the view stable and easy to use.
 * @returns
 */
const Calories = () => {
	// Router hooks to manage navigation
	const router = useRouter();
	const { userGoal } = useUserInformationContext();

	return (
		// The calorie container
		<div data-tour='home-calories' className='col-span-2 w-full h-full'>
			<div className='flex items-center justify-between pb-5'>
				{/** Title of the container */}
				<div className='flex items-center gap-2'>
					<h1 className='font-bold text-xl dark:text-bone'>Calories</h1>
					<HelpBubble
						id='home-calories'
						placement='right'
						content="Quick view of today's calories vs. your goal. Open the Calorie tracker page for the full macro breakdown and to log food."
					/>
				</div>
				{/** If the user has no objective */}
				{userGoal && (
					<button
						className='w-fit bg-black dark:bg-lime text-white dark:text-ink-950 px-3 py-2 rounded-2xl text-center hover:opacity-75 hover:cursor-pointer'
						onClick={() =>
							router.push("?modal=food&index=search", { scroll: false })
						}
					>
						Add food +
					</button>
				)}
			</div>
			<div className='bg-white dark:bg-ink-900 p-10 rounded-3xl border border-neutral-400 dark:border-white/10'>
				<DisplayCalories />
			</div>
		</div>
	);
};

export default Calories;
