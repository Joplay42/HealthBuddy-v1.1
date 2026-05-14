"use client";
import { Calories, Weight, Workout } from "@/components";
import { useUserInformationContext } from "@/context/UserInformationContext";
import CalorieSqueleton from "@/components/Squeleton/CalorieSqueleton";
import WorkoutDayCardSqueleton from "@/components/Squeleton/WorkoutDayCardSqueleton";
import DisplayWeightSqueleton from "@/components/Squeleton/DisplayWeightSqueleton";

const Home = () => {
	const { loading } = useUserInformationContext();

	if (loading) {
		return (
			<div className='lg:grid grid-cols-3 grid-rows-2 py-5 lg:py-10 space-y-5 lg:space-y-0 lg:gap-10 animate-fade-in'>
				{/* Calories */}
				<div className='col-span-2 w-full h-full'>
					<h1 className='font-bold text-xl dark:text-bone pb-5'>Calories</h1>
					<div className='bg-white dark:bg-ink-900 p-10 rounded-3xl border border-neutral-400 dark:border-white/10'>
						<CalorieSqueleton />
					</div>
				</div>
				{/* Workout */}
				<div className='w-full h-full row-span-2'>
					<h1 className='font-bold text-xl dark:text-bone pb-5'>Workouts</h1>
					<div className='w-full bg-white dark:bg-ink-900 p-5 rounded-3xl border border-neutral-400 dark:border-white/10'>
						<WorkoutDayCardSqueleton />
					</div>
				</div>
				{/* Weight */}
				<div className='col-span-2 w-full h-full'>
					<h1 className='font-bold text-xl dark:text-bone pb-5'>Body weight</h1>
					<div className='bg-white dark:bg-ink-900 px-3 pt-10 pb-16 md:p-10 rounded-3xl border border-neutral-400 dark:border-white/10 h-[340px]'>
						<DisplayWeightSqueleton />
					</div>
				</div>
			</div>
		);
	}

	return (
		<div className='lg:grid grid-cols-3 grid-rows-2 py-5 lg:py-10 space-y-5 lg:space-y-0 lg:gap-10 animate-fade-in'>
			<Calories />
			<Workout />
			<Weight />
		</div>
	);
};

export default Home;
