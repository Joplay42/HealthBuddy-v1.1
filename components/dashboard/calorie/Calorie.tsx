"use client";
import { FoodEntries, Objective, Overview } from "@/components";
import { useUserInformationContext } from "@/context/UserInformationContext";
import { UserConsumedFoodProvider, useUserConsumedFooodContext } from "@/context/UserConsumedFoodContext";
import { useRouter } from "next/navigation";
import FoodEntriesSqueleton from "@/components/Squeleton/FoodEntriesSqueleton";
import ObjectifSqueleton from "@/components/Squeleton/ObjectifSqueleton";
import OverviewSqueleton from "@/components/Squeleton/OverviewSqueleton";

// Outer component: starts the consumed food fetch immediately on mount
const Calorie = () => {
	return (
		<UserConsumedFoodProvider>
			<CalorieContent />
		</UserConsumedFoodProvider>
	);
};

// Inner component: gates on both loading states so the page reveals all at once
const CalorieContent = () => {
	const { userGoal, userCalorieInfo, loading } = useUserInformationContext();
	const { loading: consumedLoading } = useUserConsumedFooodContext();
	const router = useRouter();

	if (loading || consumedLoading) {
		return (
			<div className='py-5 md:py-10 md:grid grid-cols-3 grid-rows-[minmax(150px,auto)_auto] space-y-5 md:space-y-0 md:gap-10'>
				<div className='col-span-2'>
					<OverviewSqueleton />
				</div>
				<div>
					<ObjectifSqueleton />
				</div>
				<div className='col-span-3'>
					<FoodEntriesSqueleton />
				</div>
			</div>
		);
	}

	if (!userGoal || userGoal.calorie === 0) {
		return (
			<div className='py-5 md:py-10 space-y-5 md:space-y-0 md:gap-10 animate-fade-in'>
				<div className='bg-white dark:bg-ink-900 p-5 rounded-3xl border border-neutral-400 dark:border-white/10 w-full py-40'>
					<h1 className='text-3xl font-bold text-center dark:text-bone'>
						Welcome to{" "}
						<span className='text-custom-green dark:text-lime'>
							HealthBuddy
						</span>{" "}
						calorie tracker!
						<span className='text-5xl'> 🎉</span>
					</h1>
					<div className='flex justify-center mt-5'>
						<button
							data-tour='set-objective-empty-btn'
							className='w-fit bg-black dark:bg-lime text-white dark:text-ink-950 px-5 py-2 rounded-2xl text-center hover:opacity-75'
							onClick={() =>
								router.push("/dashboard/calorie-tracking?modal=objective", {
									scroll: false,
								})
							}
						>
							Set objective
						</button>
					</div>
				</div>
			</div>
		);
	}

	return (
		<div className='py-5 md:py-10 md:grid grid-cols-3 grid-rows-[minmax(150px,auto)_auto] space-y-5 md:space-y-0 md:gap-10 animate-fade-in'>
			<div data-tour='calorie-overview' className='col-span-2'>
				<Overview
					goal={userGoal}
					data={userCalorieInfo ?? { calorie: 0, protein: 0, fat: 0, carbs: 0 }}
					loading={false}
				/>
			</div>
			<div>
				<Objective
					goal={userGoal}
					data={userCalorieInfo ?? { calorie: 0, protein: 0, fat: 0, carbs: 0 }}
					loading={false}
				/>
			</div>
			<div data-tour='food-entries' className='col-span-3'>
				<FoodEntries />
			</div>
		</div>
	);
};

export default Calorie;
