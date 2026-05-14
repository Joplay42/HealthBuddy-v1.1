import { CalendarDayProps, WeekPlanningProps } from "@/types";
import React from "react";

const CalendarDay = ({
	weekDay,
	selectedDay,
	setSelectedDay,
}: CalendarDayProps) => {
	// Todays Date
	const today = new Date().getDate();

	return (
		<div
			className={`w-full text-center hover:cursor-pointer ${
				weekDay.date.getDate() === today && `bg-custom-green dark:bg-lime`
			}
      ${
				weekDay.date.getDate() === selectedDay.getDate() &&
				`outline outline-2 md:outline-4 dark:outline dark:md:outline-2 outline-black dark:outline-white/55 z-50 transition-all duration-100 ease-in-out`
			}`}
			onClick={() => setSelectedDay(weekDay.date)}
		>
			<div className='bg-neutral-200 dark:bg-ink-800 p-2 border-b border-b-neutral-400 dark:border-b-white/10'>
				<p className='font-semibold hidden md:block  dark:text-white/55'>
					{weekDay.date.toDateString().substring(0, 3)}
				</p>
				<p className='font-semibold md:hidden text-sm dark:text-white/55'>
					{weekDay.date.toDateString().substring(0, 1)}
				</p>
			</div>
			<div className='relative font-medium pb-4 md:pb-6 pt-8 md:pt-12 text-neutral-500 dark:text-white/55'>
				{!weekDay.workout?.name.startsWith("Rest") && (
					<div className='absolute bg-black dark:bg-lime rounded-full w-2 h-2 left-1/2 -translate-x-1/2 bottom-12 md:bottom-24' />
				)}
				<p
					className={`text-lg md:text-2xl ${weekDay.date.getDate() === today && "dark:text-black"}`}
				>
					{weekDay.date.getDate()}
				</p>
				<p
					className={`hidden md:block ${weekDay.date.getDate() === today && "dark:text-black"}`}
				>
					{weekDay.date.toDateString().substring(4, 8)}
				</p>
			</div>
		</div>
	);
};

export default CalendarDay;
