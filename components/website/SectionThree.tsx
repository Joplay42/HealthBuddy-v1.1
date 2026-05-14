import Image from "next/image";
import Link from "next/link";

const SectionThree = () => {
	return (
		<section id='calories' className='relative bg-ink-950'>
			<div className='max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-10 py-16 lg:py-28 grid lg:grid-cols-12 gap-12 items-center'>
				{/* Left: objective card mock */}
				<div className='lg:col-span-7 order-2 lg:order-1'>
					<div className='relative rounded-3xl bg-ink-850 ring-soft overflow-hidden h-[420px] sm:h-[520px]'>
						{/* watermark — slightly more visible */}
						<div
							aria-hidden='true'
							className='absolute -inset-y-10 inset-x-0 flex flex-col gap-1 leading-[0.85] font-black tracking-tighter text-[72px] sm:text-[88px] text-white/[0.07] whitespace-nowrap select-none pointer-events-none p-6'
						>
							<span>HEALTHBUDDY</span>
							<span>HEALTHBUDDY</span>
							<span>HEALTHBUDDY</span>
							<span>HEALTHBUDDY</span>
							<span>HEALTHBUDDY</span>
							<span>HEALTHBUDDY</span>
							<span>HEALTHBUDDY</span>
						</div>

						{/* Objective card */}
						<div className='absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 w-[55%] sm:w-[58%] rounded-2xl bg-white text-ink-900 p-4 sm:p-5 shadow-2xl shadow-black/50'>
							<p className='font-bold text-[14px] sm:text-[15px]'>
								Set an <span className='text-lime-700'>objective</span>
							</p>
							<p className='mt-2 text-[10px] sm:text-[11px] text-ink-700 leading-relaxed'>
								Set your daily calories and nutriments to meet your health
								goals. Tracking these helps maintain a balanced diet and
								optimize energy levels.
							</p>

							<p className='mt-3 sm:mt-4 text-[10px] sm:text-[11px] font-semibold text-ink-900'>
								Daily calorie objective
							</p>
							<div className='mt-1.5 rounded-md ring-1 ring-ink-200 px-3 py-2 text-[11px] sm:text-[12px] num-tabular text-ink-900 bg-bone/50'>
								2 000
							</div>

							<div className='mt-3 grid grid-cols-3 gap-2'>
								{[
									{ label: "Protein %", value: "200g" },
									{ label: "Carbs %", value: "200g" },
									{ label: "Fat %", value: "44g" },
								].map((m) => (
									<div key={m.label}>
										<p className='text-[9px] sm:text-[10px] font-semibold text-ink-900'>
											{m.label}
										</p>
										<div className='mt-1 rounded-md ring-1 ring-ink-200 px-2 py-1.5 text-[10px] sm:text-[11px] num-tabular bg-bone/50'>
											{m.value}
										</div>
									</div>
								))}
							</div>

							<Link
								href='/signin'
								className='mt-3 sm:mt-4 block w-full rounded-md bg-ink-950 text-white text-center text-[11px] sm:text-[12px] font-semibold py-2.5 hover:bg-ink-800 transition'
							>
								Start your journey
							</Link>
						</div>

						{/* Right photo using actual image */}
						<div className='absolute right-4 top-6 sm:top-8 bottom-6 sm:bottom-8 w-[36%] rounded-2xl overflow-hidden ring-soft'>
							<Image
								src='/SectionThree.png '
								alt='Fitness training'
								fill
								className='object-cover'
							/>
							<div
								className='absolute inset-0'
								style={{
									background:
										"linear-gradient(180deg, transparent 35%, rgba(7,7,7,.75))",
								}}
							/>
							<p className='absolute bottom-4 left-4 right-4 text-white font-bold text-[11px] sm:text-[13px] leading-tight italic'>
								&ldquo;The key to success is hard work and consistency&rdquo;
							</p>
						</div>
					</div>
				</div>

				{/* Right: copy */}
				<div className='lg:col-span-5 order-1 lg:order-2'>
					<span className='inline-flex items-center gap-2 text-[12px] uppercase tracking-[0.18em] text-white/60 bg-white/5 ring-soft rounded-full px-3 py-1.5'>
						<svg
							className='h-3 w-3 text-lime'
							viewBox='0 0 24 24'
							fill='none'
							stroke='currentColor'
							strokeWidth={3}
						>
							<path d='M7 17L17 7M9 7h8v8' />
						</svg>
						Calorie Tracker
					</span>
					<h2 className='mt-6 font-black tracking-tightest leading-[1.02] text-4xl lg:text-5xl text-bone'>
						Set your calorie
						<br />
						objective depending
						<br />
						on your <span className='text-lime'>GOALS</span>
					</h2>
					<p className='mt-5 text-white/55 max-w-md'>
						The integrated calorie tracker for everyone is simple and makes
						progress seems easy!
					</p>
					<Link
						href='/signin'
						className='mt-7 inline-flex items-center gap-2 bg-white text-ink-950 hover:bg-bone font-semibold px-5 py-3 rounded-xl transition'
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

					<div className='mt-10 grid grid-cols-2 gap-3 max-w-xs sm:max-w-md'>
						<div className='rounded-xl bg-ink-850 ring-soft p-3.5'>
							<p className='num-tabular font-extrabold text-2xl text-lime'>
								1.2M
							</p>
							<p className='text-[11px] text-white/50 mt-0.5'>
								Foods in database
							</p>
						</div>
						<div className='rounded-xl bg-ink-850 ring-soft p-3.5'>
							<p className='num-tabular font-extrabold text-2xl text-lime'>
								3<span className='text-white/80'>s</span>
							</p>
							<p className='text-[11px] text-white/50 mt-0.5'>Avg. log time</p>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default SectionThree;
