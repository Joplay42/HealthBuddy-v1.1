import Link from "next/link";
import { Quotes } from "@/components";

const SectionFive = () => {
	return (
		<section id='workout' className='relative bg-ink-950'>
			<div className='max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-10 py-16 lg:py-24 grid lg:grid-cols-12 gap-8 items-stretch'>
				{/* Left: copy + stats */}
				<div className='lg:col-span-5 flex flex-col'>
					<span className='inline-flex w-fit items-center gap-2 text-[12px] uppercase tracking-[0.18em] text-white/60 bg-white/5 ring-soft rounded-full px-3 py-1.5'>
						<svg
							className='h-3 w-3 text-lime'
							viewBox='0 0 24 24'
							fill='none'
							stroke='currentColor'
							strokeWidth={3}
						>
							<path d='M7 17L17 7M9 7h8v8' />
						</svg>
						Workout
					</span>

					<h2 className='mt-6 font-black tracking-tightest leading-[1.02] text-4xl lg:text-5xl text-bone'>
						Your perfect
						<br />
						workout <span className='text-lime'>companion</span>
					</h2>
					<p className='mt-5 text-white/55 max-w-md'>
						Whatever your goal is, Healthbuddy is your perfect workout
						companion.
					</p>

					<Link
						href='/signin'
						className='mt-8 inline-flex w-fit items-center gap-2 bg-lime hover:bg-lime-400 text-ink-950 font-semibold px-5 py-3 rounded-xl glow-lime transition'
					>
						Get started
						<svg
							className='h-3.5 w-3.5'
							viewBox='0 0 24 24'
							fill='none'
							stroke='currentColor'
							strokeWidth={2.5}
							strokeLinecap='round'
						>
							<path d='M5 12h14M13 6l6 6-6 6' />
						</svg>
					</Link>

					<div className='mt-auto pt-10 grid grid-cols-3 gap-4'>
						<div className='rounded-2xl bg-ink-850 ring-soft p-4'>
							<p className='text-[10px] uppercase tracking-widest text-white/40'>
								Splits
							</p>
							<p className='num-tabular font-extrabold text-2xl mt-1 text-bone'>
								12
							</p>
						</div>
						<div className='rounded-2xl bg-ink-850 ring-soft p-4'>
							<p className='text-[10px] uppercase tracking-widest text-white/40'>
								Exercises
							</p>
							<p className='num-tabular font-extrabold text-2xl mt-1 text-bone'>
								340<span className='text-lime'>+</span>
							</p>
						</div>
						<div className='rounded-2xl bg-ink-850 ring-soft p-4'>
							<p className='text-[10px] uppercase tracking-widest text-white/40'>
								PR tracking
							</p>
							<p className='font-extrabold text-2xl mt-1 text-lime'>on</p>
						</div>
					</div>
				</div>

				{/* Right: original rotating quotes */}
				<div className='lg: lg:col-span-7'>
					<Quotes />
				</div>
			</div>
		</section>
	);
};

export default SectionFive;
