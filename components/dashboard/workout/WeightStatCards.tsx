"use client";
import { useRouter } from "next/navigation";
import {
	OnTrackStatus,
	userProgramProps,
	userWeightProps,
	WeightProjectionResult,
	WeightStreakResult,
} from "@/types";
import { goalDirection } from "@/utils/weightStats";

type Props = {
	weights: userWeightProps[];
	objective: userProgramProps;
	streak: WeightStreakResult;
	projection: WeightProjectionResult;
};

const statusMeta: Record<
	OnTrackStatus,
	{ label: string; dot: string; text: string }
> = {
	achieved: {
		label: "Achieved",
		dot: "bg-emerald-500",
		text: "text-emerald-600 dark:text-emerald-400",
	},
	ahead: {
		label: "Ahead",
		dot: "bg-lime",
		text: "text-lime-700 dark:text-lime-400",
	},
	on_track: {
		label: "On track",
		dot: "bg-lime-600",
		text: "text-lime-700 dark:text-lime-400",
	},
	behind: {
		label: "Behind",
		dot: "bg-amber-500",
		text: "text-amber-600 dark:text-amber-400",
	},
	wrong_direction: {
		label: "Wrong way",
		dot: "bg-red-500",
		text: "text-red-600 dark:text-red-400",
	},
};

const formatEta = (proj: WeightProjectionResult): string => {
	if (proj.onTrack === "achieved") return "Goal reached";
	if (!proj.etaDate) return "—";
	return proj.etaDate.toLocaleDateString("en-US", {
		month: "short",
		day: "numeric",
		year: "numeric",
	});
};

const Card = ({
	label,
	children,
	action,
}: {
	label: string;
	children: React.ReactNode;
	action?: React.ReactNode;
}) => (
	<div className='bg-white dark:bg-ink-900 rounded-3xl border border-neutral-400 dark:border-white/10 p-5 flex flex-col gap-2 min-h-[110px]'>
		<div className='flex items-center justify-between'>
			<span className='text-xs uppercase tracking-wide text-neutral-500 dark:text-white/50'>
				{label}
			</span>
			{action}
		</div>
		<div className='flex-1 flex flex-col justify-end'>{children}</div>
	</div>
);

const WeightStatCards = ({ weights, objective, streak, projection }: Props) => {
	const router = useRouter();

	const latest = weights.length > 0 ? weights[weights.length - 1] : null;
	const startWeight =
		objective.currentWeight ?? (weights.length > 0 ? weights[0].number : null);
	const direction =
		startWeight !== null
			? goalDirection(startWeight, objective.objectiveWeight)
			: "maintain";

	const status = statusMeta[projection.onTrack];
	const slipDays =
		projection.daysRemainingProjected !== null &&
		projection.daysRemainingProjected > projection.daysRemainingPlanned
			? projection.daysRemainingProjected - projection.daysRemainingPlanned
			: 0;

	return (
		<div className='grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6'>
			<Card label='Current weight'>
				<div className='text-2xl md:text-3xl font-bold dark:text-bone'>
					{latest ? `${latest.number} lb` : "—"}
				</div>
				<span className='text-xs text-neutral-500 dark:text-white/50'>
					{latest
						? `Last logged ${latest.date.toLocaleDateString("en-US", {
								month: "short",
								day: "numeric",
							})}`
						: "No entries yet"}
				</span>
			</Card>

			<Card
				label='Goal weight'
				action={
					<button
						type='button'
						aria-label='Edit goal'
						onClick={() => router.push("?modal=editGoal", { scroll: false })}
						className='text-neutral-500 hover:text-black dark:text-white/50 dark:hover:text-lime'
					>
						<svg
							xmlns='http://www.w3.org/2000/svg'
							fill='none'
							viewBox='0 0 24 24'
							strokeWidth={1.6}
							stroke='currentColor'
							className='w-4 h-4'
						>
							<path
								strokeLinecap='round'
								strokeLinejoin='round'
								d='M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487z'
							/>
						</svg>
					</button>
				}
			>
				<div className='text-2xl md:text-3xl font-bold dark:text-bone'>
					{objective.objectiveWeight} lb
				</div>
				<span className='text-xs text-neutral-500 dark:text-white/50 capitalize'>
					{direction === "maintain" ? "maintain" : `goal: ${direction}`} ·{" "}
					{objective.months} mo
				</span>
			</Card>

			<Card label='Streak'>
				<div className='flex items-baseline gap-2'>
					<span className='text-2xl md:text-3xl font-bold dark:text-bone'>
						{streak.current}
					</span>
					<span className='text-sm text-neutral-500 dark:text-white/50'>
						{streak.current === 1 ? "day" : "days"}
					</span>
					{streak.current > 0 && <span aria-hidden='true'>🔥</span>}
				</div>
				<span className='text-xs text-neutral-500 dark:text-white/50'>
					Longest: {streak.longest}
				</span>
			</Card>

			<Card label='Status'>
				<div className='flex items-center gap-2'>
					<span
						className={`inline-block w-2.5 h-2.5 rounded-full ${status.dot}`}
					/>
					<span className={`text-lg md:text-xl font-bold ${status.text}`}>
						{status.label}
					</span>
				</div>
				<span className='text-xs text-neutral-500 dark:text-white/50'>
					ETA: {formatEta(projection)}
					{slipDays > 0 && (
						<span className='block text-amber-600 dark:text-amber-400'>
							~{Math.ceil(slipDays / 7)} wk past goal date
						</span>
					)}
				</span>
			</Card>
		</div>
	);
};

export default WeightStatCards;
