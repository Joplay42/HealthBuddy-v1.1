"use client";
import { GoalDirection, WeightDeltaResult } from "@/types";
import { isAlignedWithGoal } from "@/utils/weightStats";

type Props = {
	delta: WeightDeltaResult;
	direction: GoalDirection;
	label?: string;
};

const DeltaPill = ({ delta, direction, label }: Props) => {
	const aligned = isAlignedWithGoal(delta.delta, direction);
	const flat = direction !== "maintain" && Math.abs(delta.delta) < 0.2;

	let tone =
		"bg-neutral-200 text-neutral-700 dark:bg-white/10 dark:text-white/70";
	if (!flat && direction !== "maintain") {
		tone = aligned
			? "bg-lime/20 text-lime-700 dark:text-lime-400"
			: "bg-red-500/15 text-red-600 dark:text-red-400";
	}

	const sign = delta.delta > 0 ? "+" : "";
	const display = `${sign}${delta.delta.toFixed(1)} lb`;

	return (
		<span
			className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold ${tone}`}
		>
			{display}
			{label && <span className='font-normal opacity-75'>· {label}</span>}
		</span>
	);
};

export default DeltaPill;
