"use client";
import React, { FormEvent, useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Slide, toast } from "react-toastify";
import Modal from "./Modal";
import { useFirebaseAuth } from "@/context/UserContext";
import { useUserInformationContext } from "@/context/UserInformationContext";

const EditGoal = () => {
	const router = useRouter();
	const { user } = useFirebaseAuth();
	const { userWorkoutObjectiveInfo, userWeightInfo } =
		useUserInformationContext();

	const [objectiveWeight, setObjectiveWeight] = useState<number | undefined>(
		userWorkoutObjectiveInfo?.objectiveWeight || undefined,
	);
	const [months, setMonths] = useState<number>(
		userWorkoutObjectiveInfo?.months || 3,
	);
	const [resetBaseline, setResetBaseline] = useState(false);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string>("");
	const [disabled, setDisabled] = useState(true);

	const latestWeight =
		userWeightInfo.length > 0
			? userWeightInfo[userWeightInfo.length - 1].number
			: null;

	useEffect(() => {
		const valid =
			objectiveWeight !== undefined &&
			objectiveWeight > 0 &&
			months > 0 &&
			months <= 12;
		setDisabled(!valid);
	}, [objectiveWeight, months]);

	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setError("");
		setLoading(true);

		try {
			if (!user) throw new Error("Not signed in");

			const payload: Record<string, unknown> = {
				objectiveWeight,
				months,
			};
			if (resetBaseline) {
				payload.resetBaseline = true;
				if (latestWeight) payload.currentWeight = latestWeight;
			}

			const res = await fetch(`/api/workouts?userid=${user.uid}`, {
				method: "PATCH",
				body: JSON.stringify(payload),
			});
			const data = await res.json();
			if (!res.ok) throw new Error(data.error || data.message || "Failed");

			router.replace(window.location.pathname);
			setTimeout(() => {
				toast.success("Goal updated", {
					position: "bottom-right",
					autoClose: 4000,
					hideProgressBar: false,
					closeOnClick: true,
					pauseOnHover: true,
					draggable: true,
					theme: "light",
					transition: Slide,
				});
			}, 100);
		} catch (err: any) {
			setError(err.message);
		} finally {
			setLoading(false);
		}
	};

	return (
		<Modal title='Edit goal'>
			<div className='py-5 px-4 lg:px-10'>
				<form onSubmit={handleSubmit}>
					<div className='space-y-4 mt-6 lg:mt-10 flex flex-col'>
						<label className='font-semibold text-lg dark:text-bone'>
							Objective weight (lb)
						</label>
						<input
							type='number'
							value={objectiveWeight ?? ""}
							onChange={(e) => {
								const v = e.target.valueAsNumber;
								setObjectiveWeight(Number.isNaN(v) ? undefined : v);
							}}
							className='rounded-xl w-full'
							placeholder='ex. 175'
						/>
					</div>

					<div className='space-y-4 mt-6 lg:mt-10 flex flex-col'>
						<label className='font-semibold text-lg dark:text-bone'>
							Timeframe — {months} month{months > 1 ? "s" : ""}
						</label>
						<input
							type='range'
							min={1}
							max={12}
							value={months}
							onChange={(e) => setMonths(Number(e.target.value))}
							className='accent-black dark:accent-lime'
						/>
					</div>

					<label className='mt-6 lg:mt-10 flex items-start gap-3 text-sm dark:text-bone cursor-pointer'>
						<input
							type='checkbox'
							checked={resetBaseline}
							onChange={(e) => setResetBaseline(e.target.checked)}
							className='mt-1 accent-black dark:accent-lime'
						/>
						<span>
							Reset progress baseline to today
							{latestWeight !== null && (
								<span className='block text-neutral-500 dark:text-white/50'>
									Uses latest logged weight ({latestWeight} lb) as the new
									starting point.
								</span>
							)}
						</span>
					</label>

					{error && <p className='text-red-500 mt-4'>{error}</p>}

					<button
						className='my-8 flex items-center gap-2 justify-center py-4 px-3 rounded-xl hover:opacity-75 hover:transition ease-in-out duration-300 bg-black dark:bg-lime text-white dark:text-ink-950 w-full disabled:opacity-60'
						type='submit'
						disabled={disabled || loading}
					>
						Save changes
						{loading && (
							<Image
								src='/loading.gif'
								width={35}
								height={35}
								alt='Loading'
							/>
						)}
					</button>
				</form>
			</div>
		</Modal>
	);
};

export default EditGoal;
