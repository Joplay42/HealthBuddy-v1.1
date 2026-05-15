"use client";
import React, { useCallback, useMemo, useState } from "react";
import DisplayWeight from "./DisplayWeight";
import { useUserInformationContext } from "@/context/UserInformationContext";
import { useRouter } from "next/navigation";
import {
	computeDelta,
	computeStreak,
	goalDirection,
} from "@/utils/weightStats";
import DeltaPill from "@/components/dashboard/workout/DeltaPill";
import { userWeightProps } from "@/types";

const Weight = () => {
	const { userWeightInfo, userWorkoutObjectiveInfo } =
		useUserInformationContext();

	const router = useRouter();
	const [filtered, setFiltered] = useState<userWeightProps[]>(userWeightInfo);

	const handleFilteredChange = useCallback(
		(next: userWeightProps[]) => setFiltered(next),
		[],
	);

	const streak = useMemo(() => computeStreak(userWeightInfo), [userWeightInfo]);
	const delta = useMemo(() => computeDelta(filtered), [filtered]);

	if (!userWorkoutObjectiveInfo?.workoutPlan?.days?.length) return null;

	const startWeight =
		userWorkoutObjectiveInfo.currentWeight ??
		(userWeightInfo.length > 0 ? userWeightInfo[0].number : null);
	const direction =
		startWeight !== null
			? goalDirection(startWeight, userWorkoutObjectiveInfo.objectiveWeight)
			: "maintain";

	return (
		<div className='col-span-2 w-full h-full animate-fade-in'>
			<div className='flex items-center justify-between pb-5 gap-3'>
				<div className='flex items-center gap-2 flex-wrap'>
					<h1 className='font-bold text-xl dark:text-bone'>Body weight</h1>
					{streak.current > 0 && (
						<span className='inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-500/15 text-amber-700 dark:text-amber-400'>
							<span aria-hidden='true'>🔥</span>
							{streak.current}
						</span>
					)}
				</div>

				{userWeightInfo.length !== 0 && (
					<button
						className='w-fit bg-black dark:bg-lime text-white dark:text-ink-950 px-3 py-2 rounded-2xl text-center hover:opacity-75 hover:cursor-pointer'
						onClick={() => {
							router.push("?modal=weight", { scroll: false });
						}}
					>
						Add weight +
					</button>
				)}
			</div>
			<div className='bg-white dark:bg-ink-900 px-3 pt-10 pb-16 md:p-10 rounded-3xl border border-neutral-400 dark:border-white/10 h-[340px]'>
				<DisplayWeight
					weight={userWeightInfo}
					objective={userWorkoutObjectiveInfo}
					loading={false}
					onFilteredChange={handleFilteredChange}
					headerAccessory={
						filtered.length >= 2 ? (
							<DeltaPill delta={delta} direction={direction} />
						) : undefined
					}
				/>
			</div>
		</div>
	);
};

export default Weight;
