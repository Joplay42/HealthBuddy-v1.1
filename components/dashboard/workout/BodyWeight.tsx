"use client";
import { useCallback, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { DisplayWeight, WeightsGrid } from "@/components";
import { BodyWeightProps, userWeightProps } from "@/types";
import {
	computeDelta,
	computeProjection,
	computeStreak,
	goalDirection,
} from "@/utils/weightStats";
import WeightStatCards from "./WeightStatCards";
import DeltaPill from "./DeltaPill";

const BodyWeight = ({ weight, objective, loading }: BodyWeightProps) => {
	const router = useRouter();

	const [filtered, setFiltered] = useState<userWeightProps[]>(weight);

	// Mirror DisplayWeight's filtered subset so the delta pill follows the dropdown.
	const handleFilteredChange = useCallback(
		(next: userWeightProps[]) => setFiltered(next),
		[],
	);

	const startWeight =
		objective.currentWeight ?? (weight.length > 0 ? weight[0].number : null);

	const direction =
		startWeight !== null
			? goalDirection(startWeight, objective.objectiveWeight)
			: "maintain";

	const streak = useMemo(() => computeStreak(weight), [weight]);
	const projection = useMemo(
		() =>
			computeProjection({
				weights: weight,
				startDate: objective.startDate,
				startWeight,
				objectiveWeight: objective.objectiveWeight,
				months: objective.months,
			}),
		[
			weight,
			objective.startDate,
			startWeight,
			objective.objectiveWeight,
			objective.months,
		],
	);
	const delta = useMemo(() => computeDelta(filtered), [filtered]);

	const hasGoal = !!objective.objectiveWeight && objective.objectiveWeight > 0;

	return (
		<div className='bg-white dark:bg-ink-900 p-5 rounded-3xl border border-neutral-400 dark:border-white/10'>
			<div className='flex items-center justify-between mb-6'>
				<h1 className='font-bold text-xl dark:text-bone'>Body weights</h1>
				<button
					className='hidden sm:block w-fit bg-black dark:bg-lime text-white dark:text-ink-950 px-3 py-2 rounded-2xl text-center hover:opacity-75 hover:cursor-pointer'
					onClick={() => {
						router.push("?modal=weight", { scroll: false });
					}}
				>
					Add weights +
				</button>
				<button
					className='sm:hidden w-fit bg-black dark:bg-lime text-white dark:text-ink-950 px-3 py-2 rounded-2xl text-center hover:opacity-75 hover:cursor-pointer'
					onClick={() => {
						router.push("?modal=weight", { scroll: false });
					}}
				>
					+
				</button>
			</div>

			{hasGoal && (
				<WeightStatCards
					weights={weight}
					objective={objective}
					streak={streak}
					projection={projection}
				/>
			)}

			<div
				className={`lg:grid grid-cols-4 grid-rows-[minmax(150px,auto)_auto] space-y-5 lg:space-y-0 lg:gap-10 items-start ${
					weight.length > 0 && "pt-4"
				}`}
			>
				<div className='col-span-3 h-[400px]'>
					<DisplayWeight
						weight={weight}
						objective={objective}
						loading={loading}
						onFilteredChange={handleFilteredChange}
						headerAccessory={
							filtered.length >= 2 ? (
								<DeltaPill delta={delta} direction={direction} />
							) : undefined
						}
					/>
				</div>
				<WeightsGrid weight={weight} loading={loading} />
			</div>
		</div>
	);
};

export default BodyWeight;
