import Image from "next/image";

const SectionTwo = () => {
	return (
		<section id='about' className='relative bg-ink-950'>
			<div className='max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-10 py-20 lg:py-32 grid lg:grid-cols-12 gap-12 items-center'>
				{/* Copy */}
				<div className='lg:col-span-6'>
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
						About
					</span>

					<h2 className='mt-6 font-black tracking-tightest leading-[1.0] text-4xl lg:text-5xl xl:text-6xl text-bone'>
						The new and easy
						<br />
						fitness app, <span className='text-lime'>100% free</span>
					</h2>
					<p className='mt-6 text-white/55 max-w-xl'>
						Healthbuddy is made to be easy, to make tracking your progress
						simple. Making progress has never been easier.
					</p>

					<ul className='mt-8 space-y-3 text-sm'>
						{[
							"No paywalls, no premium tiers",
							"Built for serious athletes & weekend warriors alike",
							"Open-source food database — over 1.2M items",
						].map((item) => (
							<li key={item} className='flex items-start gap-3'>
								<span className='mt-0.5 h-5 w-5 shrink-0 rounded-md bg-lime/15 grid place-items-center text-lime'>
									<svg
										className='h-3 w-3'
										viewBox='0 0 24 24'
										fill='none'
										stroke='currentColor'
										strokeWidth={3}
										strokeLinecap='round'
									>
										<path d='M5 12l4 4 10-10' />
									</svg>
								</span>
								<span className='text-white/75'>{item}</span>
							</li>
						))}
					</ul>
				</div>

				{/* Right: dashboard preview */}
				<div className='lg:col-span-6 relative'>
					<div className='relative rounded-3xl bg-ink-850 ring-soft p-6 overflow-hidden h-[420px] sm:h-[480px]'>
						{/* watermark — slightly more visible */}
						<div
							aria-hidden='true'
							className='absolute -inset-y-10 inset-x-0 -top-2 flex flex-col gap-1 leading-[0.85] font-black tracking-tighter text-[72px] sm:text-[88px] text-white/[0.07] whitespace-nowrap select-none pointer-events-none'
						>
							<span>HEALTHBUDDY</span>
							<span>HEALTHBUDDY</span>
							<span>HEALTHBUDDY</span>
							<span>HEALTHBUDDY</span>
							<span>HEALTHBUDDY</span>
							<span>HEALTHBUDDY</span>
							<span>HEALTHBUDDY</span>
						</div>

						{/* dashboard mock */}
						<div className='absolute left-6 top-1/2 -translate-y-1/2 w-[56%] rounded-2xl bg-ink-900 ring-soft p-4 shadow-2xl shadow-black/60'>
							<div className='flex items-center justify-between'>
								<div>
									<p className='text-[11px] text-white/40'>Calories</p>
									<p className='text-[10px] text-white/30'>
										Welcome back Alex M. 👋
									</p>
								</div>
								<span className='h-2 w-2 rounded-full bg-lime' />
							</div>

							<p className='mt-3 text-[10px] uppercase tracking-widest text-white/40'>
								Overview
							</p>
							<div className='mt-2 grid grid-cols-4 gap-2 items-center'>
								<div className='relative h-14 w-14 sm:h-16 sm:w-16'>
									<svg viewBox='0 0 36 36' className='h-full w-full -rotate-90'>
										<circle
											cx='18'
											cy='18'
											r='15.9'
											stroke='#2c2c30'
											strokeWidth='3.5'
											fill='none'
										/>
										<circle
											cx='18'
											cy='18'
											r='15.9'
											stroke='#C7F94C'
											strokeWidth='3.5'
											fill='none'
											strokeDasharray='100'
											strokeDashoffset='16'
											strokeLinecap='round'
										/>
									</svg>
									<div className='absolute inset-0 grid place-items-center'>
										<p className='num-tabular font-extrabold text-[13px] sm:text-[15px]'>
											242
										</p>
									</div>
								</div>
								{[
									{ label: "Protein", value: "65g", offset: "35" },
									{ label: "Carbs", value: "98g", offset: "55" },
									{ label: "Fat", value: "22g", offset: "72" },
								].map((m) => (
									<div key={m.label} className='text-center'>
										<div className='relative h-10 w-10 sm:h-12 sm:w-12 mx-auto'>
											<svg
												viewBox='0 0 36 36'
												className='h-full w-full -rotate-90'
											>
												<circle
													cx='18'
													cy='18'
													r='15.9'
													stroke='#2c2c30'
													strokeWidth='4'
													fill='none'
												/>
												<circle
													cx='18'
													cy='18'
													r='15.9'
													stroke='#C7F94C'
													strokeWidth='4'
													fill='none'
													strokeDasharray='100'
													strokeDashoffset={m.offset}
													strokeLinecap='round'
												/>
											</svg>
											<div className='absolute inset-0 grid place-items-center'>
												<p className='num-tabular font-bold text-[9px] sm:text-[10px]'>
													{m.value}
												</p>
											</div>
										</div>
										<p className='text-[9px] text-white/40 mt-1'>{m.label}</p>
									</div>
								))}
							</div>

							<div className='mt-4 rounded-xl bg-ink-800/60 ring-soft p-3'>
								<div className='flex items-center justify-between'>
									<p className='text-[9px] uppercase tracking-widest text-white/40'>
										Food entries · Today
									</p>
									<span className='text-[9px] font-semibold text-ink-950 bg-lime rounded-md px-1.5 py-0.5'>
										+ Consume
									</span>
								</div>
								<table className='mt-2 w-full text-[9px] sm:text-[10px]'>
									<thead className='text-white/40'>
										<tr>
											<th className='text-left font-normal pb-1'>Meal</th>
											<th className='text-left font-normal pb-1'>Food</th>
											<th className='text-right font-normal pb-1'>Cal</th>
											<th className='text-right font-normal pb-1'>P</th>
										</tr>
									</thead>
									<tbody className='num-tabular text-white/80'>
										<tr className='border-t border-white/5'>
											<td className='py-1'>Breakfast</td>
											<td>Egg</td>
											<td className='text-right'>182</td>
											<td className='text-right text-lime'>24g</td>
										</tr>
										<tr className='border-t border-white/5'>
											<td className='py-1'>Snack</td>
											<td>Yogurt</td>
											<td className='text-right'>120</td>
											<td className='text-right text-lime'>17g</td>
										</tr>
										<tr className='border-t border-white/5'>
											<td className='py-1'>Lunch</td>
											<td>Chicken</td>
											<td className='text-right'>520</td>
											<td className='text-right text-lime'>42g</td>
										</tr>
									</tbody>
								</table>
							</div>
						</div>

						{/* athlete portrait using actual image */}
						<div className='absolute right-4 top-6 bottom-6 w-[36%] rounded-2xl overflow-hidden ring-soft'>
							<Image
								src='/Section-two.png'
								alt='Athlete portrait'
								fill
								className='object-cover'
							/>
							<div
								className='absolute inset-0'
								style={{
									background:
										"linear-gradient(180deg, transparent 50%, rgba(7,7,7,.5))",
								}}
							/>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default SectionTwo;
